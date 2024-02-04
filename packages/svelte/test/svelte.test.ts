import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { Image, Source } from "../src/lib";
import {
  expectPropsToMatch,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers";
import {
  type UnpicImageProps,
  type CoreImageAttributes,
  transformProps,
} from "@unpic/core";

export function expectImagePropsToMatchTransformed(
  image: HTMLImageElement,
  providedProps: UnpicImageProps<CoreImageAttributes<CSSStyleDeclaration>>,
) {
  // Svelte doesn't support the fetchpriority attribute, so we need to remove it
  const { fetchpriority, ...expected } = transformProps(providedProps);

  expectPropsToMatch(expected, image);
}

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
});
