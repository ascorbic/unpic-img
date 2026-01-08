---
"@unpic/core": patch
"@unpic/react": patch
---

Fix type definition to allow `style` prop on Image component. This is a TypeScript-only change that corrects an incorrect type definition - the `style` prop was always supported at runtime but was incorrectly omitted from the type. No runtime behavior has changed.
