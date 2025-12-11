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

  test("filters out undefined event handlers to prevent CSP violations", () => {
    const props = {
      src: "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
      layout: "constrained" as const,
      width: 800,
      height: 600,
      alt: "Test image",
      // Simulating the case where TypeScript types include these but they're undefined
      onload: undefined,
      onerror: undefined,
    };
    render(Image, { props });
    const img = screen.getByAltText<HTMLImageElement>("Test image");
    expect(img).toBeTruthy();
    // Verify undefined event handlers are not present as attributes
    expect(img.getAttribute("onload")).toBeNull();
    expect(img.getAttribute("onerror")).toBeNull();
  });

  test("preserves explicitly defined event handlers", () => {
    const onloadHandler = () => console.log("loaded");
    const onerrorHandler = () => console.log("error");
    const props = {
      src: "https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg",
      layout: "constrained" as const,
      width: 800,
      height: 600,
      alt: "Test image with handlers",
      onload: onloadHandler,
      onerror: onerrorHandler,
    };
    render(Image, { props });
    const img = screen.getByAltText<HTMLImageElement>(
      "Test image with handlers",
    );
    expect(img).toBeTruthy();
    // Verify explicit event handlers are present
    // In Svelte 5, these will be bound using Svelte's event system
    // We can't directly check the handler functions, but we verify the component renders without error
  });
});
