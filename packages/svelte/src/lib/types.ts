import type { UnpicImageProps, UnpicSourceProps } from "@unpic/core";
import type { HTMLImgAttributes } from "svelte/elements";

export type ImageProps = UnpicImageProps<HTMLImgAttributes, string | null>;
export type SourceProps = UnpicSourceProps;
