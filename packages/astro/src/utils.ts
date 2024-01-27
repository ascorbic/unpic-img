import type { UnpicConfig } from "./service";
import { getDefaultService } from "./service/base";
import type { ImageCdn } from "unpic";

export function getDefaultImageCdn(config: UnpicConfig): ImageCdn {
  if (
    config?.fallbackService === "squoosh" ||
    config?.fallbackService === "sharp"
  ) {
    return "astro";
  }
  return config.fallbackService ?? getDefaultService();
}
