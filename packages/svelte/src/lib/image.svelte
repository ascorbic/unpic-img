<script lang="ts">
  import { transformProps } from "@unpic/core";
  import styleToCss from "style-object-to-css-string";
  import type { ImageProps as BaseImageProps } from "./types";
  import type { HTMLAttributes } from "svelte/elements";
  // This unused import is a hack to get around a bug in svelte2tsx
  import type { UrlTransformer, ImageCdn } from "unpic";

  type $$Props = BaseImageProps;

  $: ({ style: parentStyle, ...props } = $$props as $$Props);
  $: ({
    alt,
    style: styleObj,
    ...transformedProps
  } = transformProps<
    Omit<HTMLAttributes<HTMLImageElement>, "style"> & {
      style: Record<string, string>;
      alt?: string | null;
    }
  >({ ...props }));
  $: style = [styleToCss(styleObj || {}), parentStyle]
    .filter(Boolean)
    .join(";");
</script>

<img {alt} {style} {...transformedProps} on:load />
