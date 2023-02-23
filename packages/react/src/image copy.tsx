import * as React from "react";
import { transformProps, UnpicImageProps } from "@unpic/core";

type ImageProps = UnpicImageProps<React.ImgHTMLAttributes<HTMLImageElement>>;
function Image(props: ImageProps) {
  const camelizedProps = transformProps(props);
  return <img {...camelizedProps} />;
}

export default Image;
