import {
  type Operations,
  type UnpicBaseImageProps,
  transformBaseImageProps,
} from "@unpic/core/base";
import { JSX } from "solid-js/jsx-runtime";

export type ImageProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseImageProps<
  TOperations,
  TOptions,
  JSX.ImgHTMLAttributes<HTMLImageElement>
>;
export default function Image<TOperations extends Operations, TOptions>(
  props: ImageProps<TOperations, TOptions>,
): JSX.Element {
  return <img {...transformBaseImageProps(props)} />;
}
