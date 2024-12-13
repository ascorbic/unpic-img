import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting({ resolveBrowser: true, autoCleanup: true }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
