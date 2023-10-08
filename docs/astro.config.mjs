import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
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
    react({
      include: [
        "src/components/Header/Search.tsx",
        "src/components/LanguageSelect.tsx",
        "src/components/CodeEditor/index.tsx",
      ],
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  site: `https://unpic.pics`,
});
