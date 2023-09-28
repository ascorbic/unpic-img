import * as React from "react";
import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
import { Image, ImageProps } from "./image";
export type SourceProps = ImageProps | UnpicSourceProps;

export const Source = React.forwardRef<HTMLSourceElement, SourceProps>(
  function Source(props, ref) {
    if (!("media" in props) && !("type" in props)) {
      return <Image {...(props as ImageProps)} styled={false} />;
    }
    return <source {...transformSourceProps(props)} ref={ref} />;
  },
);
