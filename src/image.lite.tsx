import { transformProps, UnpicImageProps } from "@unpic/core";

export default function Image(props: UnpicImageProps) {
  return <img {...transformProps(props)} />;
}
