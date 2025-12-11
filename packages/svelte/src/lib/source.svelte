<script lang="ts">
  import type { SourceProps } from "./types";

  import { transformSourceProps } from "@unpic/core";

  let props: SourceProps = $props();

  let transformedProps = $derived(
    transformSourceProps({
      ...props,
    }),
  );

  // Filter out undefined event handlers to prevent CSP violations in Svelte 5
  // When event handler properties are present but undefined in the spread object,
  // Svelte 5 adds internal event bindings that violate CSP policies
  const filteredProps = $derived(
    Object.fromEntries(
      Object.entries(transformedProps).filter(([key, value]) => {
        // Keep non-event-handler properties
        if (!key.startsWith("on")) return true;
        // Keep event handlers that are explicitly defined by the user
        return value !== undefined;
      })
    )
  );
</script>

<source {...filteredProps} />
