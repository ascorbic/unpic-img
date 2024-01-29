<div align="center">

![tree](https://unpic.pics/.netlify/images?url=tree.png&h=48)

# @unpic/astro

</div>

A high-performance, responsive image service and component library for
[Astro](https://astro.build/). Generates a responsive `<img>` tag that follows
best practices, with the correct srcset, sizes and styles. Detects image URLs
from most image CDNs and CMSs and can resize images with no build step.

`@unpic/astro` has two parts, which can be used independently but work best
together:

- A **component library** which provides a `<Image>` component and a `<Source>`
  component for art direction.
- An **Astro image service**, which allows you to use the regular Astro Image
  component unchanged, and have it automatically generate the correct srcset and
  attributes for all images.

## Features

- Just an `<img>` tag! No extra elements, no runtime JavaScript. Easy to style.
- Automatically generates correct srcset and sizes attributes for responsive
  images
- Handles responsive resizing of images, preserving aspect ratio
- Uses native lazy loading and aync decoding for offscreen images
- Handles different image layouts: fixed, constrained and full width
- Uses eager loading and high priority fetching for important images
- Delivers modern image formats, including WebP and AVIF if supported by your
  browser
- No built step or server-side rendering required: uses your existing image CDN
  or CMS, with no additional configuration
- Supports most image CDNs and headless CMSs, including Cloudinary, Contentful,
  Imgix, and Shopify
- Generates image placeholders to display while images are loading.

## Installation and usage

```bash
npm install @unpic/astro
```

```astro
---
import { Image } from "@unpic/astro";
---

<Image
  src="https://cdn.shopify.com/static/sample-images/bath_gcrop_center.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="A lovely bath"
/>
```

For the supported props, see [the docs](https://unpic.pics/img/astro).
