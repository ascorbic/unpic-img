import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
import { JSX } from "solid-js/jsx-runtime";

export type SourceProps = UnpicSourceProps;
export default function Source(props: SourceProps): JSX.Element {
  return <source {...transformSourceProps(props)} />;
}
