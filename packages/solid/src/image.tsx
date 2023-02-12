import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "solid-js/jsx-runtime";

export default function Image(
  props: UnpicImageProps<JSX.ImgHTMLAttributes<HTMLImageElement>>
): JSX.Element {
  return <img {...transformProps(props)} />;
}
