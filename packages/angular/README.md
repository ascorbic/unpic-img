# `@unpic/angular` 🖼 📐

Angular directive for responsive, high-performance images.

## Features

- Just an `<img>` tag! No extra elements. Easy to style.
- Automatically generates correct srcset and sizes attributes for responsive images
- Handles responsive resizing of images, preserving aspect ratio
- Uses native lazy loading and aync decoding for offscreen images
- Handles different image layouts: fixed, constrained and full width
- Uses eager loading and high priority fetching for important images
- Delivers modern image formats, including WebP and AVIF if supported by your browser
- No built step or server-side rendering required: uses your existing image CDN or CMS, with no additional configuration
- Uses [unpic](https://github.com/ascorbic/unpic) to support most image CDNs, including Cloudinary, Imgix, and Shopify
- Can generate a low-res background image for a blurred placeholder effect

## Installation and usage

```bash
npm install @unpic/angular
```

Add to app module:

```typescript
// ..
import { UnpicModule } from "@unpic/angular";

@NgModule({
  // ...
  imports: [BrowserModule, UnpicModule],
})
```

You can then use it by adding the `unpic` attribute to an `<img>` tag:

```html
<img unpic src="https://cdn.shopify.com/static/sample-images/bath_crop_center.jpeg" layout="constrained" width="800" height="600" alt="A lovely bath" />
```

For the supported props, see [the docs](https://unpic.pics/img/angular).
