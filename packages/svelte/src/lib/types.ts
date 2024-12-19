import type { UnpicImageProps, UnpicSourceProps } from "@unpic/core";
import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";

export type ImageProps = UnpicImageProps<HTMLImgAttributes> & {
  style?: HTMLAttributes<HTMLImageElement>["style"];
};
export type SourceProps = UnpicSourceProps;
