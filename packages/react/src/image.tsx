import * as React from "react";
import { transformProps, UnpicImageProps } from "@unpic/core";

export default function Image(
  props: UnpicImageProps<React.ImgHTMLAttributes<HTMLImageElement>>
) {
  const camelizedProps = camelizeProps(transformProps(props));
  return <img {...camelizedProps} />;
}

function camelizeProps(o: object): object {
  const fixedMap: Record<string, string> = { srcset: "srcSet" };
  const nestedKeys = ["style"];
  const camelize = (s: string) =>
    s.replace(/-./g, (substr) => substr[1].toUpperCase());

  return Object.fromEntries(
    Object.entries(o).map(([k, v]) => [
      fixedMap[k] || camelize(k),
      nestedKeys.includes(k) && v ? camelizeProps(v) : v,
    ])
  );
}
