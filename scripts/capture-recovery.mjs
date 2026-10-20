// Actual production UI. Never requests device position or sends any message.
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const origin = "http://127.0.0.1:8787",
  dir = "docs/evidence/continuation";
const browser = await chromium.launch();
const report = {
  origin,
  captured_at: new Date().toISOString(),
  pages: [],
  journeys: [],
  scope:
    "Actual UI; synthetic choices only. No private story, contact or device position captured. No external action.",
};
const paths = [
  "",
  "finder",
  "resources",
  "prepare",
  "nearby",
  "trust",
  "community",
  "maintenance",
  "components",
];
for (const [name, width, height] of [
  ["mobile", 390, 844],
  ["desktop", 1440, 1000],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  for (const path of paths) {
    const outside = [],
      errors = [];
    const onRequest = (r) => {
      if (!r.url().startsWith(origin)) outside.push(new URL(r.url()).origin);
    };
    const onError = (e) => errors.push(e.message);
    page.on("request", onRequest);
    page.on("pageerror", onError);
    const response = await page.goto(origin + "/en-IN/" + path);
    await page.locator(".app").waitFor();
    await page.locator("main h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
    );
    await page.screenshot({
      path: `${dir}/${name}-${path || "home"}.png`,
      fullPage: true,
    });
    await page.evaluate(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
    );
    await page.screenshot({
      path: `${dir}/${name}-${path || "home"}-viewport.png`,
    });
    report.pages.push({
      path: path || "home",
      viewport: { width, height },
      http: response.status(),
      heading: await page.locator("main h1").innerText(),
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      outside,
      errors,
    });
    page.off("request", onRequest);
    page.off("pageerror", onError);
  }
  await context.close();
}
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(origin + "/en-IN/finder");
await page
  .getByRole("button", { name: "Understand my options", exact: true })
  .click();
await page.getByRole("button", { name: "Under 18", exact: true }).click();
await page
  .getByRole("button", { name: "Online abuse or images", exact: true })
  .click();
await page
  .getByRole("button", {
    name: "Intimate images or threats to share",
    exact: true,
  })
  .click();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({
  path: dir + "/child-image-pathway.png",
  fullPage: true,
});
report.journeys.push(
  "Under18 -> online images -> conditional Take It Down + India alternatives, no API/intake",
);
await page.goto(origin + "/en-IN/nearby");
await page.getByRole("button", { name: "My plan", exact: true }).click();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({ path: dir + "/update-empty.png", fullPage: true });
await page
  .getByRole("button", { name: "Help me share live location", exact: true })
  .click();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({
  path: dir + "/native-live-location.png",
  fullPage: true,
});
report.journeys.push(
  "Empty recipient preparation + native live-location guidance, no GPS or transmission",
);
await page.goto(origin + "/en-IN/trust");
await page
  .getByText("Cover, quick exit and device traces", { exact: true })
  .click();
await page.screenshot({
  path: dir + "/trust-exit-expanded.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Hide page", exact: true }).click();
await page.screenshot({ path: dir + "/neutral-cover.png" });
report.journeys.push("Device limitations -> neutral cover -> no external exit");
await page.close();
await browser.close();
await fs.writeFile(
  dir + "/production-visual.json",
  JSON.stringify(report, null, 2) + "\n",
);
if (
  report.pages.some(
    (p) => p.http !== 200 || p.overflow || p.outside.length || p.errors.length,
  )
)
  throw new Error("Production visual/network check failed");
console.log(
  `Captured ${report.pages.length} production route/viewport pairs and ${report.journeys.length} journeys.`,
);
