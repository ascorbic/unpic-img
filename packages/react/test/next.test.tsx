import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Image } from "../src/next";
import {
  expectPropsToMatchTransformed,
  testCases,
} from "../../../test/test-helpers";

describe("the Next.js component", () => {
  for (const props of testCases) {
    test(`renders a ${props.layout} image`, () => {
      render(<Image {...props} />);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      console.log(img.src);
      expect(img.src).toMatch(/^https:\/\//);
      expectPropsToMatchTransformed(img, { ...props, cdn: "nextjs" });
    });
  }

  test(`renders a non-CDN image with the next/image handler`, () => {
    const props = {
      ...testCases[1],
      src: "https://example.com/image.png",
    };

    render(<Image {...props} />);
    const img = screen.getByAltText<HTMLImageElement>(props.alt);
    expect(img).toBeTruthy();
    expect(img.src).toMatch(/\/_next\/image\?url=https%3A%2F%2Fexample.com/);
  });

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
    expectPropsToMatchTransformed(img, { ...props, cdn: "nextjs" });
  });
});
