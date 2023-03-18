---
title: "@unpic/svelte"
description: "High-performance, responsive Svelte image component"
---

A high-performance, responsive image component for
[Svelte](https://svelte.dev/).

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
