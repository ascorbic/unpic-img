# `@unpic/webc` 🖼 📐

WebC component for responsive, high-performance images. Perfect for Eleventy.

## Features

- Just an `<img>` tag! No extra elements, no runtime JavaScript. Easy to style.
- Automatically generates correct srcset and sizes attributes for responsive images
- Handles responsive resizing of images, preserving aspect ratio
- Uses native lazy loading and aync decoding for offscreen images
- Handles different image layouts: fixed, constrained and full width
- Uses eager loading and high priority fetching for important images
- Delivers modern image formats, including WebP and AVIF if supported by your browser
- No build step or server-side rendering required: uses your existing image CDN or CMS, with no additional configuration
- Uses [unpic](https://github.com/ascorbic/unpic) to support most image CDNs, including Cloudinary, Imgix, and Shopify
- Can generate a low-res background image for a blurred placeholder effect

## Installation and usage

```bash
npm install @unpic/webc
```

The requires `@11ty/webc` version 0.9.0 or later, because it uses the new `webc.attributes` feature.

If you are using this with Eleventy, there are a number of ways of defining WebC components. In the example we're using `webc:import`, but [check out the docs](https://www.11ty.dev/docs/languages/webc/#defining-components) for other options that handle imports automatically. You can then use the component in your templates:

```html
<unpic-img
  webc:import="npm:@unpic/webc"
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width="{800}"
  height="{600}"
  alt="A lovely bath"
></unpic-img>
```

For the supported props, see [the main README](https://github.com/ascorbic/unpic-img/#props).
