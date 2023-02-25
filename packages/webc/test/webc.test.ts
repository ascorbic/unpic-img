import { describe, test } from "vitest";
import { WebC } from "@11ty/webc";
import { join } from "path";
import { JSDOM } from "jsdom";
import {
  testCases,
  expectPropsToMatchTransformed,
} from "../../../test/test-helpers";

function generateWebCTag(
  name: string,
  attributes: Record<string, string | number | boolean>
) {
  const attr = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  return `<${name} ${attr}></${name}>`;
}

describe("the WebC component", async () => {
  const page = new WebC();
  page.defineComponents([join(__dirname, "../unpic-img.webc")]);

  const tags = testCases
    .map((props) => generateWebCTag("unpic-img", props))
    .join("\n");
  page.setContent(tags);

  const { html } = await page.compile();
  const dom = new JSDOM(html);
  const imgs = dom.window.document.querySelectorAll("img");

  for (const idx in testCases) {
    test(`renders a ${testCases[idx]} image`, async () => {
      expectPropsToMatchTransformed(
        imgs[idx] as HTMLImageElement,
        testCases[idx]
      );
    });
  }
});
