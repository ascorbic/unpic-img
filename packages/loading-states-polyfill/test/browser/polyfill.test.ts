import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ImageStatePolyfill, {
  type ImageStatePolyfillOptions,
} from "../../src/index";
import { cleanupImages, createAndAddImage, TEST_IMAGES } from "./utils";

describe("ImageStatePolyfill - Initialization", () => {
  let polyfill: ImageStatePolyfill | null = null;

  beforeEach(() => {
    cleanupImages();
  });

  afterEach(() => {
    if (polyfill) {
      polyfill.disconnect();
      polyfill = null;
    }
    cleanupImages();
  });

  it("should initialize with default options", () => {
    polyfill = new ImageStatePolyfill();
    expect(polyfill).toBeDefined();
    expect(polyfill).toBeInstanceOf(ImageStatePolyfill);
  });

  it("should initialize with custom options", () => {
    const options: ImageStatePolyfillOptions = {
      stallTimeout: 5000,
      stallCheckInterval: 1000,
      observerRootMargin: "100px",
      debug: false,
      debugPrefix: "[CustomPrefix]",
      attributePrefix: "data-custom-state-",
      enableEvents: false,
      eventName: "customstatechange",
    };

    polyfill = new ImageStatePolyfill(options);
    expect(polyfill).toBeDefined();

    // Create an image and verify custom attribute prefix
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    // Give polyfill time to observe the image
    setTimeout(() => {
      const hasCustomAttribute = Array.from(img.attributes).some((attr) =>
        attr.name.startsWith("data-custom-state-"),
      );
      expect(hasCustomAttribute).toBe(true);
    }, 100);
  });

  it("should observe existing images on initialization", async () => {
    // Add images before creating polyfill
    const img1 = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
    const img2 = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    polyfill = new ImageStatePolyfill();

    // Wait a bit for polyfill to process images
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Both images should have state attributes
    expect(img1.hasAttribute("data-resource-state-loaded")).toBe(true);
    expect(img2.hasAttribute("data-resource-state-loaded")).toBe(true);
  });

  it("should not initialize multiple times for the same image", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    polyfill = new ImageStatePolyfill();

    // Wait for initial observation
    await new Promise((resolve) => setTimeout(resolve, 100));

    const states1 = polyfill.getImageStates(img);

    // Try to observe the same image again
    polyfill.observe(img);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states2 = polyfill.getImageStates(img);

    // States should be the same
    expect(states1).toEqual(states2);
  });

  it("should properly clean up on disconnect", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    polyfill = new ImageStatePolyfill();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(img.hasAttribute("data-resource-state-loaded")).toBe(true);

    // Disconnect the polyfill
    polyfill.disconnect();

    // Add a new image after disconnect
    const newImg = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // New image should not have state attributes
    expect(newImg.hasAttribute("data-resource-state-loaded")).toBe(false);
    expect(newImg.hasAttribute("data-resource-state-complete")).toBe(false);
  });
});

describe("ImageStatePolyfill - Public API", () => {
  let polyfill: ImageStatePolyfill;

  beforeEach(() => {
    cleanupImages();
    polyfill = new ImageStatePolyfill();
  });

  afterEach(() => {
    polyfill.disconnect();
    cleanupImages();
  });

  it("should get image states", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = polyfill.getImageStates(img);
    expect(states).toContain("loaded");
    expect(states).toContain("complete");
  });

  it("should check if image has specific state", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(polyfill.hasState(img, "loaded")).toBe(true);
    expect(polyfill.hasState(img, "complete")).toBe(true);
    expect(polyfill.hasState(img, "pending")).toBe(false);
    expect(polyfill.hasState(img, "loading")).toBe(false);
  });

  it("should get state summary", async () => {
    // Add various images
    createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
    createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });
    createAndAddImage({ src: "", loading: "lazy" }); // Empty src, lazy

    await new Promise((resolve) => setTimeout(resolve, 100));

    const summary = polyfill.getStateSummary();

    expect(summary.total).toBeGreaterThanOrEqual(2);
    expect(summary.loaded).toBeGreaterThanOrEqual(2);
    expect(summary.complete).toBeGreaterThanOrEqual(2);
  });

  it("should manually observe new image", async () => {
    const img = createImage({ src: TEST_IMAGES.VALID_DATA_URI });

    // Don't add to DOM yet
    expect(polyfill.getImageStates(img)).toEqual([]);

    // Manually observe
    polyfill.observe(img);

    // Now add to DOM
    document.body.appendChild(img);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = polyfill.getImageStates(img);
    expect(states.length).toBeGreaterThan(0);
  });

  it("should update options dynamically", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Update options
    polyfill.setOptions({
      debug: true,
      debugPrefix: "[Updated]",
    });

    // Add another image
    const img2 = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Both images should still work
    expect(polyfill.hasState(img, "loaded")).toBe(true);
    expect(polyfill.hasState(img2, "loaded")).toBe(true);
  });

  it("should handle images without src", async () => {
    const img = createAndAddImage({ alt: "No source" });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = polyfill.getImageStates(img);
    expect(states).toEqual([]); // No states for image without src
  });

  it("should return empty array for non-observed images", () => {
    const img = document.createElement("img");
    const states = polyfill.getImageStates(img);
    expect(states).toEqual([]);
  });

  it("should return false for hasState on non-observed images", () => {
    const img = document.createElement("img");
    expect(polyfill.hasState(img, "loaded")).toBe(false);
  });
});

function createImage(attributes: {
  src?: string;
  alt?: string;
  loading?: "lazy" | "eager";
}): HTMLImageElement {
  const img = document.createElement("img");
  if (attributes.src) img.src = attributes.src;
  if (attributes.alt) img.alt = attributes.alt;
  if (attributes.loading) img.loading = attributes.loading;
  return img;
}