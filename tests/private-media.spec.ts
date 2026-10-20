import { test, expect } from "@playwright/test";

async function adultMedia(page: import("@playwright/test").Page) {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Understand my options", exact: true })
    .click();
  await page.getByRole("button", { name: "18 or older", exact: true }).click();
  await page
    .getByRole("button", { name: "Add audio or video", exact: true })
    .click();
}
function wav() {
  const buffer = Buffer.alloc(8044);
  buffer.write("RIFF");
  buffer.writeUInt32LE(8036, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(8000, 24);
  buffer.writeUInt32LE(16000, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(8000, 40);
  return buffer;
}
test("age gate prevents media acquisition for unspecified age", async ({
  page,
}) => {
  await page.goto("/en-IN/finder");
  await page
    .getByRole("button", { name: "Add audio or video", exact: true })
    .click();
  await expect(page.locator("input[type=file]")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Record a voice note", exact: true }),
  ).toHaveCount(0);
});
test("local file preview never uploads and Hide revokes the object URL", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST" || r.method() === "PUT")
      posts.push(new URL(r.url()).pathname);
  });
  await adultMedia(page);
  await page
    .getByLabel("Choose an existing audio or video file")
    .setInputFiles({
      name: "synthetic.wav",
      mimeType: "audio/wav",
      buffer: wav(),
    });
  await expect(page.locator("audio")).toBeVisible();
  const src = await page.locator("audio").getAttribute("src");
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await expect(page.locator("audio")).toHaveCount(0);
  expect(
    await page.evaluate(async (url) => {
      try {
        await fetch(url!);
        return false;
      } catch {
        return true;
      }
    }, src),
  ).toBe(true);
  expect(posts).toEqual([]);
});
test("declined microphone gives a useful alternative", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
      value: async () => {
        throw new DOMException("denied", "NotAllowedError");
      },
    });
  });
  await adultMedia(page);
  await page
    .getByRole("button", { name: "Record a voice note", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "permission was declined" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Stop recording", exact: true }),
  ).toHaveCount(0);
});
test("late microphone permission after cancelling is stopped and discarded", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: () =>
          new Promise((resolve) => {
            (window as any).resolveMic = () =>
              resolve({
                getTracks: () => [
                  {
                    stop: () => {
                      (window as any).micStopped = true;
                    },
                  },
                ],
              });
          }),
      },
      configurable: true,
    });
  });
  await adultMedia(page);
  await page
    .getByRole("button", { name: "Record a voice note", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Cancel microphone request", exact: true })
    .click();
  await page.evaluate(() => (window as any).resolveMic());
  await expect
    .poll(() => page.evaluate(() => (window as any).micStopped))
    .toBe(true);
  await expect(page.locator("audio")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Stop recording", exact: true }),
  ).toHaveCount(0);
});
test("invalid file has a recovery path and the original filename is not exposed", async ({
  page,
}) => {
  await adultMedia(page);
  await page
    .getByLabel("Choose an existing audio or video file")
    .setInputFiles({
      name: "PRIVATE-TEST-ONLY.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("synthetic"),
    });
  await expect(
    page.getByRole("status").filter({ hasText: "use text or symbols instead" }),
  ).toBeVisible();
  await expect(page.getByText("PRIVATE-TEST-ONLY.txt")).toHaveCount(0);
  expect(page.url()).not.toContain("PRIVATE");
});

test("a bounded synthetic voice note remains playable with streamed duration metadata", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Real synthetic MediaRecorder capture is exercised in Chromium; physical codecs are a separate gate.",
  );
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: async () => {
          const audio = new AudioContext();
          const oscillator = audio.createOscillator();
          const target = audio.createMediaStreamDestination();
          oscillator.connect(target);
          oscillator.start();
          return target.stream;
        },
      },
      configurable: true,
    }),
  );
  await adultMedia(page);
  await page
    .getByRole("button", { name: "Record a voice note", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Stop recording", exact: true }),
  ).toBeVisible();
  // Let the synthetic recorder emit its first250ms chunk before stopping.
  await page.waitForTimeout(400);
  await page
    .getByRole("button", { name: "Stop recording", exact: true })
    .click();
  await expect(page.locator("audio")).toBeVisible();
  await page.locator("audio").evaluate((audio) => {
    Object.defineProperty(audio, "duration", {
      value: Infinity,
      configurable: true,
    });
    audio.dispatchEvent(new Event("loadedmetadata"));
  });
  await expect(page.locator("audio")).toBeVisible();
});
