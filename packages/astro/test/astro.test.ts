import { describe, test, expect } from "vitest";
import { Image } from "../index.js";
import PictureTestWrapper from "./PictureTestWrapper.astro";
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
