import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { Image } from "../src/lib";
import type { SvelteComponent } from "svelte";
import {
  expectPropsToMatchTransformed,
  testCases,
} from "../../../test/test-helpers";

describe("the Svelte component", () => {
  for (const props of testCases) {
    test(`renders a ${props.layout} image`, () => {
      // @ts-expect-error - This works and is in the docs, but the types are wrong
      render<SvelteComponent>(Image, { props });
      const img = screen.getByAltText<HTMLImageElement>(props.alt);
      expect(img).toBeTruthy();
      expectPropsToMatchTransformed(img, props);
    });
  }
});
