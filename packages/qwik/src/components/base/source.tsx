import { component$, QRL } from "@builder.io/qwik";
import type { Operations, UnpicBaseSourceProps } from "@unpic/core";
import { transformBaseSourceProps } from "@unpic/core/base";
import { TransformerFunction } from "unpic";
export type SourceProps<TOperations extends Operations, TOptions> = Omit<
  UnpicBaseSourceProps<TOperations, TOptions>,
  "transformer"
> & {
  transformer$: QRL<TransformerFunction<TOperations, TOptions>>;
};

export const Source = component$(
  <TOperations extends Operations, TOptions>({
    transformer$,
    ...props
  }: SourceProps<TOperations, TOptions>) => {
    const transformer = transformer$.resolved;
    return (
      <source
        {...transformBaseSourceProps({
          transformer,
          ...props,
        } as UnpicBaseSourceProps<TOperations, TOptions>)}
      />
    );
  },
);
