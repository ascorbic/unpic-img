import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import impala from "@impalajs/core/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), impala()],
});
