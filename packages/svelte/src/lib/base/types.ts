import type {
  UnpicBaseImageProps,
  Operations,
  UnpicBaseSourceProps,
} from "@unpic/core";
import type { HTMLImgAttributes, HTMLAttributes } from "svelte/elements";

export type BaseImageProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseImageProps<TOperations, TOptions, HTMLImgAttributes> & {
  style?: HTMLAttributes<HTMLImageElement>["style"];
};

export type BaseSourceProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseSourceProps<TOperations, TOptions>;
