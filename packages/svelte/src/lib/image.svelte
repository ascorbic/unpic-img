<script lang="ts">
  import { transformProps, type UnpicImageProps } from "@unpic/core"
  import styleToCss from 'style-object-to-css-string';
  import type { HTMLImgAttributes } from "svelte/elements"

  type $$Props = UnpicImageProps<HTMLImgAttributes, string | null>

  $: ({ style: parentStyle, ...props } = $$props as $$Props)
  $: ({ alt, style: styleObj, ...transformedProps } = transformProps({...props, style: {} as Record<string, string>}))
  $: style = [styleToCss(styleObj), parentStyle].filter(Boolean).join(';')
</script>
<img {alt} {style} {...transformedProps} />
