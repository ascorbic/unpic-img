import { component$ } from "@builder.io/qwik";
import type { QRL, QwikIntrinsicElements } from "@builder.io/qwik";
import type { Operations, UnpicBaseImageProps } from "@unpic/core";
import { transformBaseImageProps } from "@unpic/core/base";
import type { TransformerFunction } from "unpic";
export type ImageProps<
  TOperations extends Operations,
  TOptions = unknown,
> = Omit<
  UnpicBaseImageProps<TOperations, TOptions, QwikIntrinsicElements["img"]>,
  "transformer"
> & {
  transformer$: QRL<TransformerFunction<TOperations, TOptions>>;
};

export const Image = component$(
  <TOperations extends Operations, TOptions = unknown>({
    transformer$,
    ...props
  }: ImageProps<TOperations, TOptions>) => {
    const transformer = transformer$.resolved;
    return (
      <img
        {...transformBaseImageProps<
          TOperations,
          TOptions,
          QwikIntrinsicElements["img"]
        >({ transformer, ...props } as UnpicBaseImageProps<
          TOperations,
          TOptions,
          QwikIntrinsicElements["img"]
        >)}
      />
    );
  },
);
