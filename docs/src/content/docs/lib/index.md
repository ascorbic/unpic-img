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

If you'd like to use this on the web, you might want to try [unpic-img](/img), a
multi-framework image component, powered by Unpic.

It designed to work with image URLs from sources such as CMSs and other
user-generated content, where the source image may or may not be from an image
CDN, and may already have transforms applied. This allow different transforms to
be applied for display on a website. A web framework may need to transform an
image for display on a site. Rather than doing this by downloading and resizing
it locally or re-processing it with a separate image service, this library can
be used to transform the URL to use the original image CDN, which will then
transform the image on the fly.

## Usage

This library is available via URL imports for Deno and via npm for Node. To use
it in Deno, import the module from deno.land:

```ts
import { transformUrl } from "https://deno.land/x/unpic/mod.ts";
```

To use it in Node, install it from npm:

```sh
npm install unpic
```

Then import it in your code:

```ts
import { transformUrl } from "unpic";
```

You can then use the `transformUrl` function to transform a URL:

```ts
const url = transformUrl({
  url: "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
  width: 800,
  height: 600,
});

console.log(url.toString());

// https://cdn.shopify.com/static/sample-images/bath.jpeg?width=800&height=600&crop=center
```

You can also use the `parseUrl` function to parse a URL and get the CDN and any
params:

```ts
const parsedUrl = parseUrl(
  "https://cdn.shopify.com/static/sample-images/bath_800x600_crop_center.jpeg"
);

console.log(parsedUrl);
// {
//   cdn: "shopify",
//   width: 800,
//   height: 600,
//   base: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
//   params: {
//     crop: "center",
//   },
// }
```

You can bypass auto-detection by specifying the CDN:

```ts
const url = transformUrl({
  url: "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
  width: 800,
  height: 600,
  cdn: "shopify",
});
```

This is particularly useful if you are using the CDN with a custom domain which
is not auto-detected.

## Supported CDN APIs

- Builder.io
- Bunny.net
- Cloudflare
- Contentful
- Cloudinary
- Imgix, including Unsplash, DatoCMS, Sanity and Prismic
- Kontent.ai
- Shopify
- Storyblok
- Vercel / Next.js
- WordPress.com and Jetpack Site Accelerator

## Usage with Vercel / Next.js

Unpic has special handling for Vercel and Next.js image URLs. It detects
supported image CDNs, and falls back to `/_vercel/image` or `/_next/image` for
local and unsupported remote images.

For more information, see the
[Unpic Vercel / Next.js](https://github.com/ascorbic/unpic/blob/main/vercel.md)
documentation.

## FAQs

- **What is an image CDN?** An image CDN is a service that provides a URL API
  for transforming images. This is often used to resize images on the fly, but
  can also be used to apply other transforms such as cropping, rotation,
  compression, etc. This includes dedicated image CDNs such as Imgix and
  Cloudinary, CMSs such as Contentful, Builder.io and Sanity, general CDNs such
  as Bunny.net that provide an image API, but also other service providers such
  as Shopify. The CMSs and other service providers often use a dedicated image
  CDN to provide the image API, most commonly Imgix. In most cases they support
  the same API, but in others they may proxy the image through their own CDN, or
  use a different API.
- **Why would I use this instead of the CDN's own SDK?** If you you know that
  your images will all come from one CDN, then you probably should use the CDN's
  own SDK. This library is designed to work with images from multiple CDNs, and
  to work with images that may or may not be from a CDN. It is particularly
  useful for images that may come from an arbitrary source, such as a CMS. It is
  also useful for parsing URLs that may already have transforms applied, because
  most CDN SDKs will not parse these URLs correctly.
- **Can you add support for CDN X?** If it supports a URL API and has a public
  domain by which it can be identified then yes, please open an issue or PR.
- **Can you add my domain to CDN X?** If you provide a service where end-users
  use your URLs then probably. Examples may be image providers such as Unsplash,
  or CMSs. If it is just your own site then probably not. You can manually
  specify the CDN in the arguments to `transformUrl` and `parseUrl`.
- **Can you support more params?** We deliberately just support the most common
  params that are shared between all CDNs. If you need more params then you can
  use the CDN-specific API directly.
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
