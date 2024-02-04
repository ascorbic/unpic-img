<script lang="ts">
  import { transformProps, type UnpicImageProps } from "@unpic/core";
  import styleToCss from "style-object-to-css-string";
  import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";
  type $$Props = UnpicImageProps<
    HTMLImgAttributes,
    HTMLAttributes<HTMLImageElement>["style"]
  > & { style?: HTMLAttributes<HTMLImageElement>["style"] };

  $: ({ style: parentStyle, ...props } = $$props);
  $: ({
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
  } = transformProps(props as $$Props));
  $: style = [styleToCss(styleObj || {}), parentStyle]
    .filter(Boolean)
    .join(";");
</script>

<img
  {...$$props}
  {style}
  {loading}
  {width}
  {height}
  {decoding}
  {role}
  alt={alt?.toString()}
  src={src?.toString()}
  srcset={srcset?.toString()}
  sizes={sizes?.toString()}
  on:load
/>
