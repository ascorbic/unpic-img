<script lang="ts">
  import type { SourceProps } from "./types";

  import { transformSourceProps } from "@unpic/core";
  import { filterEventHandlers } from "./filter-event-handlers";

  let props: SourceProps = $props();

  let transformedProps = $derived(
    transformSourceProps({
      ...props,
    }),
  );

  // Filter out event handlers to prevent CSP violations with inline event handlers
  const filteredProps = $derived(filterEventHandlers(transformedProps));
</script>

<source {...filteredProps} />
