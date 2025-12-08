import type { LocalImageService } from "astro";
import baseService from "./base.js";
// @ts-expect-error this image service was removed in 5.0
import squooshImageService from "astro/assets/services/squoosh";
import type { UnpicConfig } from "../service.js";

// TODO: remove in the next major
const service: LocalImageService<UnpicConfig> = {
  ...baseService,
  transform: squooshImageService.transform,
  parseURL: squooshImageService.parseURL,
};

export default service;
