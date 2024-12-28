<script lang="ts">
  import type { SourceProps } from "./types";

  import { transformSourceProps } from "@unpic/core";

  let props: SourceProps = $props();

  let transformedProps = $derived(
    transformSourceProps({
      ...props,
    }),
  );
</script>

<source {...transformedProps} />
