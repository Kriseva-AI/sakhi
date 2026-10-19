import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const receipt = {
  source: "Automated test fixture",
  fetched_at: "2026-10-20T05:00:00Z",
  expires_at: "2099-10-20T06:00:00Z",
};
const place = {
  id: "node/123",
  name: "Fictional public place for testing",
  lat: 19.08,
  lon: 72.885,
  distance_m: 700,
  opening_hours: null,
  wheelchair: null,
  phone: null,
  source_url: "https://www.openstreetmap.org/node/123",
};
const weather = {
  ...receipt,
  current: {
    time: "2026-10-20T12:00",
    temperature_2m: 29,
    precipitation: 0,
    is_day: 1,
    wind_speed_10m: 12,
  },
  days: [
    {
      date: "2026-10-20",
      sunrise: "2026-10-20T06:34",
      sunset: "2026-10-20T18:12",
    },
  ],
  hours: [12, 13, 14, 15].map((h, i) => ({
    time: `2026-10-20T${h}:00`,
    rain_probability: i * 20,
  })),
  timezone: "Asia/Kolkata",
};
async function fixtures(page: Page) {
  await page.route("**/api/explore/**", async (route) => {
    const url = route.request().url();
    if (url.endsWith("/places"))
      return route.fulfill({
        json: {
          ...receipt,
          places: [place],
          snapshot_at: "2026-10-20T04:00:00Z",
        },
      });
    if (url.endsWith("/weather")) return route.fulfill({ json: weather });
    if (url.endsWith("/route"))
      return route.fulfill({
        json: {
          ...receipt,
          mode: route.request().postDataJSON().mode,
          distance_m: 1200,
          duration_minutes: 16,
          coordinates: [
            [72.883, 19.073],
            [72.885, 19.08],
          ],
        },
      });
    return route.fulfill({
      json: {
        ...receipt,
        cities: [
          { name: "Nashik", state: "Maharashtra", lat: 19.997, lon: 73.79 },
        ],
      },
    });
  });
  // Do not exercise community tile hosting in automated regression tests.
  await page.route("https://tile.openstreetmap.org/**", (r) =>
    r.fulfill({
      status: 200,
      contentType: "image/png",
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==",
        "base64",
      ),
    }),
  );
}
test("travel starts without outside requests, location prompts or provider calls", async ({
  page,
}) => {
  const requests: string[] = [];
  await page.addInitScript(() => {
    navigator.geolocation.getCurrentPosition = () => {
      throw new Error("Unrequested GPS");
    };
  });
  page.on("request", (r) => {
    if (
      r.url().includes("/api/explore/") ||
      !r.url().startsWith("http://127.0.0.1:5173")
    )
      requests.push(r.url());
  });
  await page.goto("/en-IN/nearby");
  await expect(
    page.getByRole("button", { name: "Load live map", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".leaflet-host")).toHaveCount(0);
  expect(requests).toEqual([]);
});
test("real map library loads only after consent and revocation removes it", async ({
  page,
}) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Load live map", exact: true })
    .click();
  await expect(page.locator(".leaflet-tile-loaded").first()).toBeVisible();
  await expect(page.locator(".leaflet-control-attribution")).toContainText(
    "OpenStreetMap contributors",
  );
  await page
    .getByRole("button", { name: "Turn off map & clear results", exact: true })
    .click();
  await expect(page.locator(".leaflet-host")).toHaveCount(0);
});
test("places to selected source to walking and driving route works without claiming availability", async ({
  page,
}) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await page
    .getByRole("button", { name: /Fictional public place for testing/ })
    .click();
  await expect(
    page.getByRole("heading", { name: place.name, exact: true }),
  ).toBeFocused();
  await expect(page.locator(".selected-place")).toContainText("Unknown");
  await page
    .getByRole("button", { name: "Calculate public route", exact: true })
    .click();
  await expect(page.locator(".route-result")).toContainText(
    "1.2 km · about 16 min walking",
  );
  await page.getByLabel("Route estimate", { exact: true }).selectOption("car");
  await expect(page.locator(".route-result")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Calculate public route", exact: true })
    .click();
  await expect(page.locator(".route-result")).toContainText("driving");
  await page
    .getByRole("button", { name: "Inspect source record", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("www.openstreetmap.org");
});
test("empty records and provider failure have different states and clear old results", async ({
  page,
}) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await expect(page.locator(".place-list li")).toHaveCount(1);
  await page.route("**/api/explore/places", (r) =>
    r.fulfill({ json: { ...receipt, places: [], snapshot_at: null } }),
  );
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await expect(
    page.getByText("No records were returned.", { exact: false }),
  ).toBeVisible();
  await page.route("**/api/explore/places", (r) =>
    r.fulfill({ status: 503, json: { detail: "unavailable" } }),
  );
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("unavailable");
  await expect(page.locator(".place-list")).toHaveCount(0);
});
test("city search is submitted explicitly and changing city discards old results", async ({
  page,
}) => {
  await fixtures(page);
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/explore/cities")) requests.push(r.url());
  });
  await page.goto("/en-IN/nearby");
  await page.getByText("Find another city in India", { exact: true }).click();
  await page
    .getByLabel("Public city name only", { exact: true })
    .fill("Nashik");
  expect(requests).toEqual([]);
  await page
    .getByRole("button", { name: "Search cities", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Nashik, Maharashtra", exact: true })
    .click();
  await expect(page.getByLabel("Choose a city or district")).toHaveValue(
    "Nashik",
  );
  await page.getByText("Prefer to use Google Maps?", { exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Preview map search", exact: true }),
  ).toBeDisabled();
});
test("weather and daylight show dated values and never a crime score", async ({
  page,
}) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "Conditions", exact: true }).click();
  await page
    .getByRole("button", { name: "Load conditions", exact: true })
    .click();
  await expect(page.locator(".weather-reading")).toContainText("29°");
  await page
    .getByLabel("Check a departure time (IST)", { exact: true })
    .fill("2026-10-20T12:00");
  await expect(page.locator(".daylight-result")).toHaveText(
    "During forecast daylight",
  );
  await page
    .getByLabel("Check a departure time (IST)", { exact: true })
    .fill("2026-10-20T20:00");
  await expect(page.locator(".daylight-result")).toHaveText(
    "Outside forecast daylight",
  );
  await expect(page.locator(".conditions-panel")).toContainText(
    "not a measure of crime",
  );
});
test("public trip export and neutral check-in preview do not expose coordinates or claim sending", async ({
  page,
}) => {
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByLabel("Choose a public meeting point", { exact: true })
    .check();
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Save public travel card", exact: true })
    .click();
  expect((await pending).suggestedFilename()).toBe(
    "sakhi-public-travel-card.txt",
  );
  await page
    .getByRole("button", { name: "Preview check-in message", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("wa.me");
  await expect(dialog).toContainText("No location, journey or story");
  await expect(dialog).not.toContainText("72.883");
});
test("page check-in handles elapsed time and cancels without notifying anyone", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page.getByLabel("Remind me in", { exact: true }).selectOption("5");
  await page
    .getByRole("button", { name: "Start page reminder", exact: true })
    .click();
  await page.clock.fastForward(301_000);
  await expect(
    page.getByText("Time to check in. Contact the person you chose.", {
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "I’m here. End reminder", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Start page reminder", exact: true }),
  ).toBeVisible();
});
test("GPS stays local and resolves only to a supported city after user gesture", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({
    latitude: 19.076,
    longitude: 72.878,
    accuracy: 100,
  });
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/explore/")) requests.push(r.url());
  });
  await page.goto("/en-IN/nearby");
  await page.getByText("Find another city in India", { exact: true }).click();
  await page
    .getByRole("button", { name: "Suggest my city", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Suggested city: Mumbai" }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([
    "sakhi.locale",
  ]);
});
test("late API result cannot return after clear session", async ({ page }) => {
  let finish: (() => void) | undefined;
  await page.route("**/api/explore/places", async (r) => {
    await new Promise<void>((resolve) => {
      finish = resolve;
    });
    await r
      .fulfill({ json: { ...receipt, places: [place], snapshot_at: null } })
      .catch(() => {});
  });
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Cancel lookup", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  finish?.();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await expect(page.locator(".place-list")).toHaveCount(0);
});
test("synthetic mode blocks live providers, GPS, share and downloads", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await page
    .getByRole("button", { name: "Try a fictional example", exact: true })
    .click();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await page.getByText("Find another city in India", { exact: true }).click();
  for (const label of ["Load live map", "Suggest my city", "Search this area"])
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toBeDisabled();
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  for (const label of [
    "Save public travel card",
    "Preview check-in message",
    "Start page reminder",
  ])
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toBeDisabled();
});
test("data lens marks missing evidence instead of drawing unsafe or safe zones", async ({
  page,
}) => {
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expect(page.locator(".data-lens")).toContainText(
    "Crime zones are not available",
  );
  await expect(page.locator(".data-lens")).toContainText("No validated model");
});
for (const width of [320, 390, 768, 1440])
  test(`travel interactions reflow and pass axe at ${width}`, async ({
    page,
  }) => {
    await fixtures(page);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en-IN/nearby");
    await page
      .getByRole("button", { name: "Load live map", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Search this area", exact: true })
      .click();
    await page
      .getByRole("button", { name: /Fictional public place for testing/ })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

test("reminder persists between travel panels and ends on clear session", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByRole("button", { name: "Start page reminder", exact: true })
    .click();
  await page.getByRole("button", { name: "Conditions", exact: true }).click();
  await page.clock.fastForward(60_000);
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await expect(page.locator(".checkin-count")).toContainText("14 minutes");
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Start page reminder", exact: true }),
  ).toBeVisible();
});
test("a failed tile request stays an error after the tile batch completes", async ({
  page,
}) => {
  await page.route("https://tile.openstreetmap.org/**", (r) => r.abort());
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Load live map", exact: true })
    .click();
  await expect(page.locator(".map-load-status")).toContainText(
    "Some map tiles are unavailable",
  );
});
test("a public map point can be chosen with the keyboard and routed from the city centre", async ({
  page,
}) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Load live map", exact: true })
    .click();
  const map = page.getByRole("region", { name: /Interactive OpenStreetMap/ });
  await map.focus();
  await page.keyboard.press("ArrowRight");
  const choose = page.getByRole("button", {
    name: "Choose map centre as destination",
    exact: true,
  });
  await expect(choose).toBeEnabled();
  await choose.click();
  await expect(
    page.getByRole("heading", { name: "Public point I selected", exact: true }),
  ).toBeFocused();
  const requested = page.waitForRequest("**/api/explore/route");
  await page
    .getByRole("button", { name: "Calculate public route", exact: true })
    .click();
  expect((await requested).postDataJSON().start).toEqual({
    lat: 19.073,
    lon: 72.883,
  });
  await expect(page.locator(".route-result")).toContainText("walking");
});

test("the live-map choice is visible in the first mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/nearby");
  const button = page.getByRole("button", {
    name: "Load live map",
    exact: true,
  });
  await expect(button).toBeInViewport();
  const box = (await button.boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(844);
});

test("map consent and revocation preserve keyboard focus", async ({ page }) => {
  await fixtures(page);
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Load live map", exact: true })
    .click();
  await expect(page.locator(".map-caption > span")).toBeFocused();
  await page
    .getByRole("button", { name: "Turn off map & clear results", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Load live map", exact: true }),
  ).toBeFocused();
});
