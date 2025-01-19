import {
  transformBaseImageProps,
  type UnpicBaseImageProps,
  type Operations,
} from "@unpic/core/base";
import { JSX } from "preact";
import { UnSignal } from "../index";

type ImgPropsWithoutSignals = UnSignal<JSX.HTMLAttributes<HTMLImageElement>>;

export type ImageProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseImageProps<TOperations, TOptions, ImgPropsWithoutSignals>;

export function Image<T extends Operations, O>({
  transformer,
  ...props
}: ImageProps<T, O>) {
  return (
    <img
      {...transformBaseImageProps<
        T,
        O,
        ImgPropsWithoutSignals,
        ImgPropsWithoutSignals["style"]
      >({ transformer, ...props })}
    />
  );
}
