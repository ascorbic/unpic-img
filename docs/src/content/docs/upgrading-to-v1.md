---
title: "Upgrading to Unpic v1"
description: "How to upgrade to the stable release of Unpic"
---

Version 1 is the first stable release of Unpic. This is a major update from 0.x,
with changes to the API of all frameworks. This will not affect you if you are
just using the components with default options, but if you are passing custom
transformers or specifying the CDN then you will need to update your code.

## Breaking changes

- The `cdnOptions` property has been removed. Use the new
  [`options` property](#provider-options) instead.
- The `transformer` property has been removed from the default `Image`
  component. Import [the base component](#base-component) and specify the
  transformer there instead. The type signature for the transformer has also
  changed. See the [`unpic` library](/lib) documentation for more information.
- The `cdn` property has been removed. Either use the new
  [`fallback` property](#fallback-providers) or import
  [the base component](#base-component) and pass a single provider to it.

## Changes

Most of the changes are because of a new approach to handling individual image
CDNs and providers in the base Unpic library. This is designed to make Unpic
more flexible, efficient and modular. It also introduces support for type-safe
custom operations and options for each provider.

### Provider operations

_Supported frameworks: All except `webc` and `lit`._

The new `operations` property allows you to specify custom operations for each
provider. Many image CDNs support dozens of custom operations. Previously these
were hard to use with Unpic. The new `operations` property gives type-safe
support for all supported features of each provider. This works even if you have
images from multiple providers in the same component, as you can specify options
for each provider separately.

```tsx
<Image
  src="https://example.com/image.jpg"
  operations={{ imgix: { flip: "h" }, bunny: { flop: true } }}
/>
```

The operations are all type-safe, with JSDoc comments and TypeScript definitions
for all supported operations. This means you can get autocompletion and type
checking for all operations.

### Provider options

_Supported frameworks: All except `webc` and `lit`._

The new `options` property allows you to specify custom options for each
provider. This is similar to the current `cdnOptions` property, but with
type-safe support for all options of each provider. This allows you to specify
options such as account IDs and domains for each provider.

### Fallback providers

_Supported frameworks: All. The `astro` and `nextjs` frameworks default to the
framework's image provider as fallback._

The new `fallback` property allows you to specify a fallback provider for each
image. This allows you to use auto-detection for image CDNs as now, but also
specify a fallback provider for local images and images from unknown providers.
This is useful if you have a mix of images from different sources, and want to
ensure that all images are handled correctly. For example, you may have a
Contentful blog hosted on Netlify, with images that are mostly hosted on
Contentful (a supported CDN), but also some images from third-parties or your
own server. You can specify Netlify as the fallback provider so that it uses the
Netlify Image CDN for all images that are not from Contentful or another
supported provider. This will be all handled automatically.

## Base component

_Supported frameworks: All except `webc`, `lit` and `angular`._

Previously, the `Image` and `Source` components always loaded support for every
provider, even if you specified a single provider or custom transformer. This is
fine if you are using auto-detection, but many people wanted to use the
components in a more custom or modular way. The new base components allow you to
use the Unpic component without any of the automatic detection and transform
logic. You can provide your own transformer, or use a single, tree-shakable
provider import. This is useful if you are using a single provider, or if you
are building a custom component based on Unpic.

```tsx
// Import from the `/base` subpath
import { Image } from "@unpic/react/base";
// Import the transformer for the provider you are using
import { transform } from "unpic/providers/imgix";

export const Hero = () => (
  <Image
    src="https://images.unsplash.com/photo-1734108039189-f6c123288381"
    transformer={transform}
    operations={{ sepia: 50 }}
  />
);
```

The `operations` and `options` properties are still type-safe and inferred from
the transformer, and you don't need to specify the provider name in the
`operations` object.
