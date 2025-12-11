<script lang="ts">
  import { transformBaseSourceProps } from "@unpic/core/base";
  import type { BaseSourceProps } from "./types";

  import type { Operations } from "@unpic/core";
  import { filterEventHandlers } from "../filter-event-handlers";

  let props: BaseSourceProps<Operations, unknown> = $props();

  let transformedProps = $derived(
    transformBaseSourceProps({
      ...props,
    }),
  );

  // Filter out event handlers to prevent CSP violations with inline event handlers
  const filteredProps = $derived(filterEventHandlers(transformedProps));
</script>

<source {...filteredProps} />
