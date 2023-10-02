<script lang="ts">
  import { transformSourceProps } from "@unpic/core";
  import type { SourceProps as BaseSourceProps } from "./types";
  // This unused import is a hack to get around a bug in svelte2tsx
  import type { UrlTransformer, ImageCdn } from "unpic";

  type $$Props = BaseSourceProps;

  $: props = $$props as $$Props;
  $: transformedProps = transformSourceProps({
    ...props,
  });
</script>

<source {...transformedProps} />
