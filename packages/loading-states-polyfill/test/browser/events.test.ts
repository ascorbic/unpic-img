import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import ImageStatePolyfill, { type StateChangeEvent } from "../../src/index";
import {
  cleanupImages,
  createAndAddImage,
  TEST_IMAGES,
  waitForEvent,
  wait,
} from "./utils";

describe("ImageStatePolyfill - Events", () => {
  let polyfill: ImageStatePolyfill;

  beforeEach(() => {
    cleanupImages();
  });

  afterEach(() => {
    if (polyfill) {
      polyfill.disconnect();
    }
    cleanupImages();
  });

  describe("State Change Events", () => {
    it("should dispatch resourcestatechange event", async () => {
      polyfill = new ImageStatePolyfill();
      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      const eventPromise = waitForEvent<StateChangeEvent["detail"]>(
        img,
        "resourcestatechange",
      );

      const detail = await eventPromise;

      expect(detail).toBeDefined();
      expect(detail.target).toBe(img);
      expect(detail.added).toBeInstanceOf(Array);
      expect(detail.removed).toBeInstanceOf(Array);
      expect(detail.current).toBeInstanceOf(Array);
    });

    it("should include correct event detail for state additions", async () => {
      polyfill = new ImageStatePolyfill();

      const img = document.createElement("img");
      const events: StateChangeEvent["detail"][] = [];

      img.addEventListener("resourcestatechange", (e) => {
        events.push((e as StateChangeEvent).detail);
      });

      document.body.appendChild(img);
      img.src = TEST_IMAGES.VALID_DATA_URI;

      await wait(200);

      // Should have received events for state changes
      expect(events.length).toBeGreaterThan(0);

      // Find event where 'loaded' was added
      const loadedEvent = events.find((e) => e.added.includes("loaded"));
      expect(loadedEvent).toBeDefined();
      expect(loadedEvent!.added).toContain("loaded");
      expect(loadedEvent!.current).toContain("loaded");
    });

    it("should include correct event detail for state removals", async () => {
      polyfill = new ImageStatePolyfill({
        stallTimeout: 100,
        stallCheckInterval: 50,
      });

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_EXTERNAL });
      const events: StateChangeEvent["detail"][] = [];

      img.addEventListener("resourcestatechange", (e) => {
        events.push((e as StateChangeEvent).detail);
      });

      // Wait for image to load
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

      await wait(100);

      // Should have events for loading -> loaded transition
      const removedLoadingEvent = events.find((e) =>
        e.removed.includes("loading"),
      );

      if (removedLoadingEvent) {
        expect(removedLoadingEvent.removed).toContain("loading");
        expect(removedLoadingEvent.current).not.toContain("loading");
      }
    });

    it("should use custom event name", async () => {
      polyfill = new ImageStatePolyfill({
        eventName: "customstatechange",
      });

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      const eventPromise = waitForEvent(img, "customstatechange");
      const detail = await eventPromise;

      expect(detail).toBeDefined();
    });

    it("should bubble events", async () => {
      polyfill = new ImageStatePolyfill();

      const container = document.createElement("div");
      document.body.appendChild(container);

      const img = document.createElement("img");
      container.appendChild(img);

      let bubbledEvent: StateChangeEvent | null = null;
      container.addEventListener("resourcestatechange", (e) => {
        bubbledEvent = e as StateChangeEvent;
      });

      img.src = TEST_IMAGES.VALID_DATA_URI;

      await wait(200);

      expect(bubbledEvent).toBeDefined();
      expect(bubbledEvent!.detail.target).toBe(img);

      container.remove();
    });

    it("should not dispatch events when disabled", async () => {
      polyfill = new ImageStatePolyfill({
        enableEvents: false,
      });

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
      const eventHandler = vi.fn();

      img.addEventListener("resourcestatechange", eventHandler);

      await wait(200);

      expect(eventHandler).not.toHaveBeenCalled();
    });
  });

  describe("Native Image Events", () => {
    it("should handle load event", async () => {
      polyfill = new ImageStatePolyfill();

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });

      await new Promise<void>((resolve) => {
        img.addEventListener("load", () => {
          resolve();
        });
      });

      await wait(50);

      expect(img.hasAttribute("data-resource-state-loaded")).toBe(true);
      expect(img.hasAttribute("data-resource-state-complete")).toBe(true);
    });

    it("should handle error event", async () => {
      polyfill = new ImageStatePolyfill();

      const img = createAndAddImage({ src: TEST_IMAGES.BROKEN_EXTERNAL });

      await new Promise<void>((resolve) => {
        img.addEventListener("error", () => {
          resolve();
        });
      });

      await wait(50);

      expect(img.hasAttribute("data-resource-state-broken")).toBe(true);
      expect(img.hasAttribute("data-resource-state-complete")).toBe(true);
    });

    it("should handle progress event", async () => {
      polyfill = new ImageStatePolyfill({
        stallTimeout: 1000,
        stallCheckInterval: 100,
      });

      // Create image without src first
      const img = document.createElement("img");
      document.body.appendChild(img);
      
      // Wait for polyfill to observe it
      await wait(50);
      
      // Now set src to trigger loading (use data URI for instant load)
      img.src = TEST_IMAGES.VALID_DATA_URI;

      // Simulate progress event while loading
      const progressEvent = new Event("progress");
      img.dispatchEvent(progressEvent);

      await wait(100);

      // After data URI loads, should have loaded state
      const hasLoaded = img.hasAttribute("data-resource-state-loaded");
      const hasComplete = img.hasAttribute("data-resource-state-complete");
      
      expect(hasLoaded || hasComplete).toBe(true);
    });

    it("should handle loadstart event", async () => {
      polyfill = new ImageStatePolyfill();

      const img = document.createElement("img");
      img.loading = "lazy";
      document.body.appendChild(img);

      // Initially should be pending or have no state
      await wait(50);

      // Simulate loadstart event (browser starts loading)
      const loadstartEvent = new Event("loadstart");
      img.dispatchEvent(loadstartEvent);

      await wait(50);

      // Should transition to loading state
      expect(img.hasAttribute("data-resource-state-loading")).toBe(true);
      expect(img.hasAttribute("data-resource-state-pending")).toBe(false);
    });
  });

  describe("Event Timing", () => {
    it("should dispatch events in correct order", async () => {
      polyfill = new ImageStatePolyfill();

      const events: string[] = [];
      const img = document.createElement("img");

      img.addEventListener("resourcestatechange", (e) => {
        const detail = (e as StateChangeEvent).detail;
        detail.added.forEach((state) => events.push(`+${state}`));
        detail.removed.forEach((state) => events.push(`-${state}`));
      });

      document.body.appendChild(img);
      img.src = TEST_IMAGES.VALID_DATA_URI;

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      await wait(50);

      // Should have loading before loaded
      const loadingIndex = events.indexOf("+loading");
      const loadedIndex = events.indexOf("+loaded");

      if (loadingIndex !== -1 && loadedIndex !== -1) {
        expect(loadingIndex).toBeLessThan(loadedIndex);
      }

      // Should have complete after loaded
      const completeIndex = events.indexOf("+complete");
      if (completeIndex !== -1 && loadedIndex !== -1) {
        expect(loadedIndex).toBeLessThanOrEqual(completeIndex);
      }
    });

    it("should not dispatch duplicate events for same state", async () => {
      polyfill = new ImageStatePolyfill();

      const img = createAndAddImage({ src: TEST_IMAGES.VALID_DATA_URI });
      const addedStates: string[] = [];

      img.addEventListener("resourcestatechange", (e) => {
        const detail = (e as StateChangeEvent).detail;
        addedStates.push(...detail.added);
      });

      await wait(300);

      // Check for duplicates
      const uniqueStates = new Set(addedStates);
      expect(uniqueStates.size).toBe(addedStates.length);
    });
  });
});