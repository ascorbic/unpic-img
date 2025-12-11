<script lang="ts">
  import { transformBaseSourceProps } from "@unpic/core/base";
  import type { BaseSourceProps } from "./types";

  import type { Operations } from "@unpic/core";

  let props: BaseSourceProps<Operations, unknown> = $props();

  let transformedProps = $derived(
    transformBaseSourceProps({
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
