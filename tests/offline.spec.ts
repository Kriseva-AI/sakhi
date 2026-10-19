import { test, expect } from "@playwright/test";
test("production PWA reloads offline and caches only hashed public assets", async ({
  page,
  context,
}) => {
  const outside: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:8767")) outside.push(r.url());
  });
  await page.goto("http://127.0.0.1:8767/en-IN/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByLabel("A few words, if you want")
    .fill("SYNTHETIC-NOT-CACHED impersonation online");
  await page
    .getByRole("button", { name: "Show my options", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Report a cyber concern" }),
  ).toBeVisible();
  const urls = await page.evaluate(async () => {
    const result: string[] = [];
    for (const name of await caches.keys()) {
      const c = await caches.open(name);
      for (const key of await c.keys()) result.push(key.url);
    }
    return result;
  });
  expect(urls.length).toBeGreaterThan(0);
  expect(
    urls.some(
      (u) =>
        u.includes("/api/") ||
        u.includes("?") ||
        u.includes("SYNTHETIC-NOT-CACHED"),
    ),
  ).toBe(false);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("link", { name: /Call 112/ }).first(),
  ).toHaveAttribute("href", "tel:112");
  await page
    .getByRole("button", { name: "Public resources", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Report a cyber concern" }),
  ).toBeVisible();
  expect(outside).toEqual([]);
});
test("production headers forbid device sensors, framing, and external scripts", async ({
  request,
}) => {
  const r = await request.get("http://127.0.0.1:8767/en-IN/");
  expect(r.headers()["content-security-policy"]).toContain("script-src 'self'");
  expect(r.headers()["permissions-policy"]).toContain("geolocation=()");
  expect(r.headers()["referrer-policy"]).toBe("no-referrer");
});
