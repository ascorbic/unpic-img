import * as React from "react";
import { transformProps, UnpicImageProps } from "@unpic/core";

export default function Image(
  props: UnpicImageProps<React.ImgHTMLAttributes<HTMLImageElement>>
) {
  return <img {...transformProps(props)} />;
}
