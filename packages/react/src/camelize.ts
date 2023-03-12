import type { HTMLAttributes } from "react";

const camelize = (s: string) =>
  s.replace(/-./g, (substr) => substr[1].toUpperCase());

const nestedKeys = new Set(["style"]);
const fixedMap: Record<string, string> = {
  srcset: "srcSet",
  fetchpriority: "fetchPriority",
};

export function camelizeProps<TObject extends HTMLAttributes<HTMLElement>>(
  props: TObject
): TObject {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [
      fixedMap[k] || camelize(k),
      nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v,
    ])
  ) as TObject;
}
