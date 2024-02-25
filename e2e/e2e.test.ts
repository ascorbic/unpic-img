import { test, expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export const site = process.env.SITE ?? "preact";

export const expect = baseExpect.extend({
  async toHaveLoadedImage(locator: Locator) {
    const assertionName = "toHaveLoadedImage";
    let pass: boolean;
    try {
      await baseExpect(locator).toHaveJSProperty("complete", true);
      await baseExpect(locator).not.toHaveJSProperty("naturalHeight", 0);
      pass = true;
    } catch (error) {
      pass = false;
    }
    return {
      pass,
      name: assertionName,
      message: () =>
        this.utils.matcherHint(assertionName, undefined, undefined),
    };
  },
});

const base = "http://localhost:8888";

function aspectRatio(width: number = 0, aspectRatio: number) {
  return Math.round(width / aspectRatio);
}

test.describe(site, () => {
  test("desktop", async ({ page }) => {
    await page.goto(`${base}/`);
    const fw = await page.getByAltText("fullWidth");
    expect(fw).toBeVisible();
    const vp = await page.viewportSize();
    await expect(fw).toHaveLoadedImage();
    await expect(fw).toHaveJSProperty("width", vp?.width);
    await expect(fw).toHaveJSProperty("height", aspectRatio(vp?.width, 16 / 9));

    const cs = await page.getByAltText("constrained");
    await cs.scrollIntoViewIfNeeded();
    expect(cs).toBeVisible();
    await expect(cs).toHaveLoadedImage();
    await expect(cs).toHaveJSProperty("width", 800);
    await expect(cs).toHaveJSProperty("height", 600);

    const fx = await page.getByAltText("fixed");
    expect(fx).toBeVisible();
    await expect(fx).toHaveLoadedImage();
    await expect(fx).toHaveJSProperty("width", 800);
    await expect(fx).toHaveJSProperty("height", 600);

    const os = await page.getByAltText("offscreen");

    await expect(os).not.toBeInViewport();
    await expect(os).toHaveJSProperty("width", 600);
    await expect(os).toHaveJSProperty("height", 800);
    await expect(os).not.toHaveLoadedImage();
    await os.scrollIntoViewIfNeeded();
    await expect(os).toBeInViewport();
    await expect(os).toHaveLoadedImage();
    await expect(os).toHaveJSProperty("width", 600);
    await expect(os).toHaveJSProperty("height", 800);
  });

  test("mobile", async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto(`${base}/`);
    const fw = await page.getByAltText("fullWidth");
    expect(fw).toBeVisible();
    const vp = await page.viewportSize();
    await expect(fw).toHaveLoadedImage();
    await expect(fw).toHaveJSProperty("width", vp?.width);
    await expect(fw).toHaveJSProperty("height", aspectRatio(vp?.width, 16 / 9));

    const cs = await page.getByAltText("constrained");
    await cs.scrollIntoViewIfNeeded();
    expect(cs).toBeVisible();
    await expect(cs).toHaveLoadedImage();
    await expect(cs).toHaveJSProperty("width", 400);
    await expect(cs).toHaveJSProperty("height", 300);

    const fx = await page.getByAltText("fixed");
    expect(fx).toBeVisible();
    await expect(fx).toHaveLoadedImage();
    await expect(fx).toHaveJSProperty("width", 800);
    await expect(fx).toHaveJSProperty("height", 600);

    const os = await page.getByAltText("offscreen");
    await expect(os).not.toBeInViewport();
    await expect(os).toHaveJSProperty("width", 400);
    await expect(os).toHaveJSProperty("height", aspectRatio(400, 3 / 4));
    await expect(os).not.toHaveLoadedImage();
    await os.scrollIntoViewIfNeeded();
    await expect(os).toBeInViewport();
    await expect(os).toHaveLoadedImage();
    await expect(os).toHaveJSProperty("width", 400);
    await expect(os).toHaveJSProperty("height", aspectRatio(400, 3 / 4));
  });
});
