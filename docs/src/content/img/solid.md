---
title: "@unpic/solid"
description: "High-performance, responsive SolidJS image component"
---

A high-performance, responsive image component for
[SolidJS](https://solidjs.com/).

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
