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

test("confirming a new symbol cancels a pending concern lookup", async ({
  page,
}) => {
  let release!: () => void;
  let finished!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  const completed = new Promise<void>((resolve) => {
    finished = resolve;
  });
  const requests: string[] = [];
  await page.route("**/api/navigate", async (route) => {
    const category = route.request().postDataJSON().category;
    requests.push(category);
    const first = requests.length === 1;
    if (first) await held;
    try {
      await route.fulfill({
        json: {
          state: "present_options",
          category,
          abstained: false,
          resources: [],
          engine: "synthetic-delayed-response",
          warnings: [],
          language_status: "review_pending",
          content_locale: "en-IN",
          external_actions: false,
        },
      });
    } catch {
    } finally {
      if (first) finished();
    }
  });
  try {
    await page.goto("/en-IN/finder");
    await page
      .getByRole("button", { name: "Understand my options", exact: true })
      .click();
    await page
      .getByRole("button", { name: "18 or older", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Online or digital concerns", exact: true })
      .click();
    await expect.poll(() => requests.length).toBe(1);
    await page
      .getByRole("button", { name: "Use symbols", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Home concern", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Use this choice", exact: true })
      .click();
    release();
    await completed;
    await expect(page.locator("#finder-heading")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Show my options", exact: true }),
    ).toBeEnabled();
    await page
      .getByRole("button", { name: "Show my options", exact: true })
      .click();
    await expect.poll(() => requests).toEqual(["cyber", "home"]);
  } finally {
    release();
  }
});

test("mobile input choices keep all four goals in the opening viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/finder");
  const symbols = await page
    .getByRole("button", { name: "Use symbols", exact: true })
    .boundingBox();
  const media = await page
    .getByRole("button", { name: "Add audio or video", exact: true })
    .boundingBox();
  expect(symbols!.y).toBe(media!.y);
  const last = await page
    .getByRole("button", { name: "Help someone else", exact: true })
    .boundingBox();
  expect(last!.y + last!.height).toBeLessThanOrEqual(844);
});
