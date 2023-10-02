import { describe, test, expect } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { Image, Source } from "../src";
import {
  expectImagePropsToMatchTransformed,
  expectSourcePropsToMatchTransformed,
  imgTestCases,
  sourceTestCases,
} from "../../../test/test-helpers";
import { render } from "@builder.io/qwik";

describe("the Qwik component", async () => {
  for (const props of imgTestCases) {
    const { screen, render } = await createDOM();
    test(`renders a ${props.layout} image`, async () => {
      await render(<Image {...props} id={props.layout} />);
      const img = screen.querySelector<HTMLImageElement>(`#${props.layout}`);

      expect(img).toBeTruthy();

      expectImagePropsToMatchTransformed(img!, props);
    });
  }

  for (const props of sourceTestCases) {
    const { screen, render } = await createDOM();

    test(`renders a picture with ${props.layout} source`, async () => {
      await render(<Source id={props.layout} {...props} />);
      const source = screen.querySelector<HTMLSourceElement>(
        `#${props.layout}`,
      );
      expect(source).toBeTruthy();
      expectSourcePropsToMatchTransformed(source!, props);
    });
  }
});
