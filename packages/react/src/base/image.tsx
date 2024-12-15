import * as React from "react";
import {
  transformBaseImageProps,
  type UnpicBaseImageProps,
  type Operations,
} from "@unpic/core/base";
import { camelizeProps } from "../camelize";

export type ImageProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseImageProps<
  TOperations,
  TOptions,
  React.ImgHTMLAttributes<HTMLImageElement>
>;

export function Image<T extends Operations, O>({
  transformer,
  ...props
}: ImageProps<T, O>) {
  const camelizedProps = camelizeProps(
    transformBaseImageProps({ transformer, ...props }),
  );
  return <img {...camelizedProps} />;
}
