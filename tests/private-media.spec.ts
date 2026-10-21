import { test, expect, chromium } from "@playwright/test";

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
function wav(seconds = 0.5) {
  const bytes = Math.round(seconds * 16000);
  const buffer = Buffer.alloc(bytes + 44);
  buffer.write("RIFF");
  buffer.writeUInt32LE(bytes + 36, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(8000, 24);
  buffer.writeUInt32LE(16000, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(bytes, 40);
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
    // Permission policy is independent of native codec support. Linux WebKit
    // can lack MediaRecorder; this fixture never constructs a recorder.
    (window as any).MediaRecorder = class {
      constructor() {
        throw new Error("A declined request must not construct a recorder");
      }
    };
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: async () => {
          throw new DOMException("denied", "NotAllowedError");
        },
      },
      configurable: true,
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
    (window as any).MediaRecorder = class {
      constructor() {
        (window as any).unexpectedRecorderConstruction = true;
        throw new Error("Cancelled permission must not construct a recorder");
      }
    };
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
  expect(
    await page.evaluate(() => (window as any).unexpectedRecorderConstruction),
  ).toBeUndefined();
  await expect(
    page.getByRole("button", { name: "Stop recording", exact: true }),
  ).toHaveCount(0);
});
test("unsupported recording offers alternatives without requesting the microphone", async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as any).MediaRecorder = undefined;
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: async () => {
          (window as any).unexpectedMicRequest = true;
          throw new Error("Unsupported recording must not request permission");
        },
      },
      configurable: true,
    });
  });
  await adultMedia(page);
  await page
    .getByRole("button", { name: "Record a voice note", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Recording is unavailable" }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Choose an existing audio or video file"),
  ).toBeVisible();
  expect(
    await page.evaluate(() => (window as any).unexpectedMicRequest),
  ).toBeUndefined();
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
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Synthetic native capture uses Chromium's fake media driver; physical codecs are a separate gate.",
  );
  const browser = await chromium.launch({
    args: [
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
    ],
  });
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:5173",
    permissions: ["microphone"],
  });
  const page = await context.newPage();
  try {
    await page.addInitScript(() => {
      const NativeRecorder = MediaRecorder;
      (window as any).MediaRecorder = class extends NativeRecorder {
        constructor(stream: MediaStream, options?: MediaRecorderOptions) {
          super(stream, options);
          this.addEventListener("dataavailable", (event) => {
            (window as any).syntheticCapturedBytes =
              ((window as any).syntheticCapturedBytes || 0) + event.data.size;
          });
        }
      };
    });
    await adultMedia(page);
    await page
      .getByRole("button", { name: "Record a voice note", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Stop recording", exact: true }),
    ).toBeVisible();
    await expect
      .poll(
        () => page.evaluate(() => (window as any).syntheticCapturedBytes || 0),
        { timeout: 15000 },
      )
      .toBeGreaterThan(0);
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
  } finally {
    await browser.close();
  }
});

test("Hide stops decoded audio playback, including a retained media element", async ({
  page,
}) => {
  await adultMedia(page);
  await page
    .getByLabel("Choose an existing audio or video file")
    .setInputFiles({
      name: "synthetic-silence.wav",
      mimeType: "audio/wav",
      buffer: wav(10),
    });
  await page.locator("audio").evaluate(async (audio) => {
    (window as any).heldAudio = audio;
    // Decode/play without emitting test audio. CI uses a null output sink;
    // neither this check nor the synthetic recording driver tests a real mic.
    audio.muted = true;
    await audio.play();
  });
  expect(await page.evaluate(() => (window as any).heldAudio.paused)).toBe(
    false,
  );
  await page.getByRole("button", { name: "Hide page", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).heldAudio.paused))
    .toBe(true);
  expect(
    await page.evaluate(() => (window as any).heldAudio.getAttribute("src")),
  ).toBe(null);
});

test("a decoder failure clears the source and offers text or symbols without upload", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (["POST", "PUT"].includes(request.method())) posts.push(request.url());
  });
  await adultMedia(page);
  await page
    .getByLabel("Choose an existing audio or video file")
    .setInputFiles({
      name: "synthetic-silence.wav",
      mimeType: "audio/wav",
      buffer: wav(),
    });
  await expect(
    page.getByRole("status").filter({ hasText: "Local preview ready" }),
  ).toBeVisible();
  const source = await page.locator("audio").getAttribute("src");
  await page.locator("audio").evaluate((audio) => {
    (window as any).failedAudio = audio;
    audio.dispatchEvent(new Event("error"));
  });
  await expect(
    page.getByRole("status").filter({ hasText: "Audio format could not play" }),
  ).toBeVisible();
  await expect(page.locator("audio")).toHaveCount(0);
  expect(
    await page.evaluate(() => (window as any).failedAudio.getAttribute("src")),
  ).toBeNull();
  expect(
    await page.evaluate(async (url) => {
      try {
        await fetch(url!);
        return false;
      } catch {
        return true;
      }
    }, source),
  ).toBe(true);
  expect(posts).toEqual([]);
});
