<script lang="ts">
    import { transformProps, type UnpicImageProps } from "@unpic/core"
    import type {HTMLImgAttributes} from "svelte/elements"
    import styleToCss from 'style-object-to-css-string';
    type $$Props = UnpicImageProps<HTMLImgAttributes, string | null>
    const { style: parentStyle, ...props} = $$props as $$Props
    const {alt, style: styleObj, ...transformedProps} = transformProps({...props, style: {} as Record<string, string>})
    const style = [styleToCss(styleObj), parentStyle].filter(Boolean).join(';')

  </script>
  <img alt={alt} style={style} {...transformedProps} />