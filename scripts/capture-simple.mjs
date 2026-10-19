import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

const origin = "http://127.0.0.1:8787";
const browser = await chromium.launch();
const report = {
  date: "2026-10-20",
  origin,
  pages: [],
  outside: [],
  pageErrors: [],
};
function observe(page) {
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== origin)
      report.outside.push(request.url());
  });
  page.on("pageerror", (error) => report.pageErrors.push(error.message));
}
try {
  for (const [name, locale, route, width, height] of [
    ["desktop-home", "en-IN", "", 1440, 900],
    ["mobile-home", "en-IN", "", 390, 844],
    ["narrow-home", "en-IN", "", 320, 640],
    ["tablet-home", "en-IN", "", 768, 1024],
    ["urdu-home", "ur-IN", "", 390, 844],
    ["finder", "en-IN", "finder", 390, 844],
    ["prepare", "en-IN", "prepare", 1440, 1000],
    ["trust", "en-IN", "trust", 390, 844],
    ["nearby", "en-IN", "nearby", 390, 844],
    ["community", "en-IN", "community", 1440, 1000],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    observe(page);
    const response = await page.goto(`${origin}/${locale}/${route}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `docs/evidence/simple-${name}.png`,
      fullPage: true,
    });
    report.pages.push({
      name,
      status: response.status(),
      ...(await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        main_words: document.querySelector("main").innerText.trim().split(/\s+/)
          .length,
      }))),
    });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  observe(page);
  await page.goto(`${origin}/en-IN/`);
  await page
    .getByRole("button", { name: "Try a fictional example", exact: true })
    .click();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/evidence/simple-options.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Preview official website", exact: true })
    .first()
    .click();
  await page.screenshot({ path: "docs/evidence/simple-destination.png" });
  await page.close();
  await fs.writeFile(
    "docs/evidence/simple-visual-network.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
  if (
    report.outside.length ||
    report.pageErrors.length ||
    report.pages.some((p) => p.status !== 200 || p.documentWidth > p.width)
  )
    throw new Error("Production capture failed");
} finally {
  await browser.close();
}
