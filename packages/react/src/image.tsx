import * as React from "react";
import {
  CoreImageAttributes,
  transformProps,
  UnpicImageProps,
} from "@unpic/core";

export default function Image(props: UnpicImageProps<CoreImageAttributes>) {
  return <img {...transformProps(props)} />;
}
