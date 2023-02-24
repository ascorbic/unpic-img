import { describe, test, expect } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { Image } from "../src";
import {
  expectPropsToMatchTransformed,
  testCases,
} from "../../../test/test-helpers";

describe("the Qwik component", async () => {
  for (const props of testCases) {
    const { screen, render } = await createDOM();
    // Skip until https://github.com/BuilderIO/qwik/pull/3135 is released
    test.skip(`renders a ${props.layout} image`, async () => {
      await render(<Image {...props} id={props.layout} />);
      const img = screen.querySelector<HTMLImageElement>(`#${props.layout}`);

      expect(img).toBeTruthy();

      expectPropsToMatchTransformed(img!, props);
    });
  }
});
