---
title: "@unpic/vue"
description: "High-performance, responsive Vue image component"
---

A high-performance, responsive image component for [Vue](https://vuejs.org/).

## Installation and usage

```bash
npm install @unpic/vue
```

```vue
<script setup lang="ts">
import { Image } from "@unpic/vue";
</script>

<template>
  <Image
    src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
    layout="constrained"
    width="800"
    height="600"
    alt="A lovely bath"
  />
</template>
```
