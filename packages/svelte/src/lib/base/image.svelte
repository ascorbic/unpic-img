<script lang="ts">
  import { transformBaseImageProps } from "@unpic/core/base";
  import styleToCss from "style-object-to-css-string";
  import type { BaseImageProps } from "./types";
  import { filterEventHandlers } from "../filter-event-handlers";

  let { style: parentStyle, ...props }: BaseImageProps<any, unknown> = $props();

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
  } = $derived(transformBaseImageProps(props));

  let style = $derived(
    [styleToCss((styleObj || {}) as Record<string, string>), parentStyle]
      .filter(Boolean)
      .join(";"),
  );

  // Filter out event handlers to prevent CSP violations with inline event handlers
  const filteredProps = $derived(filterEventHandlers(props));
</script>

<img
  {...filteredProps}
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
