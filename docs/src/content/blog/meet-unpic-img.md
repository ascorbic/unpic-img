---
title: Meet Unpic img
description:
  "Meet Unpic: a new image component that makes it easy to do images right"
publishDate: 2023-02-11
image: https://images.unsplash.com/photo-1615393904572-b3469d50cac3?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
image_alt: Buttermere
---

Doing web images right can be hard. The `<img>` tag is just the starting point.
In 2023, if you want the best performance you should be:

- using `srcset` to deliver multiple resolutions for different device and screen
  sizes
- using `sizes` so that the browser knows which image resolution to download
- delivering modern image formats such as AVIF and WebP if the browser supports
  them
- ensuring that the image resizes responsively, maintaining aspect ratio
- avoids layout shift when the images has loaded
- use native lazy-loading and async decoding for offscreen images
- use high priority fetching for critical images
- supports placeholders for lazy-loaded images

This isn't realistically something that can be done manually, but luckily many
web frameworks provide tools to handle this. Depending on the framework, these
may handle image resizing at build time or runtime, and may provide a component
that makes it easy to embed the images. These all have drawbacks though -
resizing at build time is slow, and the components often generate complex markup
that is hard to style.

## Let the CDN do the work

A lot of the trouble with embedding images is generating all the different
sizes. A great way to solve this is with an image CDN, which resizes the image
on the fly. You may have heard of the big names Cloudinary and Imgix, but what
you might not know is that lots of other images that you're using are already on
image CDNs. For example, CMSs such as Contentful, Sanity, Prismic and
WordPress.com all deliver their images from a CDN that can resize on the fly.
Shopify does too, as well as Unsplash. If your framework is downloading and
resizing these then it is a huge waste. Next.js is a particularly egregious one
here. I was curious about this and ran some queries on the data at Netlify
– more than half of all `next/image` requests served by Netlify were for images
from CDNs that could handle their own resizing.

Inspired by this, I built [unpic](https://github.com/ascorbic/unpic), a library
for detecting, parsing and generating image CDN URLs. The next step from that
was to use this to create an image component that take any image CDN URL and
generates all of the correct source images.

## Unpic img: a simpler image component for every framework

I have created [Unpic img](https://github.com/ascorbic/unpic-img/), a minimal
image component that makes it easy to do images well. It has some features that
make it stand out:

- It's just an `<img>` tag! No wrappers, no spacers. It doesn't even need a
  `<picture>` tag.
- Just HTML and CSS. If it's pre-rendered there is no runtime JS at all.
- Best practices by default. Large image, above the fold? Pass `priority` and it
  will ensure it's loaded with high priority fetch to keep your LCP low.
  Otherwise it will lazy-load it and use async decoding.
- Choice of layouts. By default it uses `constrained` layout, which has a
  maximum image size but will scale down for smaller screens, maintaining aspect
  ratio. The `fullWidth` layout is designed for hero images, and has a default
  set of breakpoints based on all popular screen widths. The `fixed` layout is
  what it sounds like, but ensures it still generates the right sources for
  Retina displays.
- Multi-framework. Currently it supports React, Vue, SolidJS and Svelte. Because
  there is no runtime script, it's simple to support multiple frameworks and PRs
  are welcome to add more. All the logic is in a shared `@unpic/core` library.
- Simple API. It's an `img` tag, but better. Accepts any `<img>` attribute.

Here's what it looks like in React:

```tsx
import { Image } from "@unpic/react";

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

This generates the following HTML:

```html
<img
  alt="A lovely bath"
  loading="lazy"
  decoding="async"
  sizes="(min-width: 800px) 800px, 100vw"
  style="object-fit: cover; max-width: 800px; max-height: 600px; aspect-ratio: 1.33333 / 1; width: 100%;"
  srcset="
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1080&amp;height=1440 1080w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1280&amp;height=1707 1280w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1600&amp;height=2133 1600w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=640&amp;height=853    640w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=750&amp;height=1000   750w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=800&amp;height=1067   800w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=828&amp;height=1104   828w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=960&amp;height=1280   960w
  "
  src="https://cdn.shopify.com/static/sample-images/bath.jpeg?width=800&amp;height=600&amp;crop=center"
/>
```

I know which one I'd rather write!

The equivalent code for Vue:

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

Svelte:

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

...and SolidJS:

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
