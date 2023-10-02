import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import impala from "@impalajs/core/plugin";

export default defineConfig({
  plugins: [react(), impala()],
});
