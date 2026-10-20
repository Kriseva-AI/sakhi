import { test, expect, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all main destinations are visible links on a narrow phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/en-IN/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link")).toHaveCount(5);
  for (const link of await nav.getByRole("link").all())
    await expect(link).toBeInViewport();
  await nav.getByRole("link", { name: "Community", exact: true }).click();
  await expect(page.locator("main h1")).toBeFocused();
});
test("public correction errors link back to the field and preserve entered public text", async ({
  page,
}) => {
  await page.goto("/en-IN/community");
  await page.getByLabel("Public resource ID").fill("legal");
  await page
    .getByLabel("Official evidence URL")
    .fill("https://example.org/?case=PRIVATE");
  await page
    .getByLabel("Proposed public correction (optional)")
    .fill("SYNTHETIC public wording");
  await page
    .getByRole("button", { name: "Download correction proposal", exact: true })
    .click();
  const summary = page.getByRole("region", { name: "There is a problem" });
  await expect(summary).toBeFocused();
  await expect(page).toHaveTitle(/^Error:/);
  await summary.getByRole("link").click();
  await expect(page.getByLabel("Official evidence URL")).toBeFocused();
  await expect(page.getByLabel("Official evidence URL")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(
    page.getByLabel("Proposed public correction (optional)"),
  ).toHaveValue("SYNTHETIC public wording");
});
test("WhatsApp shows readable public fields before an optional encoded address", async ({
  page,
}) => {
  await page.goto("/en-IN/prepare");
  await page
    .getByRole("button", { name: "Preview WhatsApp public card", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".payload-fields")).toContainText(
    "You choose the recipient and press Send",
  );
  await expect(
    dialog.getByText("Show exact encoded address", { exact: true }),
  ).toBeVisible();
  await expect(dialog.locator(".address-details")).not.toHaveAttribute(
    "open",
    "",
  );
  await expect(dialog.locator(".address-details code")).toBeHidden();
  await dialog.getByText("Show exact encoded address", { exact: true }).click();
  await expect(dialog.locator(".address-details code")).toContainText(
    "https://wa.me/",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", {
      name: "Preview WhatsApp public card",
      exact: true,
    }),
  ).toBeFocused();
});
test("comparison has a caption and explicit row and column headers", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  await page
    .getByRole("button", { name: "Compare public pathways", exact: true })
    .click();
  const table = page.getByRole("table", { name: "Public pathway comparison" });
  await expect(table.locator("caption")).toBeVisible();
  expect(await table.locator("thead th:not([scope=col])").count()).toBe(0);
  expect(await table.locator("tbody th:not([scope=row])").count()).toBe(0);
});
test("browser font preference at 200 percent still reflows the main journey", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  const before = await page
    .locator(".sprint2-intro")
    .evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  await page.addStyleTag({ content: "html {font-size:200% !important}" });
  const after = await page
    .locator(".sprint2-intro")
    .evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  expect(after).toBeGreaterThanOrEqual(before * 1.9);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await expect(page.locator("main h1")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("skip link and keyboard journey preserve visible focus without a mouse", async ({
  page,
  browserName,
}) => {
  await page.goto("/en-IN/");
  // Apple documents Option-Tab for links with the default Mac Safari keyboard preference.
  const nextControl =
    browserName === "webkit" && process.platform === "darwin"
      ? "Alt+Tab"
      : "Tab";
  async function tabTo(target: Locator) {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await target.evaluate((node) => node === document.activeElement))
        return;
      await page.keyboard.press(nextControl);
    }
    await expect(target).toBeFocused();
  }
  await page.keyboard.press(nextControl);
  await expect(
    page.getByRole("link", { name: "Skip to content", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await tabTo(
    page.getByRole("button", { name: "Find my next step", exact: true }),
  );
  await page.keyboard.press("Enter");
  await tabTo(
    page.getByRole("button", { name: "Understand my options", exact: true }),
  );
  await page.keyboard.press("Enter");
  await tabTo(page.getByRole("button", { name: "18 or older", exact: true }));
  await page.keyboard.press("Enter");
  await tabTo(
    page.getByRole("button", {
      name: "Online or digital concerns",
      exact: true,
    }),
  );
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Report a cyber concern", exact: true }),
  ).toBeVisible();
});
test("forced colors and reduced motion retain operable controls", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Forced-colors emulation is asserted in Chromium only; not a physical assistive-technology result.",
  );
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "Under 18", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "For someone under 18", exact: true }),
  ).toBeVisible();
  const scan = await new AxeBuilder({ page }).analyze();
  expect(
    scan.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("font download failure preserves readable reflow", async ({ page }) => {
  await page.route("**/*.woff2", (route) => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  await page.addStyleTag({ content: "html{font-size:200%!important}" });
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.getByRole("button", { name: "Find my next step", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("critical service eligibility limits remain visible before opening details", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  const card = page.getByRole("article").filter({
    has: page.getByRole("heading", {
      name: "Women Helpline and One Stop Centres",
      exact: true,
    }),
  });
  await expect(
    card.getByText("The official page excludes West Bengal.", { exact: false }),
  ).toBeVisible();
  await expect(card.locator("details")).not.toHaveAttribute("open", "");
});

test("text spacing preferences reflow without clipping primary controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  await page.addStyleTag({
    content:
      "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await expect(page.locator("main h1")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("progress is explicit and Back cancels an in-flight lookup", async ({
  page,
}) => {
  await page.route("**/api/navigate", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      await route.fulfill({ response: await route.fetch() });
    } catch {
      /* The user may already have cancelled. */
    }
  });
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByLabel("A few words, if you want")
    .fill("SYNTHETIC fake account");
  await page
    .getByRole("button", { name: "Show my options", exact: true })
    .click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Looking up public information" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Is this for someone 18 or older?",
      exact: true,
    }),
  ).toBeVisible();
  await page.waitForTimeout(800);
  await expect(page).toHaveURL(/\/finder$/);
  await expect(
    page.getByRole("heading", {
      name: "Is this for someone 18 or older?",
      exact: true,
    }),
  ).toBeVisible();
});
test("JavaScript failure retains the direct emergency fallback", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/en-IN/");
  await expect(
    page.getByRole("link", { name: "Call 112", exact: true }),
  ).toHaveAttribute("href", "tel:112");
  await expect(
    page.getByRole("heading", { name: "Sakhi public support navigator" }),
  ).toBeVisible();
  await context.close();
});
