// @vitest-environment node
import { describe, test, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Image } from "../index.js";
import PictureTestWrapper from "./PictureTestWrapper.astro";
import { getByAltText, getByTestId } from "@testing-library/dom";
import { JSDOM } from "jsdom";

import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers.js";

let container: AstroContainer;

describe("the Astro component", () => {
  beforeAll(async () => {
    container = await AstroContainer.create();
  });
  for (const props of imgTestCases) {
    test(`renders a ${props.layout} image`, async () => {
      const html = await container.renderToString(Image, { props });
      const dom = new JSDOM(html);
      const img = getByAltText<HTMLImageElement>(
        dom.window.document as unknown as HTMLElement,
        props.alt,
      );
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }
  for (const props of sourceTestCases) {
    test(`renders a picture with ${props.layout} source`, async () => {
      const html = await container.renderToString(PictureTestWrapper, {
        props,
      });
      const dom = new JSDOM(html);

      const source = getByTestId<HTMLSourceElement>(
        dom.window.document as unknown as HTMLElement,
        "testimg",
      );
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source, props);
    });
  }
});
