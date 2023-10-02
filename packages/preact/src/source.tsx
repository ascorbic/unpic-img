import { JSX } from "preact";
import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
import { UnSignal } from "./index.js";
export type SourceProps = UnpicSourceProps;

export function Source(props: SourceProps) {
  return (
    <source
      {...transformSourceProps<UnSignal<JSX.HTMLAttributes<HTMLSourceElement>>>(
        props,
      )}
    />
  );
}
