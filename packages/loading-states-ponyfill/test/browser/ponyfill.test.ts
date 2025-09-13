import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ImageStatePonyfill, {
  type ImageStatePonyfillOptions,
} from "../../src/index";
import { cleanupImages, createAndAddImage, TEST_IMAGES } from "./utils";

describe("ImageStatePonyfill - Initialization", () => {
  let ponyfill: ImageStatePonyfill | null = null;

  beforeEach(() => {
    cleanupImages();
  });

  afterEach(() => {
    if (ponyfill) {
      ponyfill.disconnect();
      ponyfill = null;
    }
    cleanupImages();
  });

  it("should initialize with default options", () => {
    ponyfill = new ImageStatePonyfill();
    expect(ponyfill).toBeDefined();
    expect(ponyfill).toBeInstanceOf(ImageStatePonyfill);
  });

  it("should initialize with custom options", () => {
    const options: ImageStatePonyfillOptions = {
      stallTimeout: 5000,
      stallCheckInterval: 1000,
      observerRootMargin: "100px",
      debug: false,
      debugPrefix: "[CustomPrefix]",
      attributePrefix: "data-custom-state-",
      enableEvents: false,
      eventName: "customstatechange",
    };

    ponyfill = new ImageStatePonyfill(options);
    expect(ponyfill).toBeDefined();

    // Create an image and verify custom attribute prefix
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    // Give ponyfill time to observe the image
    setTimeout(() => {
      const hasCustomAttribute = Array.from(img.attributes).some((attr) =>
        attr.name.startsWith("data-custom-state-"),
      );
      expect(hasCustomAttribute).toBe(true);
    }, 100);
  });

  it("should observe existing images on initialization", async () => {
    // Add images before creating ponyfill
    const img1 = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
    const img2 = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    ponyfill = new ImageStatePonyfill();

    // Wait a bit for ponyfill to process images
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Both images should have state attributes
    expect(img1.hasAttribute("data-resource-state-loaded")).toBe(true);
    expect(img2.hasAttribute("data-resource-state-loaded")).toBe(true);
  });

  it("should not initialize multiple times for the same image", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    ponyfill = new ImageStatePonyfill();

    // Wait for initial observation
    await new Promise((resolve) => setTimeout(resolve, 100));

    const states1 = ponyfill.getImageStates(img);

    // Try to observe the same image again
    ponyfill.observe(img);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states2 = ponyfill.getImageStates(img);

    // States should be the same
    expect(states1).toEqual(states2);
  });

  it("should properly clean up on disconnect", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    ponyfill = new ImageStatePonyfill();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(img.hasAttribute("data-resource-state-loaded")).toBe(true);

    // Disconnect the ponyfill
    ponyfill.disconnect();

    // Add a new image after disconnect
    const newImg = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // New image should not have state attributes
    expect(newImg.hasAttribute("data-resource-state-loaded")).toBe(false);
    expect(newImg.hasAttribute("data-resource-state-complete")).toBe(false);
  });
});

describe("ImageStatePonyfill - Public API", () => {
  let ponyfill: ImageStatePonyfill;

  beforeEach(() => {
    cleanupImages();
    ponyfill = new ImageStatePonyfill();
  });

  afterEach(() => {
    ponyfill.disconnect();
    cleanupImages();
  });

  it("should get image states", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = ponyfill.getImageStates(img);
    expect(states).toContain("loaded");
    expect(states).toContain("complete");
  });

  it("should check if image has specific state", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(ponyfill.hasState(img, "loaded")).toBe(true);
    expect(ponyfill.hasState(img, "complete")).toBe(true);
    expect(ponyfill.hasState(img, "pending")).toBe(false);
    expect(ponyfill.hasState(img, "loading")).toBe(false);
  });

  it("should get state summary", async () => {
    // Add various images
    createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
    createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });
    createAndAddImage({ src: "", loading: "lazy" }); // Empty src, lazy

    await new Promise((resolve) => setTimeout(resolve, 100));

    const summary = ponyfill.getStateSummary();

    expect(summary.total).toBeGreaterThanOrEqual(2);
    expect(summary.loaded).toBeGreaterThanOrEqual(2);
    expect(summary.complete).toBeGreaterThanOrEqual(2);
  });

  it("should manually observe new image", async () => {
    const img = createImage({ src: TEST_IMAGES.VALID_DATA_URI });

    // Don't add to DOM yet
    expect(ponyfill.getImageStates(img)).toEqual([]);

    // Manually observe
    ponyfill.observe(img);

    // Now add to DOM
    document.body.appendChild(img);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = ponyfill.getImageStates(img);
    expect(states.length).toBeGreaterThan(0);
  });

  it("should update options dynamically", async () => {
    const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Update options
    ponyfill.setOptions({
      debug: true,
      debugPrefix: "[Updated]",
    });

    // Add another image
    const img2 = createAndAddImage({ src: TEST_IMAGES.RED_PIXEL });

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Both images should still work
    expect(ponyfill.hasState(img, "loaded")).toBe(true);
    expect(ponyfill.hasState(img2, "loaded")).toBe(true);
  });

  it("should handle images without src", async () => {
    const img = createAndAddImage({ alt: "No source" });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const states = ponyfill.getImageStates(img);
    expect(states).toEqual([]); // No states for image without src
  });

  it("should return empty array for non-observed images", () => {
    const img = document.createElement("img");
    const states = ponyfill.getImageStates(img);
    expect(states).toEqual([]);
  });

  it("should return false for hasState on non-observed images", () => {
    const img = document.createElement("img");
    expect(ponyfill.hasState(img, "loaded")).toBe(false);
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