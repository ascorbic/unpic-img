import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from "astro/container";
import { getQueriesForElement, prettyDOM, queries } from "@testing-library/dom";
import type { BoundFunctions, prettyFormat } from "@testing-library/dom";
import { JSDOM } from "jsdom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
export type DebugFn = (
  baseElement?: HTMLElement | HTMLElement[],
  maxLength?: number,
  options?: prettyFormat.OptionsReceived,
) => void;

export type Result = BoundFunctions<typeof queries> & {
  asFragment: () => string;
  baseElement: HTMLElement;
  debug: DebugFn;
};

let container: AstroContainer;

export async function render(
  component: AstroComponentFactory,
  options?: Omit<ContainerRenderOptions, "routeType">,
): Promise<Result> {
  if (!container) {
    container = await AstroContainer.create();
  }
  const html = await container.renderToString(component, options);
  const dom = new JSDOM(html);
  const element = dom.window.document.body;
  const queryHelpers = getQueriesForElement(element);

  return {
    ...queryHelpers,
    asFragment: () => element.innerHTML,
    baseElement: element,
    debug: (el = element, maxLength, options) =>
      Array.isArray(el)
        ? el.forEach((e) => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
  };
}
