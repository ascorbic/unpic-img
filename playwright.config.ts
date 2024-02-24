import { defineConfig } from "@playwright/test";

const site = process.env.SITE ?? "preact";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "e2e",
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["blob"], ["list"]]
    : [["html"], ["list"]],
  webServer: {
    command: `netlify serve --filter examples/${site}`,
    url: "http://127.0.0.1:8888",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
});
