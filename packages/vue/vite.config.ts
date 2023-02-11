import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Image",
      fileName: "image",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "@unpic/core"],
    },
  },
});
