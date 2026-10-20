import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("preparation and recovery contexts are distinct and do not collect a story", async ({
  page,
}) => {
  await page.goto("/en-IN/prepare");
  await page
    .getByRole("tab", { name: "Before a concern", exact: true })
    .click();
  await expect(
    page.getByText(
      "Build a little readiness, without sharing anything personal.",
    ),
  ).toBeVisible();
  await page
    .getByRole("tab", { name: "After an incident", exact: true })
    .click();
  await expect(
    page.getByText("Explore support without committing to a complaint."),
  ).toBeVisible();
  await expect(page.locator("textarea")).toHaveCount(0);
});
test("official pathway rail opens an honest destination preview", async ({
  page,
}) => {
  await page.goto("/en-IN/prepare");
  await page
    .getByRole("button", {
      name: "NALSA · Public legal aid information",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toContainText("nalsa.gov.in");
  await expect(page.getByRole("dialog")).toContainText("No story or form data");
});
test("prepare page has a public checklist and a generic kit download", async ({
  page,
}) => {
  await page.goto("/en-IN/prepare");
  await page
    .getByRole("button", { name: "Digital privacy", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Start with the device you trust" }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", {
      name: "Add legal aid information to my public kit",
    })
    .check();
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download my public kit", exact: true })
    .click();
  expect((await pending).suggestedFilename()).toBe("sakhi-public-kit.txt");
});
test("map handoff omits origin and GPS and makes external disclosure explicit", async ({
  page,
}) => {
  await page.goto("/en-IN/nearby");
  await page.getByLabel("Choose a city or district").selectOption("Ahmedabad");
  await page.getByText("Prefer to use Google Maps?", { exact: true }).click();
  await page
    .getByRole("button", { name: "Preview map search", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("www.google.com");
  await expect(dialog).toContainText("Ahmedabad");
  await expect(dialog).toContainText("Your origin and GPS are not included");
  expect(await dialog.textContent()).not.toContain("origin=");
  expect(await dialog.textContent()).not.toContain("destination=undefined");
});
test("WhatsApp prepares only a public card and does not claim a message was sent", async ({
  page,
}) => {
  const outside: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:5173")) outside.push(r.url());
  });
  await page.goto("/en-IN/prepare");
  await page
    .getByRole("button", { name: "Preview WhatsApp public card", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("wa.me");
  await expect(dialog).toContainText("choose the recipient and press Send");
  await page
    .getByRole("button", { name: "Stay in Sakhi", exact: true })
    .click();
  expect(outside).toEqual([]);
  await expect(page.getByText("Message sent", { exact: true })).toHaveCount(0);
});
test("comparison explains different channel choices", async ({ page }) => {
  await page.goto("/en-IN/resources");
  await page
    .getByRole("button", { name: "Compare public pathways", exact: true })
    .click();
  await expect(
    page.getByRole("table", { name: "Public pathway comparison" }),
  ).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Public pathway comparison" }),
  ).toContainText("Eligibility and limits");
});
test("data boundary and reading comfort are visible and ephemeral", async ({
  page,
}) => {
  await page.goto("/en-IN/trust");
  await page.getByRole("tab", { name: "Inside Sakhi", exact: true }).click();
  await expect(
    page.getByText("Only your language preference is saved."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Larger text", exact: true }).click();
  await expect(page.locator(".app")).toHaveClass(/comfortable/);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});
test("community proposal is local and never submits a case", async ({
  page,
}) => {
  await page.goto("/en-IN/community");
  await expect(
    page.getByRole("heading", { name: "For the community. By the community." }),
  ).toBeVisible();
  await page.getByLabel("Public resource ID").fill("legal");
  await page
    .getByLabel("Official evidence URL")
    .fill("https://nalsa.gov.in/womens-assistance/");
  const event = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download correction proposal", exact: true })
    .click();
  expect((await event).suggestedFilename()).toBe(
    "sakhi-public-correction.json",
  );
  await expect(page.getByText("Submitted", { exact: true })).toHaveCount(0);
});
for (const route of ["", "prepare", "nearby", "community"])
  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]) {
    test(`Sprint 2 ${route || "home"} reflow ${width}`, async ({ page }) => {
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

for (const goal of [
  "Understand my options",
  "Explore reporting options",
  "Find support",
  "Help someone else",
]) {
  test(`action desk ${goal} reaches options in three selections`, async ({
    page,
  }) => {
    await page.goto("/en-IN/prepare");
    await page
      .locator(".desk-goals")
      .getByRole("button", { name: new RegExp(goal) })
      .click();
    await page
      .getByRole("button", { name: "18 or older", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Online or digital concerns", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Report a cyber concern",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("textarea")).toHaveCount(0);
  });
}
test("tabs support keyboard movement and one tab stop", async ({ page }) => {
  await page.goto("/en-IN/prepare");
  const first = page.getByRole("tab", {
    name: "Before a concern",
    exact: true,
  });
  await first.focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "After an incident", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "After an incident", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.goto("/en-IN/trust");
  await page.getByRole("tab", { name: "Inside Sakhi", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Opening a service", exact: true }),
  ).toBeFocused();
  await expect(page.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
});
test("new screens never request GPS, microphone or notification permission", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const w = window as typeof window & { sensorCalls: string[] };
    w.sensorCalls = [];
    navigator.geolocation.getCurrentPosition = () => {
      w.sensorCalls.push("gps");
    };
    navigator.geolocation.watchPosition = () => {
      w.sensorCalls.push("watch");
      return 0;
    };
    navigator.mediaDevices.getUserMedia = async () => {
      w.sensorCalls.push("microphone");
      throw new Error("No sensor access expected");
    };
    Notification.requestPermission = async () => {
      w.sensorCalls.push("notification");
      return "denied";
    };
  });
  for (const route of ["", "prepare", "nearby", "community", "trust"]) {
    await page.goto(`/en-IN/${route}`);
    expect(
      await page.evaluate(
        () => (window as typeof window & { sensorCalls: string[] }).sensorCalls,
      ),
    ).toEqual([]);
  }
});
test("clear session discards contribution and coarse map choices", async ({
  page,
}) => {
  await page.goto("/en-IN/community");
  await page
    .getByLabel("Proposed public correction (optional)")
    .fill("SYNTHETIC-DISCARD-CHOICE");
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await page.getByRole("link", { name: "Community", exact: true }).click();
  await expect(
    page.getByLabel("Proposed public correction (optional)"),
  ).toHaveValue("");
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await page.getByLabel("Choose a city or district").selectOption("Ahmedabad");
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await expect(page.getByLabel("Choose a city or district")).toHaveValue("");
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});
test("fictional examples cannot use new downloads or external handoffs", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await page
    .getByRole("button", { name: "Try a fictional example", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Prepare & learn", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Download my public kit", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", {
      name: "Preview WhatsApp public card",
      exact: true,
    }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Public places", exact: true }).click();
  await page.getByLabel("Choose a city or district").selectOption("Ahmedabad");
  await page.getByText("Prefer to use Google Maps?", { exact: true }).click();
  await page
    .getByRole("button", { name: "Preview map search", exact: true })
    .click();
  await expect(page.getByRole("dialog").locator("a[href]")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Community", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "Download correction proposal",
      exact: true,
    }),
  ).toBeDisabled();
});
test("overdue pathway checks are visible and do not become fresh claims", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2027-01-01T12:00:00Z") });
  await page.goto("/en-IN/prepare");
  await expect(
    page.getByText("Review overdue 2026-11-18", { exact: false }).first(),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Prepare & learn", exact: true })
    .first()
    .click();
  await expect(
    page.getByText("Source review is overdue.", { exact: false }),
  ).toBeVisible();
});

test("review regression: synthetic maintainer download stays disabled", async ({
  page,
}) => {
  await page.goto("/en-IN/");
  await page
    .getByRole("button", { name: "Try a fictional example", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Maintainer review", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Download correction template",
      exact: true,
    }),
  ).toBeDisabled();
});
test("review regression: comparison can include every eligible public entry", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  await page
    .getByRole("button", { name: "Compare public pathways", exact: true })
    .click();
  await expect(
    page.locator(".comparison-select input[type=checkbox]"),
  ).toHaveCount(5);
});

test("comparison selection includes workplace and NCW when chosen", async ({
  page,
}) => {
  await page.goto("/en-IN/resources");
  await page
    .getByRole("button", { name: "Compare public pathways", exact: true })
    .click();
  await page
    .getByRole("checkbox", {
      name: "Compare Women Helpline and One Stop Centres",
      exact: true,
    })
    .uncheck();
  await page
    .getByRole("checkbox", {
      name: "Compare Report a cyber concern",
      exact: true,
    })
    .uncheck();
  await page
    .getByRole("checkbox", {
      name: "Compare Workplace harassment options",
      exact: true,
    })
    .check();
  await page
    .getByRole("checkbox", {
      name: "Compare National Commission for Women",
      exact: true,
    })
    .check();
  const table = page.getByRole("table", { name: "Public pathway comparison" });
  await expect(
    table.getByRole("columnheader", { name: "Workplace harassment options" }),
  ).toBeVisible();
  await expect(
    table.getByRole("columnheader", { name: "National Commission for Women" }),
  ).toBeVisible();
});
test("correction proposal accepts an actual public PIB article query", async ({
  page,
}) => {
  await page.goto("/en-IN/community");
  await page.getByLabel("Public resource ID").fill("workplace");
  await page
    .getByLabel("Official evidence URL")
    .fill(
      "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2224438&lang=1&reg=3",
    );
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download correction proposal", exact: true })
    .click();
  expect((await pending).suggestedFilename()).toBe(
    "sakhi-public-correction.json",
  );
});
test("English fallback sections keep English metadata inside Urdu shell", async ({
  page,
}) => {
  await page.goto("/ur-IN/");
  for (const cls of ["simple-home", "simple-footer"]) {
    await expect(page.locator(`.${cls}`)).toHaveAttribute("lang", "en-IN");
    await expect(page.locator(`.${cls}`)).toHaveAttribute("dir", "ltr");
  }
  await expect(page.locator(".sprint2-hero h1")).toHaveAttribute(
    "lang",
    "ur-IN",
  );
});

test("long destination preview begins at its title before the consent checkpoint", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en-IN/nearby");
  await page.getByLabel("Choose a city or district").selectOption("Ahmedabad");
  await page.getByText("Prefer to use Google Maps?", { exact: true }).click();
  await page
    .getByRole("button", { name: "Preview map search", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  expect(await dialog.evaluate((e) => e.scrollTop)).toBe(0);
  await expect(
    dialog.getByRole("heading", {
      name: "You are in control of this next step",
    }),
  ).toBeFocused();
});
