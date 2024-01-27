import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  image: {
    service: imageService({
      placeholder: "blurhash",
    }),
  },
});
