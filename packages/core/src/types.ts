import type { ImageCdn, UrlTransformer, CdnOptions } from "unpic";

/**
 * HTML image attributes, common to image components in multiple frameworks.
 * For React (and potentially other frameworks added in the future), convert to camelCase.
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  role?: "presentation" | "img" | "none" | "figure" | (string & {}) | null;
  sizes?: string | number | null;
  fetchpriority?: "high" | "low" | "auto" | null;
}
export interface ImageSourceOptions {
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  layout?: Layout;
  breakpoints?: number[];
  transformer?: UrlTransformer;
  cdn?: ImageCdn;
  cdnOptions?: CdnOptions;
}

export type ObjectFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down"
  | "inherit"
  | "initial";

export type BaseImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = Omit<TImageAttributes, "srcset" | "style"> &
  ImageSourceOptions & {
    priority?: boolean;
    fetchpriority?: "high" | "low";
    background?: string;
    objectFit?: ObjectFit;
    unstyled?: boolean;
  };

export interface CoreSourceAttributes {
  srcset?: string | null;
  type?: string | null;
  sizes?: string | null;
  media?: string | null;
}

export type BaseSourceProps = Omit<CoreSourceAttributes, "srcset"> &
  ImageSourceOptions & {
    objectFit?: ObjectFit;
  };

type BaseImageWithAspectRatioProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = BaseImageProps<TImageAttributes, TStyle> & {
  aspectRatio: number;
};

type BaseSourceWithAspectRatioProps = BaseSourceProps & {
  aspectRatio: number;
};

type ImageWithAspectRatioAndWidthProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = BaseImageWithAspectRatioProps<TImageAttributes, TStyle> & {
  width: number;
};

type SourceWithAspectRatioAndWidthProps = BaseSourceWithAspectRatioProps & {
  width: number;
};

type ImageWithAspectRatioAndHeightProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = BaseImageWithAspectRatioProps<TImageAttributes, TStyle> & {
  height: number;
};

type SourceWithAspectRatioAndHeightProps = BaseSourceWithAspectRatioProps & {
  height: number;
};

type ImageWithWidthAndHeightProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = BaseImageProps<TImageAttributes, TStyle> & {
  width: number;
  height: number;
};

type SourceWithWidthAndHeightProps = BaseSourceProps & {
  width: number;
  height: number;
};

type ImageWithSizeProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> =
  | ImageWithAspectRatioAndWidthProps<TImageAttributes, TStyle>
  | ImageWithAspectRatioAndHeightProps<TImageAttributes, TStyle>
  | ImageWithWidthAndHeightProps<TImageAttributes, TStyle>;

type SourceWithSizeProps =
  | SourceWithAspectRatioAndWidthProps
  | SourceWithAspectRatioAndHeightProps
  | SourceWithWidthAndHeightProps;

export type FixedImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = Prettify<
  ImageWithSizeProps<TImageAttributes, TStyle> & {
    layout: "fixed";
  }
>;

export type FixedSourceProps = SourceWithSizeProps & {
  layout: "fixed";
};

export type ConstrainedImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = ImageWithSizeProps<TImageAttributes, TStyle> & {
  // Default is `constrained`, so this is optional
  layout?: "constrained";
};

export type ConstrainedSourceProps = SourceWithSizeProps & {
  // Default is `constrained`, so this is optional
  layout?: "constrained";
};

export type FullWidthImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle,
> = BaseImageProps<TImageAttributes, TStyle> & {
  layout: "fullWidth";
  width?: never;
};

export type FullWidthSourceProps = BaseSourceProps & {
  layout: "fullWidth";
  width?: never;
};

export type UnpicImageProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = TImageAttributes["style"],
> =
  | FixedImageProps<TImageAttributes, TStyle>
  | ConstrainedImageProps<TImageAttributes, TStyle>
  | FullWidthImageProps<TImageAttributes, TStyle>;

export type UnpicSourceProps =
  | FixedSourceProps
  | ConstrainedSourceProps
  | FullWidthSourceProps;

export type Layout = "fixed" | "constrained" | "fullWidth";
type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
