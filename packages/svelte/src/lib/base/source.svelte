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
</script>

<source {...transformedProps} />
