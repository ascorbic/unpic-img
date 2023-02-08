import {
  CoreImageAttributes,
  transformProps,
  UnpicImageProps,
} from "@unpic/core";

function Image(props: UnpicImageProps<CoreImageAttributes>) {
  return <img {...transformProps(props)} />;
}

export default Image;
