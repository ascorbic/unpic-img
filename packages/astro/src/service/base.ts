import {
  inferImageDimensions,
  transformProps,
  type UnpicImageProps,
} from "@unpic/core";
import type { ExternalImageService, ImageTransform } from "astro";
import type { UnpicConfig } from "../service.ts";
import { transformUrl, type ImageCdn } from "unpic";
import { env } from "node:process";

/**
 * Tries to detect a default image service based on the environment.
 */
export function getDefaultService(): ImageCdn {
  if (env.NETLIFY || env.NETLIFY_LOCAL) {
    return "netlify";
  }
  if (env.VERCEL || env.NOW_BUILDER) {
    return "vercel";
  }
  return "astro";
}

function getCdn(imageConfig: UnpicConfig): ImageCdn {
  if (
    !imageConfig.fallbackService ||
    imageConfig.fallbackService === "sharp" ||
    imageConfig.fallbackService === "squoosh"
  ) {
    return getDefaultService();
  }
  return imageConfig.fallbackService;
}

const service: ExternalImageService<UnpicConfig> = {
  getURL(options, imageConfig) {
    const cdn = getCdn(imageConfig.service.config);
    if (typeof options.src === "string") {
      return (
        transformUrl({
          cdn,
          ...options,
          url: options.src,
        })?.toString() ?? ""
      );
    }
    const dimensions = inferImageDimensions(options, options.src);
    return (
      transformUrl({
        cdn,
        ...options,
        ...dimensions,
        url: options.src.src,
      })?.toString() ?? ""
    );
  },
  getHTMLAttributes(options: ImageTransform, imageConfig) {
    const cdn = getCdn(imageConfig.service.config);
    console.log(options);
    if (typeof options.src !== "string") {
      const dimensions = inferImageDimensions(options, options.src);
      const { src, ...props } = transformProps({
        cdn,
        ...options,
        ...dimensions,
        src: options.src.src,
      } as UnpicImageProps<astroHTML.JSX.ImgHTMLAttributes>);
      return props;
    } else {
      const { src, ...props } = transformProps({
        cdn,
        ...options,
      } as UnpicImageProps<astroHTML.JSX.ImgHTMLAttributes>);
      return props;
    }
  },
};

export default service;
