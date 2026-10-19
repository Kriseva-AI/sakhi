import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("anonymous cyber journey, exact destination preview and cancel sends nothing", async ({
  page,
}) => {
  const outgoing: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:5173")) outgoing.push(r.url());
  });
  await page.goto("/en-IN/");
  await page
    .getByRole("button", { name: "Find my next step", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByLabel("A few words, if you want")
    .fill("Someone made an impersonation account of me");
  await page
    .getByRole("button", { name: "Show my options", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your options, your choice" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Report a cyber concern" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Open official website" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText("cybercrime.gov.in");
  await expect(page.getByRole("dialog")).toContainText("No story or form data");
  await page.getByRole("button", { name: "Stay in Sakhi" }).click();
  expect(outgoing).toEqual([]);
});

test("emergency is available before API and in airplane mode", async ({
  page,
  context,
}) => {
  await page.route("**/api/**", (route) => route.abort());
  await page.goto("/en-IN/");
  await context.setOffline(true);
  await expect(
    page.getByRole("link", { name: /Call 112/ }).first(),
  ).toHaveAttribute("href", "tel:112");
});

test("synthetic demo cannot open services and erase removes input", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await page.getByRole("button", { name: "Try a fictional example" }).click();
  await expect(
    page.getByText("Synthetic example. No calls, sharing or external links."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Preview official website" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "disabled in this fictional example",
  );
  await expect(page.getByRole("dialog").getByRole("link")).toHaveCount(0);
  await page.getByRole("button", { name: "Stay in Sakhi" }).click();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Session cleared");
  await expect(
    page.getByRole("heading", { name: /Your next step/ }),
  ).toBeVisible();
});

test("minor receives child route rather than adult results", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "Under 18", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Child Helpline" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "National Commission for Women" }),
  ).toHaveCount(0);
});

for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]) {
  test(`no overflow and no serious axe violations at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en-IN/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
  });
}

for (const route of ["finder", "resources", "trust", "maintenance"]) {
  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]) {
    test(`${route} reflows at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/en-IN/${route}`);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (width === 320 || width === 1440) {
        const r = await new AxeBuilder({ page }).analyze();
        expect(
          r.violations.filter((v) =>
            ["critical", "serious"].includes(v.impact ?? ""),
          ),
        ).toEqual([]);
      }
    });
  }
}
for (const code of [
  "en-IN",
  "hi-IN",
  "bn-IN",
  "mr-IN",
  "te-IN",
  "ta-IN",
  "gu-IN",
  "kn-IN",
  "ml-IN",
  "or-IN",
  "pa-IN",
  "as-IN",
  "ur-IN",
  "ne-IN",
  "kok-IN",
  "ks-Arab-IN",
]) {
  test(`locale shell ${code} has explicit fallback and correct direction`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${code}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", code);
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      ["ur-IN", "ks-Arab-IN"].includes(code) ? "rtl" : "ltr",
    );
    if (code !== "en-IN")
      await expect(
        page.getByText(/Beta translation. Human language/),
      ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (["hi-IN", "ur-IN", "ks-Arab-IN"].includes(code)) {
      const r = await new AxeBuilder({ page }).analyze();
      expect(
        r.violations.filter((v) =>
          ["critical", "serious"].includes(v.impact ?? ""),
        ),
      ).toEqual([]);
    }
  });
}
test("mid-session switch preserves only memory, browser back works, clear erases narrative", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  const input = page.getByLabel("A few words, if you want");
  await input.fill("SYNTHETIC-PRIVATE-MARKER");
  await page.getByLabel("Language", { exact: true }).selectOption("hi-IN");
  await expect(input).toHaveValue("SYNTHETIC-PRIVATE-MARKER");
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain(
    "SYNTHETIC-PRIVATE-MARKER",
  );
  await page.getByLabel("Language", { exact: true }).selectOption("en-IN");
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await page.reload();
  expect(await page.content()).not.toContain("SYNTHETIC-PRIVATE-MARKER");
  await page
    .getByRole("link", { name: "Public resources", exact: true })
    .click();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: /Your next step/ }),
  ).toBeVisible();
});
test("general help download excludes any story and keyboard escapes destination preview", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  const event = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download general help card" })
    .first()
    .click();
  const file = await event;
  expect(file.suggestedFilename()).toBe("sakhi-public-emergency.txt");
  await page
    .getByRole("button", { name: "Open official website" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("200 and 400 percent reflow equivalents at 640 and 320 CSS pixels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/en-IN/");
  for (const zoom of [2, 4]) {
    await page.setViewportSize({ width: 1280 / zoom, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("clear invalidates a delayed navigation response", async ({ page }) => {
  let release!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/navigate", async (route) => {
    await held;
    try {
      await route.fulfill({
        json: {
          state: "present_options",
          category: "cyber",
          abstained: false,
          resources: [],
          engine: "sqlite_fts5_bm25",
          warnings: [],
          external_actions: false,
        },
      });
    } catch {}
  });
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByLabel("A few words, if you want")
    .fill("fictional online impersonation");
  await page
    .getByRole("button", { name: "Show my options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  release();
  await page.waitForTimeout(250);
  await expect(
    page.getByRole("heading", { name: /Your next step/ }),
  ).toBeVisible();
  expect(new URL(page.url()).pathname).toBe("/en-IN/");
});
test("step change focuses and announces the next question", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Is this for someone 18 or older?" }),
  ).toBeFocused();
});
test("expired public pack retains honest general fallback links", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2030-01-01"));
  await page.route("**/api/**", (r) => r.abort());
  await page.goto("/en-IN/resources");
  await expect(
    page.getByText(/This source is past its review date/).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open official website" }).first(),
  ).toBeVisible();
});

test("direct goal reaches public options in three selections", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await page.getByRole("button", { name: /^Understand my options/ }).click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByRole("button", { name: "Online or digital concerns", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your options, your choice" }),
  ).toBeVisible();
});
