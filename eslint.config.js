export default [
  {
    ignores: ["dist", "output/*/src", "package.json"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
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
];
