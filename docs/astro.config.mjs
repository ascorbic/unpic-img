import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
  // Enable Preact to support Preact JSX components.
  preact(),
  // Enable React for the Algolia search component.
  react(), sitemap()],
  site: `https://unpic.pics`
});