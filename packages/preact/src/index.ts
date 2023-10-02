import { JSX } from "preact";

export { Image } from "./image";
export type { ImageProps } from "./image";

export { Source } from "./source";
export type { SourceProps } from "./source";

/**
 * preact HTML types allow for signals as attributes, but we don't want to pass these to our generic
 */
export type UnSignal<T, K extends keyof T = keyof T> = {
  [P in K]: Exclude<T[P], JSX.SignalLike<unknown>>;
};
