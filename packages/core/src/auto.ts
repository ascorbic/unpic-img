import {
  getProviderForUrl,
  getTransformerForCdn,
  ProviderOperations,
  ProviderOptions,
} from "unpic";
import {
  CoreSourceAttributes,
  UnpicSourceProps,
  CoreImageAttributes,
  UnpicImageProps,
  UnpicBaseImageProps,
} from "./types";
import { transformBaseImageProps, transformBaseSourceProps } from "./base";
export * from "./types";
export {
  DEFAULT_RESOLUTIONS,
  getBreakpoints,
  getSizes,
  getSrcSet,
  getSrcSetEntries,
  getStyle,
  inferImageDimensions,
  normalizeImageType,
} from "./base";

/**
 * Generates the props for an img element
 */
export function transformProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = Record<string, string>,
>({
  cdn,
  fallback,
  operations = {},
  options,
  ...props
}: UnpicImageProps<TImageAttributes, TStyle>): TImageAttributes {
  cdn ??= getProviderForUrl(props.src) || fallback;
  if (!cdn) {
    return props as TImageAttributes;
  }
  const transformer = getTransformerForCdn(cdn);
  if (!transformer) {
    return props as TImageAttributes;
  }
  return transformBaseImageProps({
    ...props,
    operations: operations?.[cdn],
    options: options?.[cdn],
    transformer,
  } as UnpicBaseImageProps<
    ProviderOperations[typeof cdn],
    ProviderOptions[typeof cdn],
    TImageAttributes,
    TStyle
  >);
}

/**
 * Generates the props for a `<source>` element
 */
export function transformSourceProps<
  TSourceAttributes extends CoreSourceAttributes,
>({
  cdn,
  fallback,
  operations,
  options,
  ...props
}: UnpicSourceProps): TSourceAttributes {
  cdn ??= getProviderForUrl(props.src) || fallback;
  if (!cdn) {
    return props as unknown as TSourceAttributes;
  }
  const transformer = getTransformerForCdn(cdn);
  if (!transformer) {
    return props as unknown as TSourceAttributes;
  }
  return transformBaseSourceProps({
    ...props,
    operations: operations?.[cdn] as Omit<
      ProviderOperations[typeof cdn],
      "width" | "height"
    >,
    options: options?.[cdn],
    transformer,
  });
}
