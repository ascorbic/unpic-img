---
title: "@unpic/solid"
description: "Lorem ipsum dolor sit amet - 4"
---

## Installation and usage

```bash
npm install @unpic/solid
```

```tsx
import type { Component } from "solid-js";
import { Image } from "@unpic/solid";

const MyComponent: Component = () => {
  return (
    <Image
      src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
      layout="constrained"
      width={800}
      height={600}
      alt="A lovely bath"
    />
  );
};
```
