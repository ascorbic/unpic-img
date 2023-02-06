import type { JSX } from "@builder.io/mitosis/jsx-runtime";
import {
  getTransformerForCdn,
  getTransformerForUrl,
  ImageCdn,
  UrlTransformer,
} from "unpic";

export type Layout = "fixed" | "constrained" | "fullWidth";

export interface ImageSourceOptions {
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  layout: Layout;
  breakpoints?: number[];
  transformer?: UrlTransformer;
  cdn?: ImageCdn;
}

export const getSizes = (
  width?: number,
  layout?: Layout
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

const removeUndefined = (obj: Record<string, string | undefined>) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

const pixelate = (value?: number) =>
  value || value === 0 ? `${value}px` : undefined;
export const getStyle = <TImageAttributes extends CoreImageAttributes>({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
}: Pick<
  UnpicImageProps<TImageAttributes>,
  "width" | "height" | "aspectRatio" | "layout" | "objectFit"
>): TImageAttributes["style"] => {
  if (layout === "fixed") {
    return removeUndefined({
      objectFit,
      width: pixelate(width),
      height: pixelate(height),
    });
  }
  if (layout === "constrained") {
    return removeUndefined({
      objectFit,
      maxWidth: pixelate(width),
      maxHeight: pixelate(height),
      aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      width: "100%",
    });
  }
  if (layout === "fullWidth") {
    return removeUndefined({
      objectFit,
      width: "100%",
      aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      height: pixelate(height),
    });
  }
  return {};
};

const DEFAULT_RESOLUTIONS = [
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

export const getBreakpoints = ({
  width,
  layout,
}: {
  width?: number;
  layout: Layout;
}): number[] => {
  if (layout === "fullWidth") {
    return DEFAULT_RESOLUTIONS;
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
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...DEFAULT_RESOLUTIONS.filter((w) => w < doubleWidth),
    ];
  }

  return [];
};

export const getSrcSet = ({
  src,
  width,
  layout,
  height,
  aspectRatio,
  breakpoints,
  cdn,
  transformer,
}: ImageSourceOptions): string | undefined => {
  transformer ||= cdn ? getTransformerForCdn(cdn) : getTransformerForUrl(src);

  if (!transformer) {
    return;
  }
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints
    .map((bp) => {
      let transformedHeight;
      if (height && aspectRatio) {
        transformedHeight = Math.round(bp * aspectRatio);
      }
      // Not sure why TS isn't narrowing the type here
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const transformed = transformer!({
        url: src,
        width: bp,
        height: transformedHeight,
      });
      if (transformed) {
        return `${transformed.toString()} ${bp}w`;
      }
      return "";
    })
    .join(",\n");
};

/**
 * HTML image attributes, common to the different JSX image components
 */
export interface CoreImageAttributes<TCSS = Record<string, string>> {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  style?: TCSS;
  srcset?: string;
  role?: string;
  sizes?: string;
  fetchpriority?: "high" | "low" | "auto";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export type BaseImageProps<TImageAttributes extends CoreImageAttributes> =
  Exclude<TImageAttributes, "srcset" | "style"> &
    ImageSourceOptions & {
      priority?: boolean;
      fetchpriority?: "high" | "low";
      objectFit?:
        | "contain"
        | "cover"
        | "fill"
        | "none"
        | "scale-down"
        | "inherit"
        | "initial";
    };

type BaseImageWithAspectRatioProps<
  TImageAttributes extends CoreImageAttributes
> = BaseImageProps<TImageAttributes> & {
  aspectRatio: number;
};

type ImageWithAspectRatioAndWidthProps<
  TImageAttributes extends CoreImageAttributes
> = BaseImageWithAspectRatioProps<TImageAttributes> & {
  width: number;
};

type ImageWithAspectRatioAndHeightProps<
  TImageAttributes extends CoreImageAttributes
> = BaseImageWithAspectRatioProps<TImageAttributes> & {
  height: number;
};

type ImageWithWidthAndHeightProps<
  TImageAttributes extends CoreImageAttributes
> = BaseImageProps<TImageAttributes> & {
  width: number;
  height: number;
};

type ImageWithSizeProps<TImageAttributes extends CoreImageAttributes> =
  | ImageWithAspectRatioAndWidthProps<TImageAttributes>
  | ImageWithAspectRatioAndHeightProps<TImageAttributes>
  | ImageWithWidthAndHeightProps<TImageAttributes>;

export type FixedImageProps<TImageAttributes extends CoreImageAttributes> =
  ImageWithSizeProps<TImageAttributes> & {
    layout: "fixed";
  };

export type ConstrainedImageProps<
  TImageAttributes extends CoreImageAttributes
> = ImageWithSizeProps<TImageAttributes> & {
  layout: "constrained";
};

export type FullWidthImageProps<TImageAttributes extends CoreImageAttributes> =
  BaseImageProps<TImageAttributes> & {
    layout: "fullWidth";
    width?: never;
  };

export type UnpicImageProps<TImageAttributes extends CoreImageAttributes> =
  | FixedImageProps<TImageAttributes>
  | ConstrainedImageProps<TImageAttributes>
  | FullWidthImageProps<TImageAttributes>;

export function transformProps<TImageAttributes extends CoreImageAttributes>({
  src,
  width,
  height,
  priority,
  layout,
  aspectRatio,
  cdn,
  transformer,
  objectFit = "cover",
  ...props
}: UnpicImageProps<TImageAttributes>): TImageAttributes {
  transformer ||= cdn ? getTransformerForCdn(cdn) : getTransformerForUrl(src);

  if (priority) {
    props.loading ||= "eager";
    props.fetchpriority ||= "high";
  } else {
    props.loading ||= "lazy";
    props.decoding ||= "async";
  }

  if (props.alt === "") {
    props.role ||= "presentation";
  }

  if (aspectRatio) {
    if (width) {
      if (height) {
        console.error(
          "Ignoring aspectRatio because width and height are both set"
        );
      } else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = height * aspectRatio;
    } else {
      console.error(
        "When aspectRatio is set, either width or height must also be set"
      );
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else {
    console.error("Either aspectRatio or both width and height must be set");
  }

  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
  } as Pick<
    UnpicImageProps<TImageAttributes>,
    "width" | "height" | "aspectRatio" | "layout" | "objectFit"
  >;

  if (transformer) {
    props.sizes ||= getSizes(width, layout);
    props.style = {
      ...getStyle(styleProps),
      ...props.style,
    };

    const transformed = transformer({ url: src, width, height });
    if (transformed) {
      src = transformed.toString();
    }

    props.srcset ||= getSrcSet({
      src,
      width,
      height,
      aspectRatio,
      layout,
    });

    if (layout === "fullWidth" || layout === "constrained") {
      width = undefined;
      height = undefined;
    }
  }

  return {
    ...props,
    src,
    width,
    height,
  } as TImageAttributes;
}
