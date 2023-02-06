# unpic img

A cross-framework component for responsive, high-performance images.

## Features

- Just an `<img>` tag! No extra elements, no runtime JavaScript. Easy to style.
- Automatically generates correct srcset and sizes attributes for responsive images
- Handles responsive resizing of images, preserving aspect ratio
- Uses native lazy loading and aync decoding for offscreen images
- Handles different image layouts: fixed, constrained and full width
- Uses eager loading and high priority fetching for important images
- Delivers modern image formats, including WebP and AVIF if supported by your browser
- No built step or server-side rendering required: uses your existing image CDN or CMS, with no additional configuration
- Uses [unpic](https://github.com/ascorbic/unpic) to support most image CDNs, including Cloudinary, Imgix, and Shopify

This library is a work in progress. It currently supports just React, but it is built with Mitosis, so support for other frameworks is planned.

```tsx
<Image
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="Shopify"
/>
```

...generates this:

```html
<img
  alt="Shopify"
  loading="lazy"
  decoding="async"
  sizes="(min-width: 800px) 800px, 100vw"
  srcset="
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1600&amp;height=2133 1600w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1280&amp;height=1707 1280w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=1080&amp;height=1440 1080w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=960&amp;height=1280   960w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=800&amp;height=1067   800w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=828&amp;height=1104   828w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=750&amp;height=1000   750w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=640&amp;height=853    640w
  "
  src="https://cdn.shopify.com/static/sample-images/bath.jpeg?width=800&amp;height=600&amp;crop=center"
  style="
        object-fit: cover;
        max-width: 800px;
        max-height: 600px;
        aspect-ratio: 1.33333 / 1;
        width: 100%;
      "
/>
```

## Installation and usage

For details of usage, see the individual framework packages:

- [`@unpic/react`]()

## Supported CDNs

You can use any image CDN supported by [unpic](https://github.com/ascorbic/unpic), including:

- Imgix, including Unsplash, DatoCMS, Sanity and Prismic
- Contentful
- Cloudinary
- Shopify
- WordPress.com and Jetpack Site Accelerator
- Bunny.net
- Storyblok
