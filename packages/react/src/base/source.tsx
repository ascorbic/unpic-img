import {
  transformBaseSourceProps,
  type UnpicBaseSourceProps,
  type Operations,
} from "@unpic/core/base";
import { camelizeProps } from "../camelize";
export type { UnpicBaseSourceProps as SourceProps };

export function Source<TOperations extends Operations, TOptions>(
  props: UnpicBaseSourceProps<TOperations, TOptions>,
) {
  const camelizedProps = camelizeProps(transformBaseSourceProps(props));
  return <source {...camelizedProps} />;
}
