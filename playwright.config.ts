import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  fullyParallel: false,
  timeout: 30_000,
  retries: 0,
  workers: 1,
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    {
      name: "firefox",
      testMatch: [
        "pillars.spec.ts",
        "travel.spec.ts",
        "recovery.spec.ts",
        "location-sharing.spec.ts",
        "care-input.spec.ts",
        "private-media.spec.ts",
        "localisation-release.spec.ts",
      ],
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      testMatch: [
        "pillars.spec.ts",
        "travel.spec.ts",
        "recovery.spec.ts",
        "location-sharing.spec.ts",
        "care-input.spec.ts",
        "private-media.spec.ts",
        "localisation-release.spec.ts",
      ],
      use: { browserName: "webkit" },
    },
  ],
  reporter: [
    ["list"],
    ["json", { outputFile: "docs/evidence/browser-results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:5173",
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command:
        "uv run uvicorn services.api.main:app --host 127.0.0.1 --port 8765 --no-access-log",
      url: "http://127.0.0.1:8765/api/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "uv run uvicorn services.api.main:app --host 127.0.0.1 --port 8767 --no-access-log",
      url: "http://127.0.0.1:8767/api/health",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
