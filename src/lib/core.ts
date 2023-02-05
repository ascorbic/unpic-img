import { JSX } from "@builder.io/mitosis/jsx-runtime";
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

const pixelate = (value?: number) =>
  value || value === 0 ? `${value}px` : undefined;
export const getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit,
}: Pick<
  UnpicImageProps,
  "width" | "height" | "aspectRatio" | "layout" | "objectFit"
>): JSX.CSS => {
  if (layout === "fixed") {
    return {
      objectFit,
      width: pixelate(width),
      height: pixelate(height),
    };
  }
  if (layout === "constrained") {
    return {
      objectFit,
      maxWidth: pixelate(width),
      maxHeight: pixelate(height),
      aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      width: "100%",
    };
  }
  if (layout === "fullWidth") {
    return {
      objectFit,
      width: "100%",
      aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      height: pixelate(height),
    };
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
      const transformed = transformer({
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

export type BaseImageProps = Exclude<
  JSX.ImgHTMLAttributes<HTMLImageElement>,
  "srcset" | "style"
> &
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

interface BaseImageWithAspectRatioProps extends BaseImageProps {
  aspectRatio: number;
}

interface ImageWithAspectRatioAndWidthProps
  extends BaseImageWithAspectRatioProps {
  width: number;
}

interface ImageWithAspectRatioAndHeightProps
  extends BaseImageWithAspectRatioProps {
  height: number;
}

interface ImageWithWidthAndHeightProps extends BaseImageProps {
  width: number;
  height: number;
}

type ImageWithSizeProps =
  | ImageWithAspectRatioAndWidthProps
  | ImageWithAspectRatioAndHeightProps
  | ImageWithWidthAndHeightProps;

export type FixedImageProps = ImageWithSizeProps & {
  layout: "fixed";
};

export type ConstrainedImageProps = ImageWithSizeProps & {
  layout: "constrained";
};

export type FullWidthImageProps = BaseImageProps & {
  layout: "fullWidth";
  width?: never;
};

export type UnpicImageProps =
  | FixedImageProps
  | ConstrainedImageProps
  | FullWidthImageProps;
export function transformProps({
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
}: UnpicImageProps): JSX.ImgHTMLAttributes<HTMLImageElement> {
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

  if (transformer) {
    props.sizes ||= getSizes(width, layout);
    props.style = {
      ...getStyle({ width, height, aspectRatio, layout, objectFit }),
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
  };
}
