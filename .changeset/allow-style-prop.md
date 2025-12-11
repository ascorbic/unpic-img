---
"@unpic/core": minor
"@unpic/react": minor
---

Allow passing `style` prop to Image component. The `UnpicImageProps` type now accepts the `style` prop, enabling TypeScript users to pass inline styles without type casting. User-provided styles are merged with component-generated styles, with user styles taking precedence when there are conflicts.
