import { component$ } from "@builder.io/qwik";
import { transformSourceProps } from "@unpic/core";
import type { UnpicSourceProps } from "@unpic/core";
export type SourceProps = UnpicSourceProps;

export const Source = component$((props: SourceProps) => {
  return <source {...transformSourceProps(props)} />;
});
