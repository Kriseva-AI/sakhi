import { test, expect } from "@playwright/test";

async function localWatch(page: import("@playwright/test").Page) {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "geolocation", {
      value: {
        watchPosition: (success: unknown) => {
          (window as any).__watch = success;
          return 42;
        },
        clearWatch: () => {
          (window as any).__stopped = true;
        },
      },
    }),
  );
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByRole("button", { name: "Start local location view", exact: true })
    .click();
}
test("local live position needs a separate pick and recipient preview before sharing", async ({
  page,
}) => {
  const outside: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:5173")) outside.push(r.url());
  });
  await localWatch(page);
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 20 },
      timestamp: Date.now(),
    }),
  );
  await expect(page.locator(".local-position")).toContainText("19.073000");
  expect(outside).toEqual([]);
  await page
    .getByRole("button", {
      name: "Use this one-time position in my update",
      exact: true,
    })
    .click();
  expect(await page.evaluate(() => (window as any).__stopped)).toBe(true);
  await page
    .getByLabel("Recipient label", { exact: true })
    .fill("Example contact");
  await page
    .getByLabel("WhatsApp number with country code", { exact: true })
    .fill("15555550123");
  await page
    .getByLabel("I chose this recipient and want to prepare this exact update.")
    .check();
  await page
    .getByRole("button", { name: "Preview this update", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("One-time position");
  await expect(page.getByRole("dialog")).toContainText("19.073000");
  await expect(page.getByRole("dialog")).toContainText("20 m");
  await expect(page.getByRole("dialog")).toContainText(
    "not a live tracking link",
  );
  expect(outside).toEqual([]);
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Remove position from update", exact: true })
    .click();
  await expect(
    page.getByLabel(
      "I chose this recipient and want to prepare this exact update.",
    ),
  ).not.toBeChecked();
});
test("cover stops local live position and ignores a late reading", async ({
  page,
}) => {
  await localWatch(page);
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 20 },
      timestamp: Date.now(),
    }),
  );
  await page
    .getByRole("button", { name: "Return to page", exact: true })
    .click();
  expect(await page.evaluate(() => (window as any).__stopped)).toBe(true);
  await expect(page.locator(".local-position")).not.toContainText("19.073000");
});

test("revoke update stops a running watch and late callback cannot repopulate it", async ({
  page,
}) => {
  await localWatch(page);
  await page
    .getByRole("button", { name: "Revoke and clear update", exact: true })
    .click();
  expect(await page.evaluate(() => (window as any).__stopped)).toBe(true);
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 20 },
      timestamp: Date.now(),
    }),
  );
  await expect(page.locator(".local-position")).not.toContainText("19.073000");
});

test("stale local reading disappears instead of appearing live", async ({
  page,
}) => {
  await page.clock.install();
  await localWatch(page);
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 20 },
      timestamp: Date.now(),
    }),
  );
  await page.clock.fastForward(121000);
  await expect(page.locator(".local-position")).not.toContainText("19.073000");
  await expect(page.locator(".local-position")).toContainText(
    "Reading expired",
  );
});
