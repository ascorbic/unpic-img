import { describe, test, expect } from "vitest";
import { Image } from "../src/index.js";
import PictureTestWrapper from "./PictureTestWrapper.astro";
import baseImageService from "../src/service/base.js";
import { render } from "./astro-testing-library.js";
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers.js";

describe("the Astro component", () => {
  for (const props of imgTestCases) {
    test(`renders a ${props.layout} image`, async () => {
      const { getByAltText } = await render(Image, {
        props,
      });
      const img = getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }
  for (const props of sourceTestCases) {
    test(`renders a picture with ${props.layout} source`, async () => {
      const { getByTestId } = await render(PictureTestWrapper, {
        props,
      });
      const source = getByTestId<HTMLSourceElement>("testimg");
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source, props);
    });
  }
});

describe("the Astro image service", () => {
  describe("base", () => {
    test("getHTMLAttributes returns style as a string, not an object", async () => {
      const attrs = baseImageService.getHTMLAttributes(
        {
          src: {
            src: "/@fs/path/to/image.jpg",
            width: 800,
            height: 600,
            format: "jpg",
          },
          width: 800,
          height: 600,
        },
        {
          endpoint: {
            route: "/_image",
          },
          service: {
            entrypoint: "/path/to/service/base.ts",
            config: {},
          },
          domains: [],
          remotePatterns: [],
        },
      );

      // The style should be a string, not an object
      // When it's an object, Astro markdown renders it as "[object Object]"
      expect(attrs.style).toBeDefined();
      expect(typeof attrs.style).toBe("string");
      expect(attrs.style).not.toBe("[object Object]");
      expect(attrs.style).toContain("object-fit");
    });

    test("respects trailingSlash: always", async () => {
      const url = await baseImageService.getURL(
        {
          src: {
            src: "/@fs/path/to/image.jpg",
            width: 800,
            height: 800,
            format: "jpg",
          },
        },
        {
          endpoint: {
            route: "/_image/",
          },
          service: {
            entrypoint: "/path/to/service/base.ts",
            config: {},
          },
          domains: [],
          remotePatterns: [],
        },
      );

      expect(url).toContain("/_image/");
    });
  });
});
