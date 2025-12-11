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

  // Filter out undefined event handlers to prevent CSP violations in Svelte 5
  // When event handler properties are present but undefined in the spread object,
  // Svelte 5 adds internal event bindings that violate CSP policies
  const filteredRest = $derived(
    Object.fromEntries(
      Object.entries(rest).filter(([key, value]) => {
        // Keep non-event-handler properties
        if (!key.startsWith("on")) return true;
        // Keep event handlers that are explicitly defined by the user
        return value !== undefined;
      })
    )
  );
</script>

<img
  {...filteredRest}
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
