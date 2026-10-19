import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
const auditUrl = new URL(process.argv[2] || "http://127.0.0.1:8787/en-IN/");
if (
  auditUrl.hostname !== "127.0.0.1" ||
  !["8768", "8787"].includes(auditUrl.port) ||
  auditUrl.pathname !== "/en-IN/" ||
  auditUrl.search ||
  auditUrl.hash ||
  auditUrl.username ||
  auditUrl.password
)
  throw new Error("Only the owned local production preview may be audited.");
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox"],
});
try {
  const result = await lighthouse(auditUrl.href, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices"],
    formFactor: "mobile",
    throttlingMethod: "simulate",
  });
  await fs.writeFile(
    "docs/evidence/lighthouse-mobile.json",
    JSON.stringify(result.lhr, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        profile: result.lhr.configSettings,
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
            "speed-index",
          ].map((k) => [k, result.lhr.audits[k]?.displayValue]),
        ),
      },
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}
