<script lang="ts">
  import { transformProps } from "@unpic/core";
  import styleToCss from "style-object-to-css-string";
  import type { ImageProps as BaseImageProps } from "./types";
  // This unused import is a hack to get around a bug in svelte2tsx
  import type { UrlTransformer, ImageCdn } from "unpic";

  type $$Props = BaseImageProps;

  $: ({ style: parentStyle, ...props } = $$props as $$Props);
  $: ({
    alt,
    style: styleObj,
    ...transformedProps
  } = transformProps({ ...props, style: {} as Record<string, string> }));
  $: style = [styleToCss(styleObj), parentStyle].filter(Boolean).join(";");
</script>

<img {alt} {style} {...transformedProps} />
