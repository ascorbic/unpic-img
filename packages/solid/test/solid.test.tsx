import { describe, test, expect } from "vitest";
import { render, screen } from "solid-testing-library";
import { Image } from "../src";
import {
  expectPropsToMatchTransformed,
  testCases,
} from "../../../test/test-helpers";

describe("the Solid component", () => {
  for (const props of testCases) {
    test(`renders a ${props.layout} image`, () => {
      render(() => <Image {...props} />);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectPropsToMatchTransformed(img, props);
    });
  }
});
