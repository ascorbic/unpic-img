<script lang="ts">
  import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";

  import { transformProps, type UnpicImageProps } from "@unpic/core";
  import styleToCss from "style-object-to-css-string";

  let {
    style: parentStyle,
    ...props
  }: UnpicImageProps<
    HTMLImgAttributes,
    HTMLAttributes<HTMLImageElement>["style"]
  > & { style?: HTMLAttributes<HTMLImageElement>["style"] } = $props();

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
</script>

<img
  {...props}
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
