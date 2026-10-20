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

async function positionPreview(page: import("@playwright/test").Page) {
  await page.clock.install();
  await localWatch(page);
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 20 },
      timestamp: Date.now(),
    }),
  );
  await page
    .getByRole("button", {
      name: "Use this one-time position in my update",
      exact: true,
    })
    .click();
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
}
test("an open position preview expires with its draft", async ({ page }) => {
  await positionPreview(page);
  await page.clock.fastForward(121000);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("background revocation closes the sensitive preview", async ({ page }) => {
  await positionPreview(page);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("denied foreground location offers manual alternative and shares nothing", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "geolocation", {
      value: {
        watchPosition: (_: unknown, error: (e: unknown) => void) => {
          setTimeout(() => error({ code: 1 }), 0);
          return 42;
        },
        clearWatch: () => {},
      },
    }),
  );
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByRole("button", { name: "Start local location view", exact: true })
    .click();
  await expect(page.locator(".local-position")).toContainText(
    "Location denied",
  );
  await expect(page.locator(".local-position")).toContainText(
    "Choose a public map point or arrange a call",
  );
  await expect(
    page.getByRole("button", {
      name: "Use this one-time position in my update",
      exact: true,
    }),
  ).toHaveCount(0);
});
test("imprecise foreground location does not become a shareable position", async ({
  page,
}) => {
  await localWatch(page);
  await page.evaluate(() =>
    (window as any).__watch({
      coords: { latitude: 19.073, longitude: 72.883, accuracy: 9000 },
      timestamp: Date.now(),
    }),
  );
  await expect(page.locator(".local-position")).toContainText("imprecise");
  await expect(
    page.getByRole("button", {
      name: "Use this one-time position in my update",
      exact: true,
    }),
  ).toHaveCount(0);
});

test("activation rechecks position expiry even before the expiry timer runs", async ({
  page,
  context,
}) => {
  const attempts: string[] = [];
  await context.route("https://wa.me/**", (r) => {
    attempts.push(r.request().url());
    return r.fulfill({ body: "Synthetic handoff blocked" });
  });
  await positionPreview(page);
  await page.getByRole("dialog").getByRole("checkbox").check();
  await page.evaluate(() => {
    const now = Date.now();
    Date.now = () => now + 121000;
  });
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Open this website", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(attempts).toEqual([]);
});

test("ordinary approved handoff remains opening requested and user reports stay labelled", async ({
  page,
  context,
}) => {
  await context.route("https://wa.me/**", (r) =>
    r.fulfill({ body: "Synthetic external app. No message sent." }),
  );
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
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
  await page.getByRole("dialog").getByRole("checkbox").check();
  const popup = page.waitForEvent("popup");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Open this website", exact: true })
    .click();
  (await popup).close();
  await expect(page.locator(".update-status")).toContainText(
    "app launch unconfirmed",
  );
  await expect(
    page
      .locator(".update-status > div")
      .filter({ has: page.locator("dt", { hasText: /^Sent$/ }) }),
  ).toContainText("not observed");
  await page
    .getByRole("button", {
      name: "I sent it in WhatsApp (my record)",
      exact: true,
    })
    .click();
  await expect(page.locator(".update-status")).toContainText(
    "You reported sending; unverified by Sakhi",
  );
  await page
    .getByRole("button", { name: "They replied (my record)", exact: true })
    .click();
  await expect(page.locator(".update-status")).toContainText(
    "You reported a reply; unverified by Sakhi",
  );
  await expect(page.locator(".update-status")).toContainText(
    "Not observed; no delivery connection",
  );
});
