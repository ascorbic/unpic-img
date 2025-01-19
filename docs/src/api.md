## Image Props

The component accepts all the props of an `<img>` tag, plus the following:

### `layout`

The resizing behaviour of the image.

- `constrained`: (default) the image will be rendered at a maximum of `width`
  and `height`, but will scale down automatically if the container is smaller,
  maintaining the aspect ratio.
- `fullWidth`: the image will be rendered at full width of its container. This
  is optimized for full-width hero images. You can set `height` to a fixed
  value, which will mean the image will be rendered at that fixed height and
  scale horizontally to fill the container.
- `fixed`: the image will be rendered at the exact size specified by `width` and
  `height`

<video loop muted autoplay playsinline>
  <source src="/layouts.webm" type="video/webm" />
</video>

### `priority`

By default, images are loaded lazily. If `priority` is set to `true`, the image
will be loaded eagerly, and will be given high priority by the browser. This is
useful for images that are above the fold, particularly large ones such as hero
images.

### `background`

Either an image URL, CSS gradient or CSS colour value. If set to `auto`, a
low-resolution version of the image will be rendered as a background image, with
a blurred placeholder effect. This is still loaded from the remote server, so if
you can instead provide an inline base64-encoded version of the image or
background colour, you should do that instead. Look at
[`@unpic/placeholder`](/placeholder/) for a library that can generate these
placeholders.

Bear in mind that this is not removed after the image loads, so it will be
visible if the image has transparency.

### `aspectRatio`

Instead of specifying both `width` and `height`, you can specify an
`aspectRatio`.

### `fallback`

By default the CDN is auto-detected from the `src` URL, and if it can't be
detected then it will use the source URL without transformation. You can specify
a fallback provider here instead, and all images will use this provider if the
CDN can't be detected. This is useful if you are using a platform that provides
its own image CDN, or if you are using a provider that can transform remote
images.

See the [unpic](https://github.com/ascorbic/unpic) for supported values.

### `operations`

This allows you to pass provider-specific operations that will be performed on
any images that use that provider. You can pass options for multiple providers
if the images could come from different sources, and it will automatically apply
the correct operations to each image, according to the detected provider.

In this example, we want the image to be flipped horizontally. The `imgix` and
`bunny` providers both support this operation but with different names, so we
can pass both options and they will be applied to the image as required.

```js
{ imgix: { flip: "h" }, bunny: { flop: true } }}
```

The supported operations are specific to each provider, and are type-checked and
should provide autocompletion in your editor. See the
[list of supported providers](/lib#supported-providers) for the list of keys.

### `options`

This allows you to pass provider-specific options that will be used for any
images that use that provider. These options are used to configure the provider,
including account IDs, domains and other settings. You can pass options for
multiple providers if the images could come from different sources, and it will
automatically apply the correct options to each image, according to the detected
provider. These do not need to be provided if all images have options set in the
URLs themselves.

```js
{ cloudinary: { cloudName: "demo" }, ipx: { baseUrl: "/_images" } }}
```

The supported options are specific to each provider, and are type-checked and
should provide autocompletion in your editor. See the
[list of supported providers](/lib#supported-providers) for the list of keys.

### `breakpoints`

By default the image breakpoints used in the `srcset` are generated based on the
layout and image size. You can override this by specifying an array of
breakpoints. The breakpoints are specified as an array of numbers, representing
the width of the image in pixels.

```js
[320, 640, 960, 1280];
```

### Other props

Any prop supported by `<img>` tags can be passed in, except `srcset` which is
generated from `src`. The following props are set automatically, but can be
overridden if you need to:

- `sizes`
- `role`
- `decoding`
- `loading`
- `fetchpriority`

## Source Props

The Source component must be wrapped in a `<picture>` tag, and accepts the
following props:

### `media`

A media query string. If this matches, the source will be used. Normally this
would be something like `(min-width: 768px)`, but it can also be used for dark
mode detection, e.g. `(prefers-color-scheme: dark)` or other media queries.

### `type`

The MIME type of the image. This is used to generate the `type` attribute of the
`<source>` tag, but is also passed to the CDN to generate the correct image
type. Normally an image CDN will auto-detect the required image format, but not
all support it and in that case you can use this component with `type` to
specify multiple image format options and the browser will choose the best
supported one.

### Other props

It also accepts the following props that are used in the same way as in the
Image component:

- `layout`
- `src`
- `width`
- `height`
- `aspectRatio`
- `cdn`
- `breakpoints`

```

```
