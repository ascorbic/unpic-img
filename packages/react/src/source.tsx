import * as React from "react";
import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
import { camelizeProps } from "./camelize";
export type SourceProps = UnpicSourceProps;

export const Source = React.forwardRef<HTMLSourceElement, SourceProps>(
  function Source(props, ref) {
    const camelizedProps = camelizeProps(
      transformSourceProps<React.SourceHTMLAttributes<HTMLSourceElement>>(
        props,
      ),
    );
    return <source {...camelizedProps} ref={ref} />;
  },
);
