---
title: "@unpic/astro"
description: "Lorem ipsum dolor sit amet - 4"
---

## Installation and usage

```bash
npm install @unpic/astro
```

```astro
---
import { Image } from "@unpic/astro";
---

<Image
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="A lovely bath"
/>
```
