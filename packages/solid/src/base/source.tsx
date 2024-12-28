import {
  Operations,
  transformBaseSourceProps,
  type UnpicBaseSourceProps,
} from "@unpic/core/base";
import { JSX } from "solid-js/jsx-runtime";

export type SourceProps<
  TOperations extends Operations,
  TOptions,
> = UnpicBaseSourceProps<TOperations, TOptions>;
export default function Source<TOperations extends Operations, TOptions>(
  props: SourceProps<TOperations, TOptions>,
): JSX.Element {
  return <source {...transformBaseSourceProps(props)} />;
}
