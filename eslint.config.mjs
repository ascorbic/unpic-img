// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/dist/**/*",
      "**/output/*/src",
      "**/package.json",
      "**/build/**/*",
      "**/.astro/*",
      "**/.netlify/*",
      "**/.next/*",
      "**/.nuxt/*",
      "**/.svelte-kit/*",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
    },
  },
);
