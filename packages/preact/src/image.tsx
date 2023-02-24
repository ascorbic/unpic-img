import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "preact";

/**
 * preact HTML types allow for signals as attributes, but we don't want to pass these to our generic
 */
type UnSignal<T, K extends keyof T = keyof T> = {
  [P in K]: Exclude<T[P], JSX.SignalLike<any>>;
};

export type ImageProps = UnpicImageProps<
  UnSignal<JSX.HTMLAttributes<HTMLImageElement>>
>;

export function Image(props: ImageProps) {
  return <img {...transformProps(props)} />;
}
