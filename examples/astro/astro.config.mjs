import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  trailingSlash: "always",
  image: {
    service: imageService({
      placeholder: "blurhash",
    }),
  },
});
