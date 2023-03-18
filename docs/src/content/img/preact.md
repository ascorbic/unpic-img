---
title: "@unpic/preact"
description: "High-performance, responsive Preact image component"
---

A high-performance, responsive image component for
[Preact](https://preactjs.com/).

## Installation and usage

```bash
npm install @unpic/preact
```

```tsx
import { Image } from "@unpic/preact";

function MyComponent() {
  return (
    <Image
      src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
      layout="constrained"
      width={800}
      height={600}
      alt="A lovely bath"
    />
  );
}
```
