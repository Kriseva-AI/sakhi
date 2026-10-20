import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function minor(page: import("@playwright/test").Page) {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "Under 18", exact: true }).click();
}
test("child pathway has a specific online alternative without adult disclosure or API", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/navigate")) requests.push(r.url());
  });
  await minor(page);
  await expect(
    page.getByRole("heading", { name: "Child Helpline", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("We could not identify a specific pathway."),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Online abuse or images", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Intimate images or threats to share",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("button", { name: "Preview Take It Down", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".support-guide")).toContainText(
    "Do not download, forward or upload intimate images to Sakhi.",
  );
  await expect(
    page.locator("main textarea, main input[type=file]"),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Preview Take It Down", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("takeitdown.ncmec.org");
  await expect(page.getByRole("dialog")).toContainText("No story or form data");
  expect(requests).toEqual([]);
});

test("unknown image age never implies adult eligibility and offline alternatives remain", async ({
  page,
}) => {
  await page.route("**/api/**", (r) => r.abort());
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Prefer not to say", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Online or digital concerns", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Intimate images or threats to share",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Not sure / prefer not to say", exact: true })
    .click();
  await expect(page.locator(".support-guide")).toContainText(
    "Eligibility is not established",
  );
  await expect(
    page.getByRole("button", { name: "Preview StopNCII", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Report a cyber concern", exact: true }),
  ).toBeVisible();
});

test("adult image made under18 gets the underage-image service", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByRole("button", { name: "Online or digital concerns", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Intimate images or threats to share",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Under 18 when it was made", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Preview Take It Down", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Preview StopNCII", exact: true }),
  ).toHaveCount(0);
});

test("discreet cover restores locally and clear removes the held page", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Notes", exact: true }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Notes");
  await page
    .getByRole("button", { name: "Return to page", exact: true })
    .click();
  await expect(page.locator("main h1")).toHaveText("Choose your next step.");
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await page
    .getByRole("button", { name: "Clear and return home", exact: true })
    .click();
  await expect(page.locator("main h1")).toContainText("Support for women");
});

