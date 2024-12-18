import type {
  ImageCdn,
  ProviderOperations,
  ProviderOptions,
  Operations,
  TransformerFunction,
} from "unpic";

export type { Operations };

/**
 * Core HTML image attributes common across frameworks.
 * For React and similar frameworks, attribute names are converted to camelCase.
 */
export interface CoreImageAttributes<TStyle = Record<string, string>> {
  src?: string | number | null;
  width?: string | number | null;
  height?: string | number | null;
  alt?: string | number | null;
  loading?: "eager" | "lazy" | null;
  decoding?: "sync" | "async" | "auto" | null;
  style?: TStyle;
  srcset?: string | number | null;
  role?: "presentation" | "img" | "none" | "figure" | (string & {}) | null;
  sizes?: string | number | null;
  fetchpriority?: "high" | "low" | "auto" | null;
}

/**
 * Common options for CDN-based image components including layout preferences,
 * CDN configuration, and styling options.
 */
interface BaseOptions {
  src: string;
  cdn?: ImageCdn;
  fallback?: ImageCdn;
  operations?: Partial<ProviderOperations>;
  options?: Partial<ProviderOptions>;
  breakpoints?: number[];
  priority?: boolean;
  fetchpriority?: "high" | "low";
  background?: string;
  objectFit?: ObjectFit;
  unstyled?: boolean;
}

/**
 * Common options for transformer-based image components that use direct URL transformations
 * instead of a CDN configuration.
 */
interface BaseTransformerOptions<TOperations extends Operations, TOptions> {
  src: string;
  transformer: TransformerFunction<TOperations, TOptions>;
  operations?: TOperations & { width?: never; height?: never };
  options?: TOptions;
  breakpoints?: number[];
  priority?: boolean;
  fetchpriority?: "high" | "low";
  background?: string;
  objectFit?: ObjectFit;
  unstyled?: boolean;
}

/**
 * Configuration options for image sources using CDN-based transformations.
 * Provides basic image parameters and CDN configuration without layout constraints.
 */
export interface ImageSourceOptions {
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  layout?: Layout;
  breakpoints?: number[];
  cdn?: ImageCdn;
  fallback?: ImageCdn;
  operations?: Partial<ProviderOperations>;
  options?: Partial<ProviderOptions>;
}

/**
 * Configuration options for image sources using URL transformer-based transformations.
 * Provides basic image parameters and transformer configuration without layout constraints.
 */
export interface BaseImageSourceOptions<
  TOperations extends Operations,
  TOptions,
> {
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  layout?: Layout;
  breakpoints?: number[];
  transformer?: TransformerFunction<TOperations, TOptions>;
  operations?: TOperations & { width?: never; height?: never };
  options?: TOptions;
}

type WithWidthHeight = {
  width: number;
  height: number;
  aspectRatio?: never;
};

type WithAspectRatioAndWidth = {
  width: number;
  aspectRatio: number;
  height?: never;
};

type WithAspectRatioAndHeight = {
  height: number;
  aspectRatio: number;
  width?: never;
};

type DimensionRequirements =
  | WithWidthHeight
  | WithAspectRatioAndWidth
  | WithAspectRatioAndHeight;

type FixedLayout = {
  layout: "fixed";
} & DimensionRequirements;

type ConstrainedLayout = {
  layout?: "constrained";
} & DimensionRequirements;

type FullWidthLayout = {
  layout: "fullWidth";
  width?: never;
  height?: number;
  aspectRatio?: number;
};

/**
 * Props for CDN-based image components with layout-specific dimension requirements.
 * Supports fixed, constrained, and full-width layouts with appropriate dimension constraints.
 */
export type UnpicImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = TImageAttributes["style"],
> = Omit<TImageAttributes, "srcset" | "style"> &
  BaseOptions &
  (FixedLayout | ConstrainedLayout | FullWidthLayout);

/**
 * Props for transformer-based image components with layout-specific dimension requirements.
 * Uses direct URL transformations instead of CDN configurations.
 */
export type UnpicBaseImageProps<
  TOperations extends Operations,
  TOptions,
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = TImageAttributes["style"],
> = Omit<TImageAttributes, "srcset" | "style"> &
  BaseTransformerOptions<TOperations, TOptions> &
  (FixedLayout | ConstrainedLayout | FullWidthLayout);

/**
 * Core attributes for HTML source elements used in picture elements.
 */
export interface CoreSourceAttributes {
  srcset?: string | null;
  type?: string | null;
  sizes?: string | null;
  media?: string | null;
}

/**
 * Props for CDN-based source elements with layout-specific dimension requirements.
 */
export type UnpicSourceProps = Omit<CoreSourceAttributes, "srcset"> &
  BaseOptions &
  (FixedLayout | ConstrainedLayout | FullWidthLayout);

/**
 * Props for transformer-based source elements with layout-specific dimension requirements.
 * Uses direct URL transformations instead of CDN configurations.
 */
export type UnpicBaseSourceProps<
  TOperations extends Operations,
  TOptions,
> = Omit<CoreSourceAttributes, "srcset"> &
  BaseTransformerOptions<TOperations, TOptions> &
  (FixedLayout | ConstrainedLayout | FullWidthLayout);

/**
 * Available layout modes for image components.
 * - fixed: Image maintains exact dimensions
 * - constrained: Image maintains aspect ratio and fits within given dimensions
 * - fullWidth: Image spans full width of container with optional height constraint
 */
export type Layout = "fixed" | "constrained" | "fullWidth";

/**
 * Object-fit options for controlling how the image fills its container.
 */
export type ObjectFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down"
  | "inherit"
  | "initial";
