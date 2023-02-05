import { transformProps, UnpicImageProps } from "./lib/core";

export default function Image(props: UnpicImageProps) {
  return <img {...transformProps(props)} />;
}
