<script lang="ts">
  import type { SourceProps as BaseSourceProps } from "./types";

  import { transformSourceProps } from "@unpic/core";

  let props: BaseSourceProps = $props();

  let transformedProps = $derived(
    transformSourceProps({
      ...props,
    }),
  );
</script>

<source {...transformedProps} />
