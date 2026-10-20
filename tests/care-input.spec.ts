import { test, expect } from "@playwright/test";

test("symbol input can reach a public concern without speech, text or transmission", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => {
    if (!new URL(r.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/))
      requests.push(r.url());
  });
  await page.goto("/en-IN/finder");
  await page.getByRole("button", { name: "Use symbols", exact: true }).click();
  await page
    .getByRole("button", { name: "Online concern", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Online concern" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Use this choice", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Is this for someone 18 or older?" }),
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("media is a local preview with an honest unavailable interpretation state", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Add audio or video", exact: true })
    .click();
  await expect(
    page.getByText("Nothing is uploaded. Preview stays on this page."),
  ).toBeVisible();
  await expect(
    page.getByText("Automatic transcription is not enabled in this build."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Share media" })).toHaveCount(
    0,
  );
});

test("symbol choice reaches useful options and preparation progress never implies sending", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page.getByRole("button", { name: "Use symbols", exact: true }).click();
  await page
    .getByRole("button", { name: "Online concern", exact: true })
    .click();
  await page.getByRole("button", { name: "Undo choice", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Use this choice", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Online concern", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Use this choice", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByRole("button", { name: "Show my options", exact: true })
    .click();
  await expect(page.locator(".result-guide")).toBeVisible();
  await page.locator(".result-guide input[type=checkbox]").first().check();
  await expect(page.locator(".result-guide [role=status]")).toHaveText(
    "1 of 3 preparation steps marked. Nothing submitted or sent.",
  );
  await expect(page.locator(".resource-card").first()).toBeVisible();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await expect(page.locator(".result-guide")).toHaveCount(0);
});
