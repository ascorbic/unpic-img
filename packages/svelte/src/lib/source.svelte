<script lang="ts">
  import type { SourceProps } from "./types";

  import { transformSourceProps } from "@unpic/core";

  let props: SourceProps = $props();

  let transformedProps = $derived(
    transformSourceProps({
      ...props,
    }),
  );

  // Filter out event handlers to prevent CSP violations with inline event handlers
  const filteredProps = $derived(
    Object.fromEntries(
      Object.entries(transformedProps).filter(([key]) => !key.startsWith("on"))
    )
  );
</script>

<source {...filteredProps} />
