---
title: "Unpic lib"
description: "Universal image CDN URL translator"
githubRepo: "ascorbic/unpic"
---

**Universal image CDN URL translator**

There are many image CDNs that provide a URL API for transforming images. There
is little consistency in these APIs, and it's often unclear what the API is for
a given URL. This library aims to provide a consistent interface for detecting
image CDN URLs and transforming them.

These docs are for the `unpic` library, which powers the framework-specific
image libraries. See the [framework-specific docs](/about) for more information
on how to use the library with your framework.

It designed to work with image URLs from sources such as CMSs and other
user-generated content, where the source image may or may not be from an image
CDN, and may already have transforms applied. This allow different transforms to
be applied for display on a website. A web framework may need to transform an
image for display on a site. Rather than doing this by downloading and resizing
it locally or re-processing it with a separate image service, this library can
be used to transform the URL to use the original image CDN, which will then
transform the image on the fly.

## Usage

This library is available via NPM as `unpic` and JSR as
[`@unpic/lib`](https://jsr.io/@unpic/lib).

To use it in Node, install it from npm:

```sh
npm install unpic
```

Then import it in your code:

```ts
import { transformUrl } from "unpic";
```

To use it in Deno, install or import
[the module from JSR](https://jsr.io/@unpic/lib):

```ts
import { transformUrl } from "jsr:@unpic/lib";
```

If you previously installed the library from deno.land/x, you should update to
use JSR instead as the deno.land/x version is no longer updated.

You can then use the `transformUrl` function to transform a URL:

```ts
const url = transformUrl(
  "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
  {
    width: 800,
    height: 600,
  },
);

console.log(url);
// https://cdn.shopify.com/static/sample-images/bath.jpeg?width=800&height=600&crop=center
```

You can also use the `parseUrl` function to parse a URL and get information
about the image:

```ts
const parsed = parseUrl(
  "https://cdn.shopify.com/static/sample-images/bath_800x600_crop_center.jpeg",
);

console.log(parsed);
// {
//   provider: "shopify",
//   src: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
//   operations: {
//     width: 800,
//     height: 600,
//     crop: "center"
//   }
// }
```

You can bypass auto-detection by specifying the provider, or use
[provider imports](#provider-imports) to import a single provider.

```ts
const url = transformUrl(
  "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
  {
    width: 800,
    height: 600,
    provider: "shopify",
  },
);
```

This is particularly useful if you are using the CDN with a custom domain which
is not auto-detected.

You can also specify a fallback provider to use if the URL is not recognised as
coming from a known CDN:

```ts
const url = transformUrl("https://example.com/image.jpg", {
  width: 800,
  height: 600,
  fallback: "netlify",
});
```

This is useful if you are using a CDN provider that supports external images,
but you still want to use the original CDN if possible.

## Custom operations

Different CDNs support different operations. By default, the transform function
accepts the operations `width`, `height`, `quality` and `format`. You can pass
provider-specific operations as the third argument to the `transformUrl`
function:

```ts
const url = transformUrl(
  "https://cdn.shopify.com/static/sample-images/bath.jpeg",
  {
    width: 800,
    height: 600,
  },
  {
    shopify: {
      crop: "center",
    },
  },
);
```

You can pass options for multiple providers, which will be passed to the
provider depending on the detected CDN:

```ts
const url = transformUrl(
  src,
  {
    width: 800,
    height: 600,
  },
  {
    shopify: {
      crop: "left",
    },
    imgix: {
      position: "left",
    },
  },
);
```

These options are type-safe, as we include the types for each provider.

You can do the same for provider options, such as base URLs project keys.

```ts
const url = transformUrl(
  src,
  {
    width: 800,
    height: 600,
    fallback: "cloudinary",
  },
  {
    shopify: {
      crop: "left",
    },
  },
  {
    cloudinary: {
      cloudName: "demo",
    },
  },
);
```

## Provider imports

If you know which providers you will be using, you can import them directly.
This will reduce the bundle size of your application, as only the providers you
use will be included. In this case you can pass provider-specific operations in
the object.

```ts
import { transform } from "unpic/providers/shopify";

const url = transform(
  "https://cdn.shopify.com/static/sample-images/bath.jpeg",
  {
    width: 800,
    height: 600,
    crop: "center",
  },
);
```

## Supported Providers

- Adobe Dynamic Media (Scene7) (`scene7`)
- Astro image service (`astro`)
- Builder.io (`builder.io`)
- Bunny.net, including caisy (`bunny`)
- Cloudflare (`cloudflare`) and (`cloudflare_images`)
- Cloudimage (`cloudimage`)
- Cloudinary (`cloudinary`)
- Contentful (`contentful`)
- Contentstack (`contentstack`)
- Directus (`directus`)
- Hygraph (`hygraph`)
- ImageEngine (`imageengine`)
- ImageKit (`imagekit`)
- Imgix, including Unsplash, DatoCMS, Sanity and Prismic (`imgix`)
- IPX (`ipx`)
- KeyCDN (`keycdn`)
- Kontent.ai (`kontent.ai`)
- Netlify (`netlify`)
- Next.js image service (`nextjs`)
- Shopify (`shopify`)
- Storyblok (`storyblok`)
- Supabase (`supabase`)
- Uploadcare (`uploadcare`)
- Vercel (`vercel`)
- WordPress.com and Jetpack Site Accelerator (`wordpress`)

## FAQs

- **Can you add support for CDN X?** If it supports a URL API and doesn't
  require signed URLs then yes, please open an issue or PR.
- **Can you add my domain to CDN X?** If you provide a service where end-users
  use your URLs then probably. Examples may be image providers such as Unsplash,
  or CMSs. If it is just your own site then probably not. You can manually
  specify the CDN in the arguments to `transformUrl` and `parseUrl`.
- **Can you support more params?** Please open an issue or PR with the details.
  See [the contributing guide](/lib/contributing) for more information.
- **Why do you set auto format?** If the CDN support is, and no format is
  specified in `transformUrl`, the library will remove any format set in the
  source image, changing it to auto-format. In most cases, this is what you
  want. Almost all browsers now support modern formats such as WebP, and setting
  auto-format will allow the CDN to serve the best format for the browser. If
  you want to force a specific format, you can set it in `transformUrl`.
- **Do you support SVG, animated GIF etc?** If the CDN supports it, then yes. We
  don't attempt to check if a format is valid - we will just pass it through to
  the CDN. If the CDN doesn't support it, then it will return an error or a
  default.
- **Do you support video, etc** No, this library is only for images. If you pass
  a video URL to `transformUrl`, it will return `undefined`, as it will for any
  URL that is not recognised as an image CDN URL. It is up to you to handle this
  case.
