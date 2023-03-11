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

export type ImageProps = UnpicImageProps & {
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
    return [...config.deviceSizes, ...config.imageSizes].sort((a, b) => a - b);
  }, [configContext]);

  const childProps: UnpicImageProps = { ...props };

  const imageData = getImageData(props.src);

  // Users can pass either a string or the result of an import
  const src = imageData?.src || props.src;

  if (imageData && props.layout !== "fullWidth") {
    // TODO: handle auto aspect-ratio
    childProps.width ||= imageData.width;
    childProps.height ||= imageData.height;
  }

  childProps.background ||= imageData?.blurDataURL;

  const cdn = useMemo(() => {
    if (src?.startsWith("/")) {
      return "nextjs";
    }
    getImageCdnForUrl(src);
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
