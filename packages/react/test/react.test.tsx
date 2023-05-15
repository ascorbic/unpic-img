import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Image } from "../src";
import {
  expectPropsToMatchTransformed,
  testCases,
} from "../../../test/test-helpers";

describe("the React component", () => {
  for (const props of testCases) {
    test(`renders a ${props.layout} image`, () => {
      render(<Image {...props} />);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectPropsToMatchTransformed(img, props);
    });
  }

  test(`renders an image with data and aria attributes`, () => {
    const props = {
      "aria-label": "A cool image",
      "data-foo": "bar",
      "data-ok": true,
      ...testCases[0],
    };

    render(<Image {...props} />);
    const img = screen.getByAltText<HTMLImageElement>(props.alt);
    expect(img).toBeTruthy();
    expect(img.dataset.foo).toBe("bar");
    expect(img.dataset.ok).toBe("true");
    expect(img.getAttribute("aria-label")).toBe("A cool image");
    expectPropsToMatchTransformed(img, props);
  });
});
