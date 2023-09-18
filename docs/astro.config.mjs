import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact({
      include: [
        "src/components/RightSidebar/ThemeToggleButton.tsx",
        "src/components/PlaceholderPlayground/index.tsx",
        "src/components/Header/SidebarToggle.tsx",
      ],
    }),
    // Enable React for the Algolia search component.
    react({
      include: [
        "src/components/Header/Search.tsx",
        "src/components/LanguageSelect.tsx",
      ],
    }),
    sitemap(),
  ],
  site: `https://unpic.pics`,
});
