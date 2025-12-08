<script lang="ts">

  import { transformProps } from "@unpic/core";
  import styleToCss from "style-object-to-css-string";
  import type { ImageProps } from "./types";

  let {
    style: parentStyle,
    ...props
  }: ImageProps = $props();

  let {
    alt,
    style: styleObj,
    src,
    width,
    height,
    loading,
    decoding,
    srcset,
    role,
    sizes,
    fetchpriority,
  } = $derived(transformProps(props));

  let style = $derived(
    [styleToCss((styleObj || {}) as Record<string, string>), parentStyle]
      .filter(Boolean)
      .join(";"),
  );

  // Destructure unpic props to avoid spreading them onto the img element
  const {
    cdn: _cdn,
    fallback: _fallback,
    operations: _operations,
    options: _options,
    breakpoints: _breakpoints,
    background: _background,
    objectFit: _objectFit,
    unstyled: _unstyled,
    layout: _layout,
    aspectRatio: _aspectRatio,
    ...rest
  } = props;
</script>

<img
  {...rest}
  {style}
  {loading}
  {width}
  {height}
  {decoding}
  {role}
  {fetchpriority}
  alt={alt?.toString()}
  src={src?.toString()}
  srcset={srcset?.toString()}
  sizes={sizes?.toString()}
/>
