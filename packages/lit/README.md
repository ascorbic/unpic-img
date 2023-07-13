# `@unpic/lit` 🖼 📐

Lit web component for responsive, high-performance images.

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
- No build step or server-side rendering required: uses your existing image CDN
  or CMS, with no additional configuration
- Uses [unpic](https://unpic.pics/lib) to support most image CDNs, including
  Cloudinary, Imgix, and Shopify
- Can generate a low-res background image for a blurred placeholder effect

## Installation and usage

If using with a bundler, install the package:

```bash
npm install @unpic/lit
```

...then import the component:

```js
import "@unpic/lit";
```

You can then use the component in your HTML:

```html
<unpic-img
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width="{800}"
  height="{600}"
  alt="A lovely bath"
></unpic-img>
```

## Styling

If you need to style the `img` element, you can use the
[`::part` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part):

```css
unpic-img::part(image) {
  border-radius: 4px;
}
```

For the supported props, see [the docs](https://unpic.pics/img/lit).
