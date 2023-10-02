import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "preact";
import { UnSignal } from ".";

export type ImageProps = UnpicImageProps<
  UnSignal<JSX.HTMLAttributes<HTMLImageElement>>
>;

export function Image(props: ImageProps) {
  return <img {...transformProps(props)} />;
}
