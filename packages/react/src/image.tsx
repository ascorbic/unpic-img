import * as React from "react";
import {
  CoreImageAttributes,
  transformProps,
  UnpicImageProps,
} from "@unpic/core";

export default function Image(
  props: UnpicImageProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    React.CSSProperties
  >
) {
  return <img {...transformProps(props)} />;
}
