import { test, expect } from "@playwright/test";

test("Konkani preparation has explicit English guidance and concise review disclosure", async ({
  page,
}) => {
  await page.setViewportSize({ width: 625, height: 958 });
  await page.goto("/kok-IN/prepare");
  await expect(page.locator(".app")).toBeVisible();
  await expect(page.locator("main h1")).not.toContainText("A little readiness");
  await expect(page.locator(".language-status summary")).toBeVisible();
  await expect(page.locator(".language-status summary")).toContainText(
    "English guidance",
  );
  expect(
    await page
      .locator("main h1")
      .evaluate((e) => e.getBoundingClientRect().top),
  ).toBeLessThan(430);
  await page.locator(".language-status summary").click();
  await expect(page.locator(".language-status")).toContainText("Human");
});

test("all 23 languages have selectable honest capability states", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await expect(
    page
      .getByRole("combobox", { name: "Language", exact: true })
      .locator("option"),
  ).toHaveCount(23);
});
