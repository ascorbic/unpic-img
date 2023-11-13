<h1 align="center">🌳 unpic-img</h1>

<p align="center">A cross-framework component for responsive, high-performance images using image CDNs</p>

<h3 align="center">

[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/react.svg" height="16" alt="react" /> React](https://unpic.pics/img/react)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/vue.svg" height="16" alt="vue" /> Vue](https://unpic.pics/img/vue)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/solidjs-icon.svg" height="16" alt="solidjs" /> SolidJS](https://unpic.pics/img/solid)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/svelte-icon.svg" height="16" alt="svelte" /> Svelte](https://unpic.pics/img/svelte)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/astro-icon.svg" height="16" alt="astro" /> Astro](https://unpic.pics/img/astro)

[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/preact.svg" height="16" alt="preact" /> Preact](https://unpic.pics/img/preact)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/qwik-icon.svg" height="16" alt="qwik" /> Qwik](https://unpic.pics/img/qwik)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/eleventy.svg" height="16" alt="webc" /> WebC](https://unpic.pics/img/webc)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/angular-icon.svg" height="16" alt="angular" /> Angular](https://unpic.pics/img/angular)
•
[<img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/lit-icon.svg" height="16" alt="lit" /> Lit](https://unpic.pics/img/lit)

</h3>

## Features

- Just an `<img>` tag! No extra elements, no runtime JavaScript. Easy to style.
  No legacy hacks or workarounds.
- Automatically generates correct srcset and sizes attributes for responsive
  images.
- Handles responsive resizing of images, preserving aspect ratio and avoiding
  layout shift.
- Uses native lazy loading and async decoding for offscreen images.
- Handles different image layouts: fixed, constrained and full width.
- Uses eager loading and high priority fetching for important images.
- Delivers modern image formats, including WebP and AVIF if supported by the
  browser.
- No build step or server-side rendering required for the images: uses your
  existing image CDN or CMS, with no additional configuration.
- Uses [unpic lib](https://unpic.pics/lib) to support most image CDNs, including
  Cloudinary, Imgix, and Shopify.
- Can generate a low-res background image for a blurred placeholder effect, or
  use with [`@unpic/placeholder`](https://unpic.pics/placeholder) for more
  options.

## Usage

For details of usage, see [the documentation](https://unpic.pics/img).

## FAQ

### Why do I need this?

While it's easy to use an `<img>` tag for images, if you want to follow best
practices and deliver the most performant image to your users then it can take a
lot of work. Some frontend frameworks will automate this for you, but they often
rely on slow pre-rendering of images, or on running image optimizers on your own
site. They also generate complex HTML with wrappers and spacer elements that
make images hard to style.

Most images on modern websites are hosted on a CDN or CMS that can resize images
on the fly and deliver them at the edge. Despite this, most web frameworks will
still download and resize the image at build time or on your server, rather than
using the CDN, or just uses a single source image rather than handling multiple
resolutions.

This library works with any frontend framework or none, and uses your existing
image CDN or CMS, with no additional configuration.

For more details, see
[this post](https://dev.to/ascorbic/a-minimal-multi-framework-responsive-image-component-3iop).

## How does this work?

This library uses unpic to detect the image CDN, and then uses the CDN's URL API
to resize and format images. It then generates the correct `srcset` and `sizes`
attributes for the image. It uses new features built into modern browsers to
handle lazy loading, fetch priority and decoding. It also uses pure CSS to
handle responsive resizing of images, preserving aspect ratio and avoiding
layout shift. Unlike most other image components, it does not use any
client-side JavaScript by default, and generates just a single `<img>` tag
without any wrapper divs or padding elements.

## What HTML does this generate?

<details>
<summary>Generated HTML for a constrained image</summary>
It turns this:

```tsx
<Image
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="Shopify"
/>
```

...into this:

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
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=828&amp;height=1104   828w,
    https://cdn.shopify.com/static/sample-images/bath.jpeg?crop=center&amp;width=800&amp;height=1067   800w,
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

</details>

## Supported CDNs

You can use any image CDN supported by [unpic lib](https://unpic.pics/lib),
including:

- Adobe Dynamic Media (Scene7)
- Builder.io
- Bunny.net
- Cloudflare
- Contentful
- Cloudinary
- Directus
- Imgix, including Unsplash, DatoCMS, Sanity and Prismic
- Kontent.ai
- Shopify
- Storyblok
- Vercel / Next.js
- WordPress.com and Jetpack Site Accelerator

## License

Published under the MIT licence. ©
[Matt Kane](https://github.com/ascorbic) 2023.
