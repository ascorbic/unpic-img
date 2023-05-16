import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "solid-js/jsx-runtime";

export type ImageProps = UnpicImageProps<
  JSX.ImgHTMLAttributes<HTMLImageElement>
>;
export default function Image(props: ImageProps): JSX.Element {
  return <img {...transformProps(props)} />;
}
