# unpic img 🖼 📐

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
- Can generate a low-res background image for a blurred placeholder effect

This library is a work in progress. It currently supports just React, but it is built with [Mitosis](https://github.com/BuilderIO/mitosis), so support for other frameworks is planned.

## Example

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

## Usage

For details of usage, see the individual framework packages:

- [`@unpic/react`](https://github.com/ascorbic/unpic-img/tree/main/output/react)

## Props

The component accepts all the props of an `<img>` tag, plus the following:

### `layout`

The layout of the image. See below for a video showing the different options. Can be one of:

- `fixed`: the image will be rendered at the exact size specified by `width` and `height`
- `constrained`: the image will be rendered at a maximum of `width` and `height`, but will scale down automatically if the container is smaller.
- `fullWidth`: the image will be rendered at full width of its container. This is optimized for full-width hero images.

### `priority`

By default, images are loaded lazily. If `priority` is set to `true`, the image will be loaded eagerly, and will be given high priority by the browser. This is useful for images that are important to the user experience, such as hero images.

### `background`

Either an image URL, CSS gradient or CSS colour value. If set to `auto`, a low-resolution version of the image will be rendered as a background image, with a blurred placeholder effect. This is still loaded from the remote server, so if you can instead provide an inline base64-encoded version of the image or background coloir, you should do that instead.

### `aspectRatio`

Instead of specifying both `width` and `height`, you can specify can `aspectRatio`.

### `cdn`

By default the CDN is auto-detected from the `src` URL. If you want to override this, you can specify a CDN object. See the [unpic](https://github.com/ascorbic/unpic) for more details.

### `breakpoints`

By default the image breakpoints used in the `srcset` are generated based on the layout and image size. You can override this by specifying an array of breakpoints. The breakpoints are specified as an array of numbers, representing the width of the image in pixels.

## Layouts

This recording shows the different layout types. From the top, `fullWidth`, `constrained` and `fixed`:

<video src="https://user-images.githubusercontent.com/213306/217091502-6eb0cd85-5e44-48f5-98df-a6aded506f83.mov" loop autoplay controls silent></video>

## Supported CDNs

You can use any image CDN supported by [unpic](https://github.com/ascorbic/unpic), including:

- Imgix, including Unsplash, DatoCMS, Sanity and Prismic
- Contentful
- Cloudinary
- Shopify
- WordPress.com and Jetpack Site Accelerator
- Bunny.net
- Storyblok