test("nearby failure has immediate specific recovery outside collapsed details", async ({
  page,
}) => {
  await page.route("**/api/explore/places", (r) =>
    r.fulfill({ status: 503, json: { detail: "unavailable" } }),
  );
  await page.goto("/en-IN/nearby");
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("unavailable");
  await page
    .getByRole("button", {
      name: "Preview alternative map search",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toContainText("google.com");
  await expect(page.getByRole("dialog")).toContainText("Mumbai");
});

test("every page has two contextual visual cues without serious axe violations", async ({
  page,
}) => {
  for (const route of [
    "",
    "finder",
    "resources",
    "prepare",
    "nearby",
    "trust",
    "community",
    "maintenance",
    "components",
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en-IN/" + route);
    await expect(page.locator(".journey-cue")).toBeVisible();
    expect(await page.locator(".journey-cue [data-cue]").count()).toBe(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((v) =>
        ["critical", "serious"].includes(v.impact || ""),
      ),
    ).toEqual([]);
  }
});

test("recipient draft is local, previewed exactly and never becomes delivery", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:5173")) external.push(r.url());
  });
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByLabel("Recipient label", { exact: true })
    .fill("Example contact");
  await page
    .getByLabel("WhatsApp number with country code", { exact: true })
    .fill("15555550123");
  await page
    .getByRole("button", { name: "Preview this update", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "Confirm that you chose this recipient",
  );
  await page
    .getByLabel("I chose this recipient and want to prepare this exact update.")
    .check();
  await page
    .getByRole("button", { name: "Preview this update", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Example contact");
  await expect(page.getByRole("dialog")).toContainText("+15555550123");
  await expect(page.getByRole("dialog")).toContainText(
    "Could we agree a check-in time",
  );
  await expect(page.getByRole("dialog")).toContainText("No location");
  await page.keyboard.press("Escape");
  await expect(
    page
      .locator(".update-status > div")
      .filter({ has: page.locator("dt", { hasText: /^Sent$/ }) }),
  ).toContainText("not observed");
  expect(external).toEqual([]);
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain(
    "15555550123",
  );
  await page
    .getByRole("button", { name: "Revoke and clear update", exact: true })
    .click();
  await expect(page.getByLabel("Recipient label", { exact: true })).toHaveValue(
    "",
  );
  await expect(
    page.getByLabel("WhatsApp number with country code", { exact: true }),
  ).toHaveValue("");
});

test("live-location companion requires separate consent and explains stop/last location", async ({
  page,
}) => {
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByRole("button", { name: "Help me share live location", exact: true })
    .click();
  await expect(page.locator(".live-location-guide")).toContainText(
    "Location permission does not authorize sharing",
  );
  await expect(page.locator(".live-location-guide")).toContainText(
    "Stop sharing",
  );
  await expect(page.locator(".live-location-guide")).toContainText(
    "last shared location",
  );
  await expect(page.locator(".live-location-guide")).toContainText(
    "Sakhi does not start or monitor",
  );
});

test("edited recipient revokes the old draft approval", async ({ page }) => {
  await page.goto("/en-IN/nearby");
  await page.getByRole("button", { name: "My plan", exact: true }).click();
  await page
    .getByLabel("Recipient label", { exact: true })
    .fill("Example contact");
  await page
    .getByLabel("WhatsApp number with country code", { exact: true })
    .fill("15555550123");
  const consent = page.getByLabel(
    "I chose this recipient and want to prepare this exact update.",
  );
  await consent.check();
  await page
    .getByLabel("WhatsApp number with country code", { exact: true })
    .fill("15555550124");
  await expect(consent).not.toBeChecked();
});

test("unresponsive provider reaches a bounded recovery state", async ({
  page,
}) => {
  await page.route("**/api/explore/places", () => new Promise(() => {}));
  await page.goto("/en-IN/nearby");
  await page.clock.install();
  await page
    .getByRole("button", { name: "Search this area", exact: true })
    .click();
  await page.clock.fastForward(12500);
  await expect(page.getByRole("alert")).toContainText("timed out");
  await expect(
    page.getByRole("button", { name: "Search this area", exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByRole("button", {
      name: "Preview alternative map search",
      exact: true,
    }),
  ).toBeVisible();
});

test("guide choices move keyboard focus to the next question", async ({
  page,
}) => {
  await minor(page);
  await page
    .getByRole("button", { name: "Online abuse or images", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Which next step would help?",
      exact: true,
    }),
  ).toBeFocused();
});

test("cover invalidates a late device location suggestion", async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as any).__geoCallback = null;
    Object.defineProperty(navigator, "geolocation", {
      value: {
        getCurrentPosition: (success: unknown) => {
          (window as any).__geoCallback = success;
        },
      },
    });
  });
  await page.goto("/en-IN/nearby");
  await page.getByText("Find another city in India", { exact: true }).click();
  await page
    .getByRole("button", { name: "Suggest my city", exact: true })
    .click();
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await page.evaluate(() => {
    (window as any).__geoCallback({
      coords: { latitude: 28.614, longitude: 77.209, accuracy: 25 },
    });
  });
  await page
    .getByRole("button", { name: "Return to page", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Use Delhi", exact: true }),
  ).toHaveCount(0);
});

test("discreet cover remains reachable inside an outbound modal", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  await page
    .getByRole("button", { name: "Open official website" })
    .first()
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Hide page", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Notes", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Return to page", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("removing a saved language choice does not restore it on reload", async ({
  page,
}) => {
  await page.goto("/en-IN/trust");
  await page.getByLabel("Language", { exact: true }).selectOption("hi-IN");
  expect(await page.evaluate(() => localStorage.getItem("sakhi.locale"))).toBe(
    "hi-IN",
  );
  await page
    .getByText("Storage controls and public corrections", { exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Remove saved language preference",
      exact: true,
    })
    .click();
  expect(
    await page.evaluate(() => localStorage.getItem("sakhi.locale")),
  ).toBeNull();
  await page.reload();
  expect(
    await page.evaluate(() => localStorage.getItem("sakhi.locale")),
  ).toBeNull();
});

test("emergency access survives a blocked application bundle with JavaScript enabled", async ({
  page,
}) => {
  await page.route("**/src/main.tsx", (route) => route.abort());
  await page.goto("/en-IN/");
  await expect(
    page.getByRole("link", { name: "Call 112", exact: true }),
  ).toHaveAttribute("href", "tel:112");
});
