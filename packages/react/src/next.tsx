import { useContext, forwardRef, useMemo } from "react";
import type { ImageProps as UnpicImageProps } from "./index";
import type { ImageConfigComplete } from "next/dist/shared/lib/image-config";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Image as UnpicImage } from "./index";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context";
import { getImageCdnForUrl } from "unpic";

//
const configEnv = process.env
  .__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete;

// Next.js lets you directly import or require images.
// In this case, the src is an object with the image data.
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

interface StaticRequire {
  default: StaticImageData;
}

type StaticImport = StaticRequire | StaticImageData;

// Next.js allows a string or an object with the image data
export type ImageProps = Omit<UnpicImageProps, "src"> & {
  src: string | StaticImport;
};

// Next.js allows various different shapes of the src prop
function getImageData(src: string | StaticImport): StaticImageData | void {
  if (typeof src === "string") {
    return;
  }
  if ("default" in src) {
    return src.default;
  }
  return src;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  props,
  ref
) {
  // If using the next/image server we can only serve images with
  // the same breakpoints as those in the config

  const configContext = useContext(ImageConfigContext);
  const breakpoints = useMemo(() => {
    const config = configEnv || configContext || imageConfigDefault;
    return [...config.deviceSizes, ...config.imageSizes];
  }, [configContext]);

  const { src: origSrc, ...rest } = props;

  // We need to cast this here because otherwise TS gets confused
  // with the layout/diemnsions inference
  const childProps = rest as UnpicImageProps;

  const imageData = getImageData(origSrc);

  // Users can pass either a string or the result of an import
  const src: string = imageData?.src || (origSrc as string);

  if (imageData && props.layout !== "fullWidth") {
    // If the user didn't specify a width or height, we can use the
    // width and height from the image data

    if (!childProps.width) {
      if (childProps.height) {
        childProps.width = childProps.aspectRatio
          ? childProps.height * childProps.aspectRatio
          : childProps.height * (imageData.width / imageData.height);
      } else {
        childProps.width = imageData.width;
      }
    }
    if (!childProps.height) {
      if (childProps.width) {
        childProps.height = childProps.aspectRatio
          ? childProps.width / childProps.aspectRatio
          : childProps.width * (imageData.height / imageData.width);
      } else {
        childProps.height = imageData.height;
      }
    }
  }

  childProps.background ||= imageData?.blurDataURL;

  const cdn = useMemo(() => {
    if (src?.startsWith("/")) {
      return "nextjs";
    }
    return getImageCdnForUrl(src);
  }, [src]);

  // Other image CDNs can use normal Unpic breakpoints
  if (cdn && cdn !== "nextjs" && cdn !== "vercel") {
    return <UnpicImage {...childProps} src={src} ref={ref} />;
  }
  return (
    <UnpicImage
      {...childProps}
      src={src}
      ref={ref}
      breakpoints={breakpoints}
      cdn="nextjs"
    />
  );
});
