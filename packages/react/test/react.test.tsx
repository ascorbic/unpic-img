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
});
