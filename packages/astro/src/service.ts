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
   * This detection currently works on Netlify and Vercel.
   */
  fallbackService?: ImageCdn | "sharp" | "squoosh";

  /**
   * The default placeholder background to use for images.
   * Can be "blurhash", "dominantColor", "lqip", a data URI or a CSS color string.
   * Local images don't support "blurhash", "dominantColor" or "lqip", and will
   * not include a background unless a data URI or CSS color string is provided.
   * Default is no background.
   * Note that because the element uses no Javascript, the background will not
   * be removed when the image loads, so you should not use it for images that
   * have transparency.
   *
   * @see https://unpic.pics/placeholder
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  placeholder?: "blurhash" | "dominantColor" | "lqip" | (string & {});

  /**
   * The default layout to use for images. Defaults to "constrained".
   * @see https://unpic.pics/img/learn/#layouts
   */

  layout?: "constrained" | "fixed" | "fullWidth";

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
