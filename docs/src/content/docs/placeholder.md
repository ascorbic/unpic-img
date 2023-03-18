---
title: "@unpic/placeholder"
description: "Generate beautiful image placeholders"
githubRepo: "ascorbic/unpic-placeholder"
---

This is a library for generating low quality image placeholders (LQIP) by
extracting the dominant color from image, or by server-side rendering a
[BlurHash](https://blurha.sh) value. These are displayed while an image is
loading, give better appearance and can help reduce the LCP time. It can render
the Blurhash to either a set of CSS gradients, or a tiny bitmap image data URI.
These are usually around 150 bytes in size, and can be applied as a background
image to the img element. It pairs well with [unpic-img](/img), a
multi-framework image component.

It works on any modern JavaScript runtime, including Deno, Node and WinterCG
edge runtimes.

[See the demo](https://unpic-placeholder.netlify.app/)

## Installation

```bash
npm install @unpic/placeholder
```

## Dominant Color

The library uses the
[k-means clustering algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
to extract a dominant color from the image, and can also generate a palette of
colors. This function uses the raw pixel data, so it should be used on the
server, with access to the image file. You can use the
[`@unpic/pixels`](/pixels) library to get those pixels from a source image. The
color can then be stored alongside the image path in the database. The library
works in the browser, but using this as a placeholder would defeat the purpose.

### Usage

Node:

```typescript
import { getDominantColor } from "@unpic/placeholder";
import { getPixels } from "@unpic/pixels";
import { promises as fs } from "node:fs";

export async function getDominantColorFromImageFile(filePath: string) {
  // Read the image data from a file
  const pngData = await fs.readFile(filePath);

  // Decode the image data into raw pixel data
  const { data } = getPixels(pngData);

  // Get the dominant color
  return getDominantColor(data);
}
```

Deno:

```typescript
import { getDominantColor } from "https://esm.sh/@unpic/placeholder";
import { getPixels } from "https://deno.land/x/get_pixels/mod.ts";

// Load the image from the filesystem
const pngData = await Deno.readFile("image.png");

// Decode the image data into raw pixel data
const { data } = getPixels(pngData);

// Get the dominant color
const color = getDominantColor(data);
```

## BlurHash

A BlurHash is a small string that can be generated from an image and then
rendered as a placeholder. It should be pre-generated and stored alongside the
image URL in the database.

Unlike other BlurHash libraries, this generates CSS values so it works without
client-side JavaScript in any web framework or none, and can be displayed before
page hydration. It was designed for [unpic-img](/img), which is a
multi-framework responsive image component that generates a single
<code>&lt;img&gt;</code> tag, but it can be used with `<img>` tags or with any
framework's image component. It uses no wrapper elements, and is just applied as
a style to the `<img>` tag.

### Usage

With `<img>` tag:

```jsx
import { blurhashToImageCssString } from "@unpic/placeholder";

const css = blurhashToImageCssString(blurhash);
const img = `<img src=${src} alt=${alt} style=${css} />`;
```

With `unpic-img`:

```jsx
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react";

export function MyImage({ src, alt, blurhash }) {
  const placeholder = blurhashToCssGradientString(blurhash);
  return <Image src={src} alt={alt} background={placeholder} />;
}
```

### Generating the BlurHash

You should pre-generate the BlurHash ahead of time. Some CDNs can do this for
you. See [Imgix](https://blog.imgix.com/2021/01/26/blurhash) for example. This
library does not generate the BlurHash. You can use the
[blurhash](https://github.com/woltapp/blurhash/tree/master/TypeScript) library
to do this. There are a few ways to do this. In Node:

```typescript
import { encode } from "blurhash";
import { getPixels } from "@unpic/pixels";

const jpgData = await getPixels(
  "https://res.cloudinary.com/demo/image/upload/c_lfill,w_200,h_100/dog.jpg"
);
const data = Uint8ClampedArray.from(jpgData.data);
const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);
```

In Deno:

```typescript
import { encode } from "https://esm.sh/blurhash";
import { getPixels } from "https://deno.land/x/get_pixels/mod.ts";

const jpgData = await getPixels(
  "https://res.cloudinary.com/demo/image/upload/c_lfill,w_200,h_100/dog.jpg"
);
const data = Uint8ClampedArray.from(jpgData.data);
const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);
```

## API

<!-- TSDOC_START -->

- [getPalette](#gear-getpalette)
- [getDominantColor](#gear-getdominantcolor)
- [kMeansClusters](#gear-kmeansclusters)
- [rgbColorToCssString](#gear-rgbcolortocssstring)
- [blurhashToDataUri](#gear-blurhashtodatauri)
- [blurhashToCssGradients](#gear-blurhashtocssgradients)
- [blurhashToCssGradientString](#gear-blurhashtocssgradientstring)
- [blurhashToGradientCssObject](#gear-blurhashtogradientcssobject)
- [blurhashToImageCssObject](#gear-blurhashtoimagecssobject)
- [blurhashToImageCssString](#gear-blurhashtoimagecssstring)

### getPalette

Gets a palette of colors from an image using k-means clustering, sorted in
descending order by dominance.

| Function     | Type                                                             |
| ------------ | ---------------------------------------------------------------- |
| `getPalette` | `(pixels: Uint8ClampedArray, clusterCount?: number) => Colour[]` |

Parameters:

- `pixels`: The RGBA pixel data of the image.
- `clusterCount`: The number of colors to return. Defaults to 8.

### getDominantColor

Gets the dominant color in an image. Returns an RGB tuple, e.g. [255, 0, 0] for
red.

| Function           | Type                                    |
| ------------------ | --------------------------------------- |
| `getDominantColor` | `(pixels: Uint8ClampedArray) => Colour` |

Parameters:

- `pixels`: The RGBA pixel data of the image.

### kMeansClusters

Performs k-means clustering on an array of pixel data to create a palette of the
most common colors.

| Function         | Type                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `kMeansClusters` | `(pixels: Uint8ClampedArray, clusterCount: number, sampleSize: number, maxIterations: number) => Cluster[]` |

Parameters:

- `data`: - The RGBA pixel data to cluster.
- `clusterCount`: - The number of clusters (i.e., colors) to generate.
- `sampleSize`: - The number of pixels to randomly sample from the data. Higher
  numbers take a long time.
- `maxIterations`: - The maximum number of iterations to perform.

### rgbColorToCssString

Given a color as an RGB tuple, returns a CSS string e.g. `rgb(255, 0, 0)`

| Function              | Type                                     |
| --------------------- | ---------------------------------------- |
| `rgbColorToCssString` | `([red, green, blue]: Colour) => string` |

### blurhashToDataUri

Given a blurhash, returns a data URI of a BMP image. At tiny sizes, this is
smaller than a PNG.

| Function            | Type                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `blurhashToDataUri` | `(blurhash: string, width?: number, height?: number) => `data:image/bmp;base64,${string}`` |

Parameters:

- `blurhash`: the blurhash string
- `width`: the width of the generated background image. Keep it tiny. Default is
  8 pixels
- `height`: the height of the generated background image. Keep it tiny. Default
  is 8 pixels

### blurhashToCssGradients

Given a blurhash, returns an array of CSS linear-gradient() strings. This is a
rough approximation of the blurhash image but as pure CSS.

| Function                 | Type                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| `blurhashToCssGradients` | `(blurhash: string, columns?: number, rows?: number) => string[]` |

Parameters:

- `blurhash`: the blurhash string
- `columns`: the number of gradients to generate horizontally. Default is 4
- `rows`: the number of gradients to generate vertically. Default is 3

### blurhashToCssGradientString

Given a blurhash, returns an array of CSS linear-gradient() strings. This is a
rough approximation of the blurhash image but as pure CSS.

| Function                      | Type                                                            |
| ----------------------------- | --------------------------------------------------------------- |
| `blurhashToCssGradientString` | `(blurhash: string, columns?: number, rows?: number) => string` |

Parameters:

- `blurhash`: the blurhash string
- `columns`: the number of gradients to generate horizontally. Default is 4
- `rows`: the number of gradients to generate vertically. Default is 3

### blurhashToGradientCssObject

Given a blurhash, returns an object with a CSS background-image property.

| Function                      | Type                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| `blurhashToGradientCssObject` | `(blurhash: string, columns?: number, rows?: number) => CSSObject` |

Parameters:

- `blurhash`: the blurhash string
- `columns`: the number of gradients to generate horizontally. Default is 4
- `rows`: the number of gradients to generate vertically. Default is 3

### blurhashToImageCssObject

Given a blurhash, returns an object with CSS background properties to apply to
an img.

| Function                   | Type                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| `blurhashToImageCssObject` | `(blurhash: string, width?: number, height?: number) => CSSObject` |

Parameters:

- `blurhash`: the blurhash string
- `width`: the width of the generated background image. Default is 8 pixels
- `height`: the height of the generated background image. Default is 8 pixels

### blurhashToImageCssString

Given a blurhash, returns a CSS string for a background to apply to an img
element.

| Function                   | Type                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `blurhashToImageCssString` | `(blurhash: string, width?: number, height?: number) => string` |

Parameters:

- `blurhash`: the blurhash string
- `width`: the width of the generated background image. Default is 8 pixels
- `height`: the height of the generated background image. Default is 8 pixels

<!-- TSDOC_END -->
