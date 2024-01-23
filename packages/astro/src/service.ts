import { type ImageCdn, type CdnOptions } from "unpic";
import { fileURLToPath } from "node:url";
import { getDefaultService } from "./service/base";
export interface UnpicConfig {
  /**
   * The image service to use for local images and when the CDN can't be
   * determined from the image src. Value can be any supported image CDN,
   * or "sharp" or "squoosh" to use the local image service.
   * By default it will either use the local "sharp" service, or will
   * try to detect available services based on the environment.
   * Env detection works on Netlify and Vercel.
   */
  fallbackService?: ImageCdn | "sharp" | "squoosh";
  /**
   * CDN-specific options.
   */
  cdnOptions?: CdnOptions;
}

/**
 * ALPHA: This API is experimental and subject to change.
 */
export function imageService(config: UnpicConfig = {}) {
  const service = config.fallbackService ?? getDefaultService();
  let entrypoint = "./service/base.ts";
  if (service === "sharp" || service === "astro") {
    entrypoint = "./service/sharp.ts";
  } else if (service === "squoosh") {
    entrypoint = "./service/squoosh.ts";
  }

  return {
    entrypoint: fileURLToPath(new URL(entrypoint, import.meta.url)),
    config,
  };
}
