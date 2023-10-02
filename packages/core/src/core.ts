import {
  getCanonicalCdnForUrl,
  ImageCdn,
  UrlTransformer,
  getTransformer,
} from "unpic";

import { parse } from "./mediaquery.js";

export type Layout = "fixed" | "constrained" | "fullWidth";

type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export interface ImageSourceOptions {
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  layout?: Layout;
  breakpoints?: number[];
  transformer?: UrlTransformer;
  cdn?: ImageCdn;
}

// @ts-expect-error This may or may not be used with Vite
const DEBUG = import.meta.env?.DEV;

export function logError(...args: unknown[]) {
  if (DEBUG) {
    console.error("[unpic]", ...args);
  }
}

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

/**
 * Gets the `sizes` attribute for an image, based on the layout and width
 */
export const getSizes = (
  width?: number,
  layout?: Layout,
): string | undefined => {
  if (!width || !layout) {
    return undefined;
  }
  switch (layout) {
    // If screen is wider than the max size, image width is the max size,
    // otherwise it's the width of the screen
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;

    // Image is always the same width, whatever the size of the screen
    case `fixed`:
      return `${width}px`;

    // Image is always the width of the screen
    case `fullWidth`:
      return `100vw`;

    default:
      return undefined;
  }
};

const pixelate = (value?: number) =>
  value || value === 0 ? `${value}px` : undefined;

/**
 * Gets the styles for an image
 */
export const getStyle = <
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = Record<string, string>,
>({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  background,
}: Pick<
  UnpicImageProps<TImageAttributes, TStyle>,
  "width" | "height" | "aspectRatio" | "layout" | "objectFit" | "background"
>): TImageAttributes["style"] => {
  const styleEntries: Array<[prop: string, value: string | undefined]> = [
    ["object-fit", objectFit],
  ];

  // If background is a URL, set it to cover the image and not repeat
  if (
    background?.startsWith("https:") ||
    background?.startsWith("http:") ||
    background?.startsWith("data:")
  ) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : undefined,
    ]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : undefined,
    ]);
    styleEntries.push(["height", pixelate(height)]);
  }

  return Object.fromEntries(
    styleEntries.filter(([, value]) => value),
  ) as TImageAttributes["style"];
};

// Common screen widths. These will be filtered
// according to the image size and layout
export const DEFAULT_RESOLUTIONS = [
  6016, // 6K
  5120, // 5K
  4480, // 4.5K
  3840, // 4K
  3200, // QHD+
  2560, // WQXGA
  2048, // QXGA
  1920, // 1080p
  1668, // Various iPads
  1280, // 720p
  1080, // iPhone 6-8 Plus
  960, // older horizontal phones
  828, // iPhone XR/11
  750, // iPhone 6-8
  640, // older and lower-end phones
];

// Width of the blurred, low-res image
const LOW_RES_WIDTH = 24;

/**
 * Gets the breakpoints for an image, based on the layout and width
 */
export const getBreakpoints = ({
  width,
  layout,
  resolutions = DEFAULT_RESOLUTIONS,
}: {
  width?: number;
  layout: Layout;
  resolutions?: Array<number>;
}): number[] => {
  if (layout === "fullWidth") {
    return resolutions;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...resolutions.filter((w) => w < doubleWidth),
    ];
  }

  return [];
};

/**
 * Generate an image srcset
 */
export const getSrcSet = ({
  src,
  width,
  layout = "constrained",
  height,
  aspectRatio,
  breakpoints,
  cdn,
  transformer,
  format,
}: Omit<ImageSourceOptions, "src"> & { src: URL | string; format?: string }):
  | string
  | undefined => {
  const canonical = getCanonicalCdnForUrl(src, cdn);

  if (canonical && !transformer) {
    transformer = getTransformer(canonical.cdn);
  }

  if (!transformer) {
    return;
  }
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints
    .sort((a, b) => a - b)
    .map((bp) => {
      let transformedHeight;
      if (height && aspectRatio) {
        transformedHeight = Math.round(bp / aspectRatio);
      }
      // Not sure why TS isn't narrowing the type here
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const transformed = transformer!({
        url: canonical ? canonical.url : src,
        width: bp,
        height: transformedHeight,
        format,
      });
      if (transformed) {
        return `${transformed.toString()} ${bp}w`;
      }
      return "";
    })
    .join(",\n");
};

export function transformSharedProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = Record<string, string>,
>({
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  ...props
}: UnpicImageProps<TImageAttributes, TStyle>): UnpicImageProps<
  TImageAttributes,
  TStyle
