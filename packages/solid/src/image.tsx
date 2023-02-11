import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "solid-js/jsx-runtime";

function Image(
  props: UnpicImageProps<JSX.ImgHTMLAttributes<HTMLImageElement>>
): JSX.Element {
  return <img {...transformProps(props)} />;
}

export default Image;
