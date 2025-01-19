import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: ["src/index.ts", "src/base/base.ts"],
      name: "Image",
      fileName: (format, name) => `${name}.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "@unpic/core"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
