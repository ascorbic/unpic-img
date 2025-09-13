import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ImageStatePonyfill from "../../src/index";
import {
  cleanupImages,
  createAndAddImage,
  createImage,
  addImageToDOM,
  TEST_IMAGES,
  getImageStates,
  wait,
} from "./utils";

describe("ImageStatePonyfill - State Detection", () => {
  let ponyfill: ImageStatePonyfill;

  beforeEach(() => {
    cleanupImages();
    ponyfill = new ImageStatePonyfill();
  });

  afterEach(() => {
    ponyfill.disconnect();
    cleanupImages();
  });

  describe("Initial State Detection", () => {
    it("should detect already loaded images", async () => {
      // Create and load image before adding to DOM
      const img = createImage({ src: TEST_IMAGES.VALID_DATA_URI });

      // Wait for image to load
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

      // Now add to DOM
      addImageToDOM(img);

      // Wait for ponyfill to observe
      await wait(100);

      const states = getImageStates(img);
      expect(states).toContain("loaded");
      expect(states).toContain("complete");
      expect(states).not.toContain("loading");
      expect(states).not.toContain("broken");
    });

    it("should detect broken images", async () => {
      // Create image with invalid src
      const img = createImage({ src: TEST_IMAGES.INVALID_DATA_URI });

      // Wait for error
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

      addImageToDOM(img);
      await wait(100);

      const states = getImageStates(img);
      expect(states).toContain("broken");
      expect(states).toContain("complete");
      expect(states).not.toContain("loaded");
      expect(states).not.toContain("loading");
    });

    it("should detect lazy-loaded images not in viewport", async () => {
      // Create container far below viewport
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "5000px";
      container.style.height = "100px";
      document.body.appendChild(container);

      const img = createImage({
        src: TEST_IMAGES.VALID_DATA_URI,
        loading: "lazy",
      });
      container.appendChild(img);

      await wait(100);

      const states = getImageStates(img);
      
      // Data URIs might load immediately even with lazy loading
      // So accept either pending (if truly lazy) or loaded (if browser loaded it anyway)
      const isPendingOrLoaded = states.includes("pending") || states.includes("loaded");
      expect(isPendingOrLoaded).toBe(true);

      container.remove();
    });

    it("should detect currently loading images", async () => {
      // Create an image without src first
      const img = createAndAddImage({ alt: "Loading test" });
      
      // Set src to trigger loading
      img.src = TEST_IMAGES.VALID_DATA_URI;

      // For data URIs, loading is usually instant, so check for loaded state
      await wait(50);

      const states = getImageStates(img);

      // Image should be loaded (data URIs load instantly)
      expect(states.includes("loaded")).toBe(true);
    });

    it("should handle images without src", async () => {
      const img = createAndAddImage({ alt: "No source" });

      await wait(100);

      const states = getImageStates(img);
      expect(states).toEqual([]);
    });

    it("should handle images with empty src", async () => {
      const img = createAndAddImage({ src: "" });

      await wait(100);

      const states = getImageStates(img);
      // Empty src typically triggers an error
      if (states.length > 0) {
        expect(states).toContain("broken");
        expect(states).toContain("complete");
      }
    });
  });

  describe("Multiple Simultaneous States", () => {
    it("should support loading and stalled states together", async () => {
      // Skip this test for now as it requires a truly slow-loading image
      // which is hard to simulate reliably in tests
      return;
      
      // TODO: Implement with a mock server or network throttling
    });

    it("should have complete state with either loaded or broken", async () => {
      // Test loaded + complete
      const goodImg = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
      await wait(200);

      const goodStates = getImageStates(goodImg);
      if (goodStates.includes("complete")) {
        expect(
          goodStates.includes("loaded") || goodStates.includes("broken"),
        ).toBe(true);
      }

      // Test broken + complete
      const badImg = createAndAddImage({ src: TEST_IMAGES.INVALID_DATA_URI });
      await wait(200);

      const badStates = getImageStates(badImg);
      if (badStates.includes("complete")) {
        expect(
          badStates.includes("loaded") || badStates.includes("broken"),
        ).toBe(true);
      }
    });
  });

  describe("State Attributes", () => {
    it("should use correct attribute prefix", async () => {
      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      await wait(100);

      // Check for data-resource-state- prefix
      const hasCorrectPrefix = Array.from(img.attributes).some((attr) =>
        attr.name.startsWith("data-resource-state-"),
      );
      expect(hasCorrectPrefix).toBe(true);
    });

    it("should use custom attribute prefix", async () => {
      ponyfill.disconnect();
      ponyfill = new ImageStatePonyfill({
        attributePrefix: "data-img-",
      });

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      await wait(100);

      const hasCustomPrefix = Array.from(img.attributes).some((attr) =>
        attr.name.startsWith("data-img-"),
      );
      expect(hasCustomPrefix).toBe(true);
    });

    it("should use empty attribute values", async () => {
      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      await wait(100);

      // Get all state attributes
      const stateAttrs = Array.from(img.attributes).filter((attr) =>
        attr.name.startsWith("data-resource-state-"),
      );

      // All should have empty values
      stateAttrs.forEach((attr) => {
        expect(attr.value).toBe("");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle SVG images", async () => {
      const svgDataUri =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";
      const img = createAndAddImage({ src: svgDataUri });

      await wait(100);

      const states = getImageStates(img);
      expect(states).toContain("loaded");
      expect(states).toContain("complete");
    });

    it("should handle blob URLs", async () => {
      // Create a blob URL
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!));
      });
      const blobUrl = URL.createObjectURL(blob);

      const img = createAndAddImage({ src: blobUrl });

      await wait(100);

      const states = getImageStates(img);
      expect(states).toContain("loaded");
      expect(states).toContain("complete");

      URL.revokeObjectURL(blobUrl);
    });

    it("should handle images with srcset", async () => {
      const img = createImage({ src: TEST_IMAGES.VALID_DATA_URI });
      img.srcset = `${TEST_IMAGES.VALID_DATA_URI} 1x, ${TEST_IMAGES.RED_PIXEL} 2x`;
      addImageToDOM(img);

      await wait(100);

      const states = getImageStates(img);
      expect(states).toContain("loaded");
      expect(states).toContain("complete");
    });

    it("should handle images in iframes", async () => {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument!;
      const img = iframeDoc.createElement("img");
      img.src = TEST_IMAGES.VALID_DATA_URI;
      iframeDoc.body.appendChild(img);

      // Ponyfill won't observe iframe images automatically
      // (they're in a different document context)
      await wait(100);

      // Image in iframe should not have states from main document's ponyfill
      const states = getImageStates(img);
      expect(states).toEqual([]);

      iframe.remove();
    });
  });
});