import { describe, test, expect } from "vitest";
import { render, screen } from "solid-testing-library";
import { Image, Source } from "../src";
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers";

describe("the Solid component", () => {
  for (const props of imgTestCases) {
    test(`renders a ${props.layout} image`, () => {
      render(() => <Image {...props} />);
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectImagePropsToMatchTransformed(img, props);
    });
  }
  for (const props of sourceTestCases) {
    test(`renders a picture with ${props.layout} source`, () => {
      render(() => (
        <picture>
          <Source data-testid="testimg" {...props} />
        </picture>
      ));
      const source = screen.getByTestId<HTMLSourceElement>("testimg");
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source, props);
    });
  }
});
