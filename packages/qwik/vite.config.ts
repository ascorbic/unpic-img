import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
    },
    resolve: {
      alias: {
        // Not sure why, but Vitest needs these for Qwik
        "@builder.io/qwik/build": require.resolve("@builder.io/qwik/build"),
        "/src/": new URL("./src/", import.meta.url).pathname,
      },
    },
    plugins: [qwikVite()],
  };
});
