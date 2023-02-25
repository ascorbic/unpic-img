import { describe, test } from "vitest";
import { WebC } from "@11ty/webc";
import { join } from "path";
import { JSDOM } from "jsdom";

describe("the WebC component", () => {
  test("should render", async () => {
    const page = new WebC();
    page.defineComponents([join(__dirname, "../unpic-img.webc")]);
    page.setContent(/* html */ `
<unpic-img
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  height="600"
  width="800"
  alt="yes"
  layout="constrained"
>
</unpic-img>

`);
    const { html } = await page.compile();

    const dom = new JSDOM(html);

    console.log(dom.window.document.querySelector("img").src);
  });
});
