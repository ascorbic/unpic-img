---
title: "Customizing Unpic"
description: "Build your own Unpic components"
---

While Unpic framework components are designed to work completely automatically
with zero configuration, you can also use them to build your own custom
components with a single image transformer. You can use this to create a
pre-configured component for your own site, or build a custom component for a
specific provider. For example, you could create a component for a particular
CMS that you distribute as part of that CMS's SDK. You can quickly build custom
libraries for all of Unpic's supported frameworks. Unpic comes with tools
designed to make this process as simple as possible.

> The examples in this guide use React, but the same principles apply to all
> Unpic framework components that support custom transformers.

## Base image component

The base Image component is an Unpic component without any transformers. These
are the functions that generate the URLs for a particular CDN or CMS. While the
regular `Image` component automatically detects the provider from the image URL
and uses the appropriate transformer, the base component requires you to pass
the transformer manually. This allows you to create a custom component with a
single transformer, either one of the built-in transformers or a custom one.

```jsx
import { Image } from "@unpic/react/base";
import { transform } from "unpic/providers/shopify";

export const ProductImage = () => (
  <Image
    src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
    width={400}
    height={300}
    alt="A lovely bath"
    transformer={transform}
  />
);
```

This example is for a single image, but of course the real power of Unpic comes
from building a reusable component.

```jsx
import { Image, type ImageProps } from "@unpic/react/base";
import { transform } from "unpic/providers/shopify";

export const ProductImage = (props) => (
  <Image
    {...props}
    transformer={transform}
  />
);
```

You can also pass options to the transformer, for example to pass in credentials
or shared settings.

```jsx
import { Image } from "@unpic/react/base";
import {
  transform,
  type CloudinaryOptions,
  type CloudinaryOperations,
} from "unpic/providers/cloudinary";

export const CloudinaryImage = (
  props: ImageProps<CloudinaryOperations, CloudinaryOptions>,
) => (
  <Image
    transformer={transform}
    options={{
      cloudName: "example",
    }}
    {...props}
  />
);
```

You can then distribute that component as a library, or use it in your own site.

## Custom transformer

For details on how to build a custom transformer, see the
[contributing guide](/lib/contributing/). If you want to create a private
transformer, you can skip the parts on contributing to the library and just
follow the steps to create the transform function.
