import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { Image, Source } from "../src/lib";
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers";

describe("the Svelte component", () => {
  for (const props of imgTestCases) {
    test(`renders a ${props.layout} image`, () => {
      render(Image, { props });
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }

  for (const props of sourceTestCases) {
    test(`renders a picture with ${props.layout} source`, () => {
      props["data-testid"] = "testimg";
      render(Source, { props });
      const source = screen.getByTestId<HTMLSourceElement>("testimg");
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source, props);
    });
  }

  test("filters out event handlers to prevent CSP violations", () => {
    const props = {
      src: "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
      layout: "constrained" as const,
      width: 800,
      height: 600,
      alt: "Test image",
      onload: "console.log('loaded')",
      onerror: "console.log('error')",
    };
    render(Image, { props });
    const img = screen.getByAltText<HTMLImageElement>("Test image");
    expect(img).toBeTruthy();
    // Verify event handlers are not present as attributes
    expect(img.getAttribute("onload")).toBeNull();
    expect(img.getAttribute("onerror")).toBeNull();
  });
});
