import type { UnpicConfig } from "./service";
import { getDefaultService } from "./service/base";
import type { ProviderOptions, ImageCdn } from "unpic";
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
  options: Partial<ProviderOptions> = {},
): Partial<ProviderOptions> {
  options.astro ??= {};
  options.astro.endpoint =
    typeof imageConfig?.endpoint === "object"
      ? // The astro types are wrong here
        (imageConfig?.endpoint as any)?.route
      : imageConfig?.endpoint;
  return options;
}
