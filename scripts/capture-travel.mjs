import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
const origin = "http://127.0.0.1:8787";
const browser = await chromium.launch();
const report = {
  date: "2026-10-20",
  origin,
  scope:
    "Actual production UI; one public Mumbai map view, no automated tile panning/zooming or fixtures.",
  pages: [],
  tiles: [],
  pageErrors: [],
  outsideBeforeConsent: [],
};
try {
  for (const [name, path, width, height] of [
    ["home-mobile", "/en-IN/", 390, 844],
    ["home-narrow", "/en-IN/", 320, 844],
    ["home-desktop", "/en-IN/", 1440, 900],
    ["home-urdu", "/ur-IN/", 390, 844],
    ["nearby-consent", "/en-IN/nearby", 390, 844],
    ["nearby-desktop", "/en-IN/nearby", 1440, 1000],
    ["finder", "/en-IN/finder", 390, 844],
    ["prepare", "/en-IN/prepare", 1440, 1000],
    ["trust", "/en-IN/trust", 390, 844],
  ]) {
    const p = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    p.on("request", (r) => {
      if (new URL(r.url()).origin !== origin)
        report.outsideBeforeConsent.push(r.url());
    });
    p.on("pageerror", (e) => report.pageErrors.push(e.message));
    const response = await p.goto(origin + path);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({
      path: `docs/evidence/travel-${name}.png`,
      fullPage: true,
    });
    report.pages.push({
      name,
      status: response.status(),
      ...(await p.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        main_words: document.querySelector("main").innerText.trim().split(/\s+/)
          .length,
        font: getComputedStyle(document.querySelector("h1")).fontFamily,
      }))),
    });
    await p.close();
  }
  const p = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  p.on("pageerror", (e) => report.pageErrors.push(e.message));
  p.on("response", (r) => {
    if (new URL(r.url()).hostname === "tile.openstreetmap.org")
      report.tiles.push({
        status: r.status(),
        type: r.headers()["content-type"],
      });
  });
  await p.goto(origin + "/en-IN/nearby");
  await p.getByRole("button", { name: "Load live map", exact: true }).click();
  await p
    .locator(".map-load-status")
    .filter({ hasNotText: "Loading map tiles" })
    .waitFor({ timeout: 30000 });
  report.tileState = await p.locator(".map-load-status").innerText();
  report.tileRefs = await p.locator(".leaflet-tile").evaluateAll((images) =>
    images.map((i) => ({
      referrerPolicy: i.referrerPolicy,
      crossOrigin: i.crossOrigin,
      loaded: i.naturalWidth > 0,
    })),
  );
  await p.screenshot({
    path: "docs/evidence/travel-live-map-mobile.png",
    fullPage: true,
  });
  await p.getByRole("button", { name: "Conditions", exact: true }).click();
  const conditionsResponse = p.waitForResponse(
    (response) =>
      response.url().endsWith("/api/explore/weather") &&
      response.request().method() === "POST",
  );
  await p.getByRole("button", { name: "Load conditions", exact: true }).click();
  report.conditionsStatus = (await conditionsResponse).status();
  await p
    .locator(".weather-reading")
    .waitFor({ state: "visible", timeout: 30000 });
  await p.screenshot({
    path: "docs/evidence/travel-live-conditions-mobile.png",
    fullPage: true,
  });
  report.conditionsVisible = (await p.locator(".weather-reading").count()) > 0;
  await p.getByRole("button", { name: "My plan", exact: true }).click();
  await p.getByLabel("Choose a public meeting point", { exact: true }).check();
  await p.screenshot({
    path: "docs/evidence/travel-plan-mobile.png",
    fullPage: true,
  });
  await p
    .getByRole("button", { name: "Preview check-in message", exact: true })
    .click();
  await p.screenshot({
    path: "docs/evidence/travel-checkin-preview.png",
    fullPage: true,
  });
  await p.keyboard.press("Escape");
  await p.getByRole("button", { name: "Data", exact: true }).click();
  await p.screenshot({
    path: "docs/evidence/travel-data-mobile.png",
    fullPage: true,
  });
  await fs.writeFile(
    "docs/evidence/travel-live-tile-receipt.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({
      pages: report.pages,
      tiles: report.tiles.length,
      tileState: report.tileState,
      conditionsVisible: report.conditionsVisible,
      errors: report.pageErrors,
      outsideBeforeConsent: report.outsideBeforeConsent,
    }),
  );
  if (
    report.pageErrors.length ||
    report.outsideBeforeConsent.length ||
    report.pages.some((p) => p.documentWidth > p.width)
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}
