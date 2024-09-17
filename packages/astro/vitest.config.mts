/// <reference types="vitest" />

import { getViteConfig } from "astro/config";

// https://vitejs.dev/config/
export default getViteConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
