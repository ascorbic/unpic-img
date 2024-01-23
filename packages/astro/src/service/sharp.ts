import type { LocalImageService } from "astro";
import baseService from "./base.ts";
import sharpImageService from "astro/assets/services/sharp";
import type { UnpicConfig } from "../service.ts";

const service: LocalImageService<UnpicConfig> = {
  ...baseService,
  transform: sharpImageService.transform,
  parseURL: sharpImageService.parseURL,
};

export default service;
