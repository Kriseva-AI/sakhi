// Explicit owned-loopback probe. Synthetic solid colour and silence, no private capture.
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const port = process.argv[2] || "8789";
if (!["8787", "8789"].includes(port))
  throw new Error("Use an owned loopback production preview only.");
const context = await browser.newContext({
  baseURL: `http://127.0.0.1:${port}`,
});
const page = await context.newPage();
await page.goto("/en-IN/finder");
await page
  .getByRole("button", { name: "Understand my options", exact: true })
  .click();
await page.getByRole("button", { name: "18 or older", exact: true }).click();
await page
  .getByRole("button", { name: "Add audio or video", exact: true })
  .click();
await page
  .getByLabel("Choose an existing audio or video file")
  .setInputFiles("tests/fixtures/synthetic-colour.mp4");
await page.waitForFunction(
  () => document.querySelector("video")?.readyState >= 1,
);
const video = await page
  .locator("video")
  .evaluate((video) => ({
    duration: video.duration,
    muted: video.muted,
    ready: video.readyState,
  }));
const buffer = Buffer.alloc(160044);
buffer.write("RIFF");
buffer.writeUInt32LE(160036, 4);
buffer.write("WAVEfmt ", 8);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(1, 22);
buffer.writeUInt32LE(8000, 24);
buffer.writeUInt32LE(16000, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(160000, 40);
await page
  .getByLabel("Choose an existing audio or video file")
  .setInputFiles({
    name: "synthetic-silence.wav",
    mimeType: "audio/wav",
    buffer,
  });
await page.locator("audio").evaluate(async (audio) => {
  window.heldAudio = audio;
  await audio.play();
});
const before = await page.evaluate(() => ({
  paused: window.heldAudio.paused,
  time: window.heldAudio.currentTime,
}));
await page.getByRole("button", { name: "Hide page", exact: true }).click();
await page.waitForTimeout(400);
const after = await page.evaluate(() => ({
  paused: window.heldAudio.paused,
  time: window.heldAudio.currentTime,
  source: window.heldAudio.getAttribute("src"),
}));
const report = {
  scope:
    "Actual native loopback UI, synthetic solid-colour video and silence only; no microphone or private media.",
  video,
  before,
  after,
};
await fs.writeFile(
  "docs/evidence/release-2026-10-21/media-playback-accepted.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report));
if (
  !video.muted ||
  video.duration !== 1 ||
  !after.paused ||
  after.source !== null
)
  throw new Error("Local playback/cleanup acceptance failed");
await browser.close();
