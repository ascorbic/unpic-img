import { CoreImageAttributes, UnpicImageProps } from "@unpic/core";
import type { HTMLAttributes } from "react";
import * as React from "react";

const nestedKeys = new Set(["style"]);

export const isNewReact = "use" in React;

const fixedMap: Record<string, string> = {
  srcset: "srcSet",
  fetchpriority: isNewReact ? "fetchPriority" : "fetchpriority",
};

const camelize = (key: string) => {
  if (key.startsWith("data-") || key.startsWith("aria-")) {
    return key;
  }
  return (
    fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase())
  );
};

export function camelizeProps(
  props: React.SourceHTMLAttributes<HTMLSourceElement>,
): React.SourceHTMLAttributes<HTMLSourceElement>;
export function camelizeProps(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
): React.ImgHTMLAttributes<HTMLImageElement>;
export function camelizeProps<
  TProps extends
    | React.SourceHTMLAttributes<HTMLSourceElement>
    | React.ImgHTMLAttributes<HTMLImageElement>,
>(props: TProps): TProps {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [
      camelize(k),
      nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v,
    ]),
  ) as TProps;
}
