import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { svelteTesting } from "@testing-library/svelte/vite";
export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    environment: "jsdom",
  },
});