> &
  Pick<TImageAttributes, "srcset" | "style"> {
  width = (width && Number(width)) || undefined;
  height = (height && Number(height)) || undefined;

  // High priority images should be loaded eagerly
  if (priority) {
    props.loading ||= "eager";
    props.fetchpriority ||= "high";
  } else {
    // Otherwise use native lazy loading and async decoding
    props.loading ||= "lazy";
    props.decoding ||= "async";
  }

  // If the user has set the alt attribute to an empty string and not set
  // the role, we assume the image is decorative and set it to presentation
  if (props.alt === "") {
    props.role ||= "presentation";
  }

  // Calculate dimensions from aspect ratio
  if (aspectRatio) {
    if (width) {
      if (height) {
        logError("Ignoring aspectRatio because width and height are both set");
      } else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = height * aspectRatio;
    } else if (layout !== "fullWidth") {
      // Fullwidth images have 100% width, so aspectRatio is applicable
      logError(
        "When aspectRatio is set, either width or height must also be set",
      );
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== "fullWidth") {
    // Fullwidth images don't need dimensions
    logError("Either aspectRatio or both width and height must be set");
  }
  return {
    width,
    height,
    aspectRatio,
    layout,
    ...props,
  } as UnpicImageProps<TImageAttributes, TStyle>;
}

/**
 * Generates the props for an img element
 */
export function transformProps<
  TImageAttributes extends CoreImageAttributes<TStyle>,
  TStyle = Record<string, string>,
>(props: UnpicImageProps<TImageAttributes, TStyle>): TImageAttributes {
  /* eslint-disable prefer-const */
  let {
    src,
    cdn,
    transformer,
    background,
    layout,
    objectFit,
    breakpoints,
    width,
    height,
    aspectRatio,
    unstyled,
    ...transformedProps
  } = transformSharedProps(props);
  /* eslint-enable prefer-const */

  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : undefined;
  let url: URL | string = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }

  // Auto-generate a low-res image for blurred placeholders
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio
      ? Math.round(LOW_RES_WIDTH / aspectRatio)
      : undefined;
    const lowResImage = transformer({
      url,
      width: LOW_RES_WIDTH,
      height: lowResHeight,
    });
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }

  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background,
  } as Pick<
    UnpicImageProps<TImageAttributes, TStyle>,
    "width" | "height" | "aspectRatio" | "layout" | "objectFit" | "background"
  >;

  if (transformer) {
    transformedProps.sizes ||= getSizes(width, layout);
    if (!unstyled) {
      transformedProps.style = {
        ...getStyle<TImageAttributes, TStyle>(styleProps),
        ...transformedProps.style,
      };
    }
    transformedProps.srcset = getSrcSet({
      src: url,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      cdn,
    });

    const transformed = transformer({ url, width, height });

    if (transformed) {
      url = transformed;
    }

    if (layout === "fullWidth" || layout === "constrained") {
      width = undefined;
      height = undefined;
    }
  }

  if (!url) {
    logError("No URL provided for image");
  }

  return {
    ...transformedProps,
    src: url?.toString(),
    width,
    height,
  } as TImageAttributes;
}

export function normalizeImageType(type?: string | null): {
  format?: string;
  mimeType?: string;
} {
  if (!type) {
    return {};
  }
  if (type.startsWith("image/")) {
    return {
      format: type.slice(6),
      mimeType: type,
    };
  }

  return {
    format: type,
    mimeType: `image/${type === "jpg" ? "jpeg" : type}`,
  };
}
/**
 * Generates the props for a `<source>` element
 */
export function transformSourceProps<
  TSourceAttributes extends CoreSourceAttributes,
>({ media, type, ...props }: UnpicSourceProps): TSourceAttributes {
  /* eslint-disable prefer-const, @typescript-eslint/no-unused-vars */
  let {
    src,
    cdn,
    transformer,
    layout,
    breakpoints,
    width,
    height,
    aspectRatio,
    sizes,
    loading,
    decoding,
    ...rest
  } = transformSharedProps(props);
  /* eslint-enable prefer-const, @typescript-eslint/no-unused-vars */

  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : undefined;
  let url: URL | string = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }

  if (!transformer) {
    return {} as TSourceAttributes;
  }

  const { format, mimeType } = normalizeImageType(type);

  sizes ||= getSizes(width, layout);

  const srcset = getSrcSet({
    src: url,
    width,
    height,
    aspectRatio,
    layout,
    breakpoints,
    transformer,
    cdn,
    format,
  });

  const transformed = transformer({ url, width, height });

  if (transformed) {
    url = transformed;
  }

  const returnObject = {
    ...rest,
    sizes,
    srcset,
  } as TSourceAttributes;

  if (media) {
    if (DEBUG) {
      try {
        parse(media);
        returnObject.media = media;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        logError(e.message);
      }
    } else {
      returnObject.media = media;
    }
  }

  if (mimeType) {
    returnObject.type = mimeType;
  }
  return returnObject;
}
