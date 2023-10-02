import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Image, Source } from "../src";
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers";

describe("the React component", () => {
  for (const props of imgTestCases) {
    test(`renders a ${props.layout} image`, () => {
      render(<Image {...props} />);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }

  for (const props of sourceTestCases) {
    test(`renders a picture with ${props.layout} source`, () => {
      render(
        <picture>
          <Source data-testid="testimg" {...props} />
        </picture>,
      );
      const source = screen.getByTestId<HTMLSourceElement>("testimg");
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source, props);
    });
  }
  test(`renders an image with data and aria attributes`, () => {
    const props = {
      "aria-label": "A cool image",
      "data-foo": "bar",
      "data-ok": true,
      ...imgTestCases[0],
    };

    render(<Image {...props} />);
    const img = screen.getByAltText<HTMLImageElement>(props.alt);
    expect(img).toBeTruthy();
    expect(img.dataset.foo).toBe("bar");
    expect(img.dataset.ok).toBe("true");
    expect(img.getAttribute("aria-label")).toBe("A cool image");
    expectImagePropsToMatchTransformed(img, props);
  });
});
