import type { LocalImageService } from "astro";
import baseService from "./base";
import sharpImageService from "astro/assets/services/sharp";

const service: LocalImageService = {
  ...baseService,
  transform: sharpImageService.transform,
  parseURL: sharpImageService.parseURL,
};

export default service;
