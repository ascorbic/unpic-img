import * as React from "react";
import { transformProps, UnpicImageProps } from "@unpic/core";
import { camelizeProps } from "./camelize";

export type ImageProps = UnpicImageProps<
  React.ImgHTMLAttributes<HTMLImageElement>
>;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const camelizedProps = camelizeProps(
      transformProps<React.ImgHTMLAttributes<HTMLImageElement>>(props),
    );
    return <img {...camelizedProps} ref={ref} />;
  },
);
