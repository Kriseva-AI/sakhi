import { test, expect } from "@playwright/test";

test("opening explains public support with short copy and a visible next step", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  await expect(page.locator("main h1")).toHaveText(/Support for women/);
  await expect(page.locator("main")).toContainText("public support in India");
  const words = (await page.locator("main").innerText())
    .trim()
    .split(/\s+/).length;
  expect(words).toBeLessThanOrEqual(60);
  await expect(
    page.getByRole("button", { name: "Find my next step", exact: true }),
  ).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight / innerHeight,
    ),
  ).toBeLessThanOrEqual(1.3);
  await expect(page.locator("main textarea, main input")).toHaveCount(0);
});

test("pink and black theme continues from the landing to the finder", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(255, 249, 252)",
  );
  await expect(
    page.getByRole("button", { name: "Find my next step", exact: true }),
  ).toHaveCSS("background-color", "rgb(19, 16, 19)");
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Choose your next step.",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(255, 249, 252)",
  );
  expect((await page.locator("main h1").boundingBox())!.y).toBeLessThan(320);
});

test("source exploration is available without overwhelming the opening", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await expect(page.getByRole("tablist")).toHaveCount(0);
  await expect(page.locator(".pathway-rail")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Prepare & learn", exact: true })
    .click();
  await expect(
    page.getByRole("tab", { name: "Before a concern", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", {
      name: "Scrollable official public pathways",
      exact: true,
    }),
  ).toBeVisible();
});
