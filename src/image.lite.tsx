import {
  transformProps,
  UnpicImageProps,
  CoreImageAttributes,
} from "@unpic/core";

export default function Image(props: UnpicImageProps<CoreImageAttributes>) {
  return <img {...transformProps(props)} />;
}
