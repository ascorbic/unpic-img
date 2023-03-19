---
title: "og_edge"
description: "Generate Open Graph images at the edge"
githubRepo: "ascorbic/og-edge"
---

Generate Open Graph images with Deno and Netlify Edge Functions, no framework
needed. This is a fork of the awesome
[`@vercel/og`](https://www.npmjs.com/package/@vercel/og), ported to run on Deno.

## Usage

To use on Netlify, create the following Edge Function:

```jsx
// /netlify/edge-functions/og.tsx

import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

export default async function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 128,
          background: "lavender",
        }}
      >
        Hello!
      </div>
    )
  );
}

export const config = {
  path: "/og",
  cache: "manual",
};
```

Make sure you have the latest version of
[the Netlify CLI](https://docs.netlify.com/cli/get-started/) installed.Then run
`netlify dev` and load http://localhost:8888/og, the React element will be
rendered and returned as a PNG. To deploy to Netlify's edge network, run
`netlify deploy`.

Alternatively, to use with the Deno CLI or Deno Deploy, create a file with the
following:

```tsx
// /og.tsx

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

async function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 128,
          background: "lavender",
        }}
      >
        Hello!
      </div>
    )
  );
}

serve(handler);
```

Then run `deno run --allow-net --allow-env og.tsx`

Read more about the API, supported features and check out the examples in the
following sections.

## API Reference

The package exposes an `ImageResponse` constructor, with the following options
available:

```jsx
import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'

// ...
new ImageResponse(
  element: ReactElement,
  options: {
    width?: number = 1200
    height?: number = 630
    emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' | 'fluent' | 'fluentFlat' = 'twemoji',
    fonts?: {
      name: string,
      data: ArrayBuffer,
      weight: number,
      style: 'normal' | 'italic'
    }[]
    debug?: boolean = false

    // Options that will be passed to the HTTP response
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
)
```

When running in production, these headers will be included by `og_edge`:

```jsx
'content-type': 'image/png',
'cache-control': 'public, max-age=31536000, no-transform, immutable',
```

During development, the `cache-control: no-cache, no-store` header is used
instead.

### Supported HTML and CSS Features

Please refer to
[Satori’s documentation](https://github.com/vercel/satori#documentation) for a
list of supported HTML and CSS features.

By default, `og_edge` only has the Noto Sans font included. If you need to use
other fonts, you can pass them in the `fonts` option. Check the **Custom Font**
example below for more details.

## Examples

- Embed SVG Image ·
  [_source_](https://github.com/ascorbic/og-edge/blob/main//netlify/edge-functions/image-svg.tsx)
  · [_demo_](https://og-examples.netlify.app/og/image-svg)
- Dynamic PNG Image Based on URL Queries ·
  [_source_](https://github.com/ascorbic/og-edge/blob/main//netlify/edge-functions/dynamic-image.tsx)
  · [_demo_](https://og-examples.netlify.app/og/dynamic-image?username=ascorbic)
- Custom Font ·
  [_source_](https://github.com/ascorbic/og-edge/blob/main//netlify/edge-functions/custom-font.tsx)
  · [_demo_](https://og-examples.netlify.app/og/custom-font)
- Emoji ·
  [_source_](https://github.com/ascorbic/og-edge/blob/main//netlify/edge-functions/emoji.tsx)
  · [_demo_](https://og-examples.netlify.app/og/emoji)
- Languages ·
  [_source_](https://github.com/ascorbic/og-edge/blob/main//netlify/edge-functions/language.tsx)
  · [_demo_](https://og-examples.netlify.app/og/language)

## Development / Contributing

## Acknowledgements

Basically all of the credit for this goes to
[shuding](https://github.com/shuding). I just ported it to Deno and added a few
tweaks.

## License

Mozilla Public Licence. Copyright Vercel and Matt Kane
