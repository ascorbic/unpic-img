## Props

The component accepts all the props of an `<img>` tag, plus the following:

### `layout`

The resizing behaviour of the image.

- `constrained`: (default) the image will be rendered at a maximum of `width` and `height`, but will scale down automatically if the container is smaller, maintaining the aspect ratio.
- `fullWidth`: the image will be rendered at full width of its container. This is optimized for full-width hero images. You can set `height` to a fixed value, which will mean the image will be rendered at that fixed height and scale horizontally to fill the container.
- `fixed`: the image will be rendered at the exact size specified by `width` and `height`

<video loop muted autoplay playsinline>
  <source src="/layouts.webm" type="video/webm" />
</video>

### `priority`

By default, images are loaded lazily. If `priority` is set to `true`, the image will be loaded eagerly, and will be given high priority by the browser. This is useful for images that are above the fold, particularly large ones such as hero images.

### `background`

Either an image URL, CSS gradient or CSS colour value. If set to `auto`, a low-resolution version of the image will be rendered as a background image, with a blurred placeholder effect. This is still loaded from the remote server, so if you can instead provide an inline base64-encoded version of the image or background colour, you should do that instead. Look at [`@unpic/placeholder`](/placeholder/) for a library that can generate these placeholders.

Bear in mind that this is not removed after the image loads, so it will be visible if the image has transparency.

### `aspectRatio`

Instead of specifying both `width` and `height`, you can specify can `aspectRatio`.

### `cdn`

By default the CDN is auto-detected from the `src` URL. If you want to override this, you can specify a CDN object. See the [unpic](https://github.com/ascorbic/unpic) for supported values.

### `breakpoints`

By default the image breakpoints used in the `srcset` are generated based on the layout and image size. You can override this by specifying an array of breakpoints. The breakpoints are specified as an array of numbers, representing the width of the image in pixels.

### Other props

Any prop supported by `<img>` tags can be passed in, except `srcset` which is generated from `src`. The following props are set automatically, but can be overridden if you need to:

- `sizes`
- `role`
- `decoding`
- `loading`
- `fetchpriority`
