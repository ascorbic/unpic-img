<script lang="ts">
  import { transformBaseImageProps } from "@unpic/core/base";
  import styleToCss from "style-object-to-css-string";
  import type { BaseImageProps } from "./types";

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

  // Filter out undefined event handlers to prevent CSP violations in Svelte 5
  // When event handler properties are present but undefined in the spread object,
  // Svelte 5 adds internal event bindings that violate CSP policies
  const filteredProps = $derived(
    Object.fromEntries(
      Object.entries(props).filter(([key, value]) => {
        // Keep non-event-handler properties
        if (!key.startsWith("on")) return true;
        // Keep event handlers that are explicitly defined by the user
        return value !== undefined;
      })
    )
  );
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
