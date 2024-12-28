import {
  transformBaseSourceProps,
  type UnpicBaseSourceProps,
  type Operations,
} from "@unpic/core/base";
import { UnSignal } from "..";
export type { UnpicBaseSourceProps as SourceProps };
import { JSX } from "preact";

export function Source<TOperations extends Operations, TOptions>(
  props: UnpicBaseSourceProps<TOperations, TOptions>,
) {
  return (
    <source
      {...transformBaseSourceProps<
        UnSignal<JSX.HTMLAttributes<HTMLSourceElement>>,
        TOperations,
        TOptions
      >(props)}
    />
  );
}
