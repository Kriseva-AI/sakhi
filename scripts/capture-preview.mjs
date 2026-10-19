import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

// Owned local production preview only. Never opens an external destination.
const origin = "http://127.0.0.1:8787";
const browser = await chromium.launch();
const report = {
  date: "2026-10-19",
  origin,
  pages: [],
  outside: [],
  pageErrors: [],
};
try {
  for (const [name, route, width, height, fullPage] of [
    ["desktop-home", "", 1440, 1000, false],
    ["mobile-home", "", 390, 844, false],
    ["desktop-home-full", "", 1440, 1000, true],
    ["mobile-home-full", "", 390, 844, true],
    ["prepare", "prepare", 1440, 1000, true],
    ["mobile-prepare", "prepare", 390, 844, true],
    ["nearby", "nearby", 1440, 1000, true],
    ["mobile-nearby", "nearby", 390, 844, true],
    ["community", "community", 1440, 1000, true],
    ["mobile-community", "community", 390, 844, true],
    ["urdu-home", "", 390, 844, true],
    ["tablet-home", "", 768, 1024, false],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    page.on("request", (r) => {
      if (!r.url().startsWith(origin)) report.outside.push(r.url());
    });
    page.on("pageerror", (error) => report.pageErrors.push(error.message));
    const response = await page.goto(
      `${origin}/${name === "urdu-home" ? "ur-IN" : "en-IN"}/${route}`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `docs/evidence/sprint2-${name}.png`,
      fullPage,
    });
    report.pages.push({
      name,
      status: response.status(),
      ...(await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
      }))),
    });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("request", (r) => {
    if (!r.url().startsWith(origin)) report.outside.push(r.url());
  });
  page.on("pageerror", (error) => report.pageErrors.push(error.message));
  await page.goto(`${origin}/en-IN/`);
  await page
    .getByRole("button", { name: "Try a fictional example", exact: true })
    .click();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/evidence/sprint2-mobile-options.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Preview official website", exact: true })
    .first()
    .click();
  await page.screenshot({
    path: "docs/evidence/sprint2-destination-preview.png",
  });
  await page
    .getByRole("button", { name: "Stay in Sakhi", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await page.getByLabel("Choose a city or district").selectOption("Ahmedabad");
  await page
    .getByRole("button", { name: "Preview map search", exact: true })
    .click();
  await page.screenshot({ path: "docs/evidence/sprint2-map-disclosure.png" });
  await page
    .getByRole("button", { name: "Stay in Sakhi", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Prepare & learn", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Preview WhatsApp public card", exact: true })
    .click();
  await page.screenshot({ path: "docs/evidence/sprint2-whatsapp-preview.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Community", exact: true }).click();
  await page.getByLabel("Public resource ID").fill("legal");
  await page
    .getByLabel("Official evidence URL")
    .fill("https://example.org/?case=SYNTHETIC");
  await page
    .getByRole("button", { name: "Download correction proposal", exact: true })
    .click();
  await page.screenshot({ path: "docs/evidence/sprint2-error-recovery.png" });
  await page.goto(`${origin}/en-IN/`);
  await page.evaluate(() =>
    document.documentElement.style.setProperty(
      "font-size",
      "200%",
      "important",
    ),
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/evidence/sprint2-large-text.png",
    fullPage: true,
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Large text overflowed the preview.");
  await page.close();
  await fs.writeFile(
    "docs/evidence/sprint2-visual-network.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
  if (
    report.outside.length ||
    report.pageErrors.length ||
    report.pages.some((p) => p.status !== 200 || p.width < p.documentWidth)
  )
    throw new Error("Preview inspection failed");
} finally {
  await browser.close();
}
