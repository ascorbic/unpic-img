import * as React from "react";
import { transformProps, UnpicImageProps } from "@unpic/core";
import { camelizeProps } from "./camelize";

type ImageProps = UnpicImageProps<React.ImgHTMLAttributes<HTMLImageElement>>;

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const camelizedProps = camelizeProps(transformProps(props));
    return <img {...camelizedProps} ref={ref} />;
  }
);

export default Image;
