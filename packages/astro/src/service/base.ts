import {
  getSrcSetEntries,
  inferImageDimensions,
  normalizeImageType,
  transformProps,
  type ConstrainedImageProps,
} from "@unpic/core";
import type { ExternalImageService, ImageTransform } from "astro";
import type { UnpicConfig } from "../service.ts";
import { transformUrl, type ImageCdn, type UrlTransformerOptions } from "unpic";
import { env } from "node:process";
import { getEndpointOptions } from "../utils.ts";

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

function getTransformOptions(
  options: ImageTransform,
  unpicConfig: UnpicConfig,
): UrlTransformerOptions & ImageTransform {
  const cdn = getCdn(unpicConfig);
  const { widths: breakpoints, densities, ...transform } = options;
  if (typeof options.src !== "string") {
    return {
      cdn,
      ...transform,
      ...inferImageDimensions(options, options.src),
      url: options.src.src,
    };
  } else {
    return {
      cdn,
      ...transform,
      url: options.src,
    };
  }
}

const service: ExternalImageService<UnpicConfig> = {
  getSrcSet(options, imageConfig) {
    const attributes = options.format
      ? { type: normalizeImageType(options.format) }
      : undefined;

    const transformOptions = getTransformOptions(
      options,
      imageConfig.service.config,
    );

    const cdnOptions = getEndpointOptions(imageConfig);
    const entries = getSrcSetEntries({
      ...transformOptions,
      cdnOptions,
      src: transformOptions.url,
    });
    return entries.map(({ width, height }) => ({
      transform: {
        ...options,
        width,
        height,
      },
      descriptor: `${width}w`,
      attributes,
    }));
  },
  validateOptions(options) {
    if (options.densities) {
      console.warn(
        "The densities option is not supported by the unpic image service",
      );
    }
    return options;
  },
  getURL(options, imageConfig) {
    const transformOptions = getTransformOptions(
      options,
      imageConfig.service.config,
    );
    transformOptions.cdnOptions = getEndpointOptions(
      imageConfig,
      transformOptions.cdnOptions,
    );
    return transformUrl(transformOptions)?.toString() ?? "";
  },
  getHTMLAttributes(options: ImageTransform, imageConfig) {
    const transformOptions = getTransformOptions(
      options,
      imageConfig.service.config,
    );
    // We omit src and srcset because they're handled by other hooks
    const { src, srcset, ...props } = transformProps({
      ...transformOptions,
      src: transformOptions.url.toString(),
    } as ConstrainedImageProps<
      astroHTML.JSX.ImgHTMLAttributes,
      astroHTML.JSX.ImgHTMLAttributes["style"]
    >);
    return props;
  },
};

export default service;
