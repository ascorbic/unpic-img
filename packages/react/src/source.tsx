import * as React from "react";
import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
export type SourceProps = UnpicSourceProps;

export const Source = React.forwardRef<HTMLSourceElement, SourceProps>(
  function Source(props, ref) {
    return <source {...transformSourceProps(props)} ref={ref} />;
  },
);
