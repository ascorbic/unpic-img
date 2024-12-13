import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: { conditions: ["browser"] },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
