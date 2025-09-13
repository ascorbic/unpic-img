/// <reference types="vitest" />
/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [
        { browser: "chromium" },
        // { browser: "firefox" },
        // { browser: "webkit" },
      ],
      viewport: { width: 1280, height: 720 },
    },
    // No need to specify environment when browser.enabled is true
    // Timeout for tests (useful for slow image loading tests)
    testTimeout: 30000,
    // Hook timeout
    hookTimeout: 30000,
  },
});