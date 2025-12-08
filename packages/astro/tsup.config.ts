import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: {
    compilerOptions: {
      noCheck: true,
    },
  },
  clean: true,
  bundle: false,
  external: [
    // Keep Astro component as external, since Astro will take care of them
    /.*\.astro$/,
  ],
});
