---
title: "@unpic/astro"
description: "High-performance, responsive Astro image component"
githubRepo: "ascorbic/unpic-img"
---

A high-performance, responsive image component for
[Astro](https://astro.build/). Automatically suppports most image CDNs and CMSs
with no build step needed.

## Installation and usage

```bash
npm install @unpic/astro
```

### `Image` component

In almost all cases you can just use the `Image` component, which will generate
an optimized, responsive image for you with automatic format detection.

```astro
---
import { Image } from "@unpic/astro";
---

<Image
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
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
    src="https://cdn.shopify.com/static/sample-images/bath"
    media="(min-width: 641px)"
    layout="fullWidth"
  />
  <!-- Small screens get a constrained portrait image -->
  <Source
    src="https://cdn.shopify.com/static/sample-images/bath"
    media="(max-width: 640px)"
    width={600}
    height={800}
  />
  <!-- Always include an Image as the final element -->
  <Image
    src="https://cdn.shopify.com/static/sample-images/bath"
    width={600}
    height={800}
    alt="A lovely bath"
    unstyled
  />
</picture>

<style>
  /* Style for all layouts */
  .hero img {
    object-fit: cover;
    width: 100%;
  }

  @media (min-width: 641px) {
    /* Style for full-width layout */
    .hero img {
      height: 400px;
    }
  }
  @media (max-width: 640px) {
    /* Style for constrained layout */
    .hero img {
      max-width: 600px;
      aspect-ratio: 3 / 4;
    }
  }
</style>
```
