import type { UnpicConfig } from "./service";
import { getDefaultService } from "./service/base";
import type { CdnOptions, ImageCdn } from "unpic";
import type { AstroConfig } from "astro";

export function getDefaultImageCdn(config: UnpicConfig): ImageCdn {
  if (
    config?.fallbackService === "squoosh" ||
    config?.fallbackService === "sharp"
  ) {
    return "astro";
  }
  return config.fallbackService ?? getDefaultService();
}

export function getEndpointOptions(
  imageConfig: AstroConfig["image"],
  cdnOptions: CdnOptions = {},
): CdnOptions {
  cdnOptions.astro ??= {};
  cdnOptions.astro.endpoint =
    typeof imageConfig?.endpoint === "object"
      ? // The astro types are wrong here
        (imageConfig?.endpoint as any)?.route
      : imageConfig?.endpoint;

  return cdnOptions;
}
