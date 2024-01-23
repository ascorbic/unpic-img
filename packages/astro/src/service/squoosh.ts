import type { LocalImageService } from "astro";
import baseService from "./base.ts";
import squooshImageService from "astro/assets/services/squoosh";
import type { UnpicConfig } from "../service.ts";

const service: LocalImageService<UnpicConfig> = {
  ...baseService,
  transform: squooshImageService.transform,
  parseURL: squooshImageService.parseURL,
};

export default service;
