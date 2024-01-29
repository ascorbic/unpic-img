---
title: "@unpic/svelte"
description: "High-performance, responsive Svelte image component"
githubRepo: "ascorbic/unpic-img"
includeApi: true
---

A high-performance, responsive image component for
[Svelte](https://svelte.dev/). Generates a responsive `<img>` tag that follows
best practices, with the correct srcset, sizes and styles. Detects image URLs
from most image CDNs and CMSs and can resize images with no build step.

## Installation and usage

```bash
npm install @unpic/svelte
```

```svelte
<script lang="ts">
  import { Image } from "@unpic/svelte";
</script>

<Image
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="A lovely bath"
/>
```
