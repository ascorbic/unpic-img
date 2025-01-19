---
title: "@unpic/astro"
description: "High-performance, responsive Astro image component"
githubRepo: "ascorbic/unpic-img"
includeApi: true
---

A high-performance, responsive image service and component library for
[Astro](https://astro.build/). Generates a responsive `<img>` tag that follows
best practices, with the correct srcset, sizes and styles. Detects image URLs
from most image CDNs and CMSs and can resize images with no build step. Detects
if you are hosting on a platform with a built-in image CDN and will use that for
local images, and falls-back to the default Astro image service.

## Installation and usage

```bash
npm install @unpic/astro
```

`@unpic/astro` has two parts, which can be used independently but work best
together:

- A **component library** which provides a `<Image>` component and a `<Source>`
  component for art direction.
- An **Astro image service**, which allows you to use the regular Astro Image
  component unchanged, and have it automatically generate the correct srcset and
  attributes for all images. This will also enable automatic transforms for
  images in Markdown.

If you want to use Unpic with a UI framework on Astro, you should also install
the Unpic package for that framework. There are packages for [Lit](/img/lit),
[Preact](/img/preact), [React](/img/react), [SolidJS](/img/solid),
[Svelte](/img/svelte) and [Vue](/img/vue).

### Astro image service

Unpic includes an Astro image service that can be used with the regular Astro
`<Image>` component. If you enable the image service, then any `<Image>` will be
automatically optimized and responsive, as well as anything else that uses
`getImage`. It will automatically detect the CDN or CMS you are using and
generate the correct `srcset` and attributes for you, and for local images will
use the built-in image CDN on Netlify and Vercel. All other images will be
optimized using Astro's default sharp image service.

To enable the image service, add the following to your `astro.config.mjs` file:

```js
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  image: {
    service: imageService(),
  },
});
```

You can also pass options to the image service. The following options are
available:

- `fallbackService`: The image service to use for local images and when the CDN
  can't be determined from the image src. Value can be any supported image CDN,
  or "sharp" to use the local image service. By default it will either use the
  local "sharp" service, or will try to detect available services based on the
  environment. This detection currently works on Netlify and Vercel.
- `placeholder`: The default placeholder to display when images are loading. If
  this is set, the image will have a background set while the image is loading.
  For more details see the [placeholder](#placeholders) section.
- `layout`: The default layout to use for images. This can be `"constrained"`,
  `"fullWidth"` or `"fixed"`. For more details see
  [this page](/img/learn/#layouts).

These defaults will be used for `@unpic/astro` components and Astro Image
components, but not for components from other UI frameworks.

This is how you would set the options:

```js
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  image: {
    service: imageService({
      // This can usually be auto-detected
      fallbackService: "netlify",
      placeholder: "blurhash",
      // This is the default
      layout: "constrained",
    }),
  },
});
```

You can then use the regular Astro `<Image>` component, and it will behave like
an `@unpic/astro` component.

```astro
---
import { Image } from "astro:assets";
// It works with local images too
import lighthouse from "../lighthouse.jpg";
---

<Image src={lighthouse} width={800} height={600} alt="A lighthouse" />

<Image
  src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
  width={800}
  height={600}
  alt="A lovely bath"
/>
```

### `Image` component

In almost all cases you can just use the Unpic `Image` component, which will
generate an optimized, responsive image for you with automatic format detection.
It has more options than the Astro `Image` component, so if you have the choice
it is recommended to use this component.

```astro
---
import { Image } from "@unpic/astro";
---

<Image
  src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
  layout="constrained"
  width={800}
  height={600}
  alt="A lovely bath"
/>
```

### `Source` component

If you need to do art direction, or handle different formats in a CDN that
doesn't do auto-detection then you will need a `<picture>` element. You can use
the `Source` component to generate the correct `<source>` elements for you. The
usage depends on what you are trying to do.

#### Art direction

Art direction is where you want to use different images at different screen
sizes. For example, you might want to use a portrait image on mobile and a
landscape image on desktop. You can do this with a `<picture>` tag and the
`Source` component.

First use a normal `<picture>` tag, and then add a `Source` component for each
image you want to use. The `Source` component will generate a `<source>` tag
with the correct `srcset` and `sizes` attributes for you.

Each `Source` component takes a `media` prop, which is a media query that will
be used to determine if the image should be used. The first `Source` component
with a matching media query will be used, and the rest will be ignored. It also
takes `src`, `width`, `height` and `layout` props, which are the same as the
`Image` component. This means you can either use the same image with a different
crop or layout, or a completely different image.

You need to include an `<Image>` as the final element in the `<picture>` tag.
This is used as a fallback for browsers that don't support `<picture>`, or if
none of the media queries match. In a `<picture>` tag, any styling must be
applied to the `<img>` tag, and are applied whichever `<source>` is used.
`<source>` tags themselves cannot be styled. When using art direction you must
set the `unstyled` prop on the `<Image>` element, because otherwise the image
will have the same styling at all screen widths. Instead you need to use CSS
media queries to style the `<img>` tag.

```astro
---
import { Source } from "@unpic/astro";
---

<picture class="hero">
  <!-- Large screens get a full-width hero image -->
  <Source
    src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
    media="(min-width: 601px)"
    layout="fullWidth"
  />
  <!-- Small screens get a constrained square image -->
  <Source
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    media="(max-width: 600px)"
    width={600}
    height={600}
  />
  <!-- Always include an Image as the final element -->
  <Image
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    width={600}
    height={600}
    alt="Aurora"
    unstyled
  />
</picture>

<style>
  /* Style for all layouts */
  .hero img {
    object-fit: cover;
    width: 100%;
  }

  @media (min-width: 601px) {
    /* Style for full-width layout */
    .hero img {
      height: 600px;
    }
  }
  @media (max-width: 600px) {
    /* Style for constrained layout */
    .hero img {
      max-width: 600px;
      /* Set the image aspect-ratio */
      aspect-ratio: 1/1;
    }
  }
</style>
```

### Placeholders

Unpic can generate a placeholder that is used as a background while the image is
loading. This looks better than a white boxe, and can improve the site's LCP
score. You can either set a static color or CSS value, or for remote images you
use one of the placeholder generation options. These are generated at build time
by downloading and analysing a small version of the image. There are several
supported values:

- `dominantColor`: The image will analysed and to find the dominant color, and a
  placeholder will be generated with that color. This is the smallest output.
- `blurhash`: The image will be analysed and a placeholder will be generated
  using the [blurhash](https://blurha.sh/) algorithm. This will not use
  client-side JavaScript, but will instead generate a tiny image that will be
  used as a data URI. This is the next-smallest output.
- `lqip`: A low quality image preview with be used as a placeholder. A tiny
  version of the image will be loaded and inserted as a data URI. This is the
  largest output.

To compare the options, see
[the demo](https://unpic-astro.netlify.app/placeholders/).

To use a placeholder, set the `placeholder` prop on the `<Image>` or `<Source>`,
or set the `placeholder` option on the image service.

> Please note that placeholders are currently only supported for Astro
> components and not for components from other UI frameworks. They also cannot
> be used for local images - in this case they will be ignored and no background
> will be shown.
