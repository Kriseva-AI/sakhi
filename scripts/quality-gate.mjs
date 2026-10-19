import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import net from "node:net";
import { assessBudgets } from "./quality-budgets.mjs";

// Own a dedicated loopback listener. Never reuse or stop another process.
await new Promise((resolve, reject) => {
  const probe = net.createServer();
  probe.once("error", reject);
  probe.listen(8768, "127.0.0.1", () => probe.close(resolve));
});
const server = spawn(
  "uv",
  [
    "run",
    "--frozen",
    "uvicorn",
    "services.api.main:app",
    "--host",
    "127.0.0.1",
    "--port",
    "8768",
    "--no-access-log",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);
let serverError = "";
server.stderr.on("data", (chunk) => {
  serverError += chunk.toString();
});
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null)
      throw new Error("Owned audit server exited: " + serverError);
    try {
      const r = await fetch("http://127.0.0.1:8768/api/health");
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Owned audit server did not become ready.");
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["scripts/lighthouse.mjs", "http://127.0.0.1:8768/en-IN/"],
      { stdio: "inherit" },
    );
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0 ? resolve() : reject(new Error("Lighthouse failed")),
    );
  });
  const lhr = JSON.parse(
    await fs.readFile("docs/evidence/lighthouse-mobile.json", "utf8"),
  );
  const config = JSON.parse(await fs.readFile("quality-budgets.json", "utf8"));
  const assessment = assessBudgets(lhr, config.release_regression_budgets);
  await fs.writeFile(
    "docs/evidence/quality-gate.json",
    JSON.stringify(
      { ...assessment, profile: lhr.configSettings, limits: config.limits },
      null,
      2,
    ) + "\n",
  );
  if (!assessment.passed) throw new Error(assessment.failures.join("\n"));
  console.log(
    "Measured quality budgets passed. Physical and human gates remain separate.",
  );
} finally {
  if (server.exitCode === null) server.kill("SIGTERM");
}
