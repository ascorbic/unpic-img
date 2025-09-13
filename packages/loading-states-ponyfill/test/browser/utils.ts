import { ResourceState } from "../../src/index";

// Test image URLs
export const TEST_IMAGES = {
  // 1x1 transparent PNG data URI
  VALID_DATA_URI:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",

  // 1x1 red PNG data URI
  RED_PIXEL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",

  // Valid external image - using a small, reliable CDN image
  VALID_EXTERNAL: "https://via.placeholder.com/50",

  // Broken image URL (non-existent domain to guarantee failure)
  BROKEN_EXTERNAL: "https://broken.invalid/image.jpg",

  // Slow loading image (large image from CDN)
  SLOW_EXTERNAL: "https://via.placeholder.com/1000",

  // Invalid data URI
  INVALID_DATA_URI: "data:image/png;base64,invalid",
  
  // 1x1 green PNG data URI
  GREEN_PIXEL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    
  // 1x1 blue PNG data URI  
  BLUE_PIXEL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==",
};

/**
 * Create an image element with specified attributes
 */
export function createImage(attributes: {
  src?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  alt?: string;
  id?: string;
  className?: string;
}): HTMLImageElement {
  const img = document.createElement("img");

  if (attributes.src) img.src = attributes.src;
  if (attributes.loading) img.loading = attributes.loading;
  if (attributes.width) img.width = attributes.width;
  if (attributes.height) img.height = attributes.height;
  if (attributes.alt) img.alt = attributes.alt;
  if (attributes.id) img.id = attributes.id;
  if (attributes.className) img.className = attributes.className;

  return img;
}

/**
 * Add an image to the document body
 */
export function addImageToDOM(img: HTMLImageElement): HTMLImageElement {
  document.body.appendChild(img);
  return img;
}

/**
 * Create and add an image to the DOM
 */
export function createAndAddImage(
  attributes: Parameters<typeof createImage>[0],
): HTMLImageElement {
  const img = createImage(attributes);
  return addImageToDOM(img);
}

/**
 * Wait for an image to reach a specific state
 */
export function waitForState(
  img: HTMLImageElement,
  state: ResourceState,
  attributePrefix = "data-resource-state-",
  timeout = 5000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(`Timeout waiting for image to reach state: ${state}`),
      );
    }, timeout);

    // Check if already in state
    if (img.hasAttribute(attributePrefix + state)) {
      clearTimeout(timeoutId);
      resolve();
      return;
    }

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === attributePrefix + state &&
          img.hasAttribute(attributePrefix + state)
        ) {
          clearTimeout(timeoutId);
          observer.disconnect();
          resolve();
          return;
        }
      }
    });

    observer.observe(img, {
      attributes: true,
      attributeFilter: [attributePrefix + state],
    });
  });
}

/**
 * Wait for an image to have any of the specified states
 */
export function waitForAnyState(
  img: HTMLImageElement,
  states: ResourceState[],
  attributePrefix = "data-resource-state-",
  timeout = 5000,
): Promise<ResourceState> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `Timeout waiting for image to reach any state: ${states.join(", ")}`,
        ),
      );
    }, timeout);

    // Check if already in any state
    for (const state of states) {
      if (img.hasAttribute(attributePrefix + state)) {
        clearTimeout(timeoutId);
        resolve(state);
        return;
      }
    }

    // Watch for attribute changes
    const observer = new MutationObserver(() => {
      for (const state of states) {
        if (img.hasAttribute(attributePrefix + state)) {
          clearTimeout(timeoutId);
          observer.disconnect();
          resolve(state);
          return;
        }
      }
    });

    observer.observe(img, {
      attributes: true,
      attributeFilter: states.map((s) => attributePrefix + s),
    });
  });
}

/**
 * Wait for a custom event on an element
 */
export function waitForEvent<T = any>(
  element: HTMLElement,
  eventName: string,
  timeout = 5000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      element.removeEventListener(eventName, handler);
      reject(new Error(`Timeout waiting for event: ${eventName}`));
    }, timeout);

    const handler = (event: Event) => {
      clearTimeout(timeoutId);
      element.removeEventListener(eventName, handler);
      resolve((event as CustomEvent).detail as T);
    };

    element.addEventListener(eventName, handler);
  });
}

/**
 * Get all current states of an image
 */
export function getImageStates(
  img: HTMLImageElement,
  attributePrefix = "data-resource-state-",
): ResourceState[] {
  const states: ResourceState[] = [];
  const possibleStates: ResourceState[] = [
    "pending",
    "loading",
    "stalled",
    "loaded",
    "broken",
    "complete",
  ];

  for (const state of possibleStates) {
    if (img.hasAttribute(attributePrefix + state)) {
      states.push(state);
    }
  }

  return states;
}

/**
 * Clean up all images in the document
 */
export function cleanupImages(): void {
  document.querySelectorAll("img").forEach((img) => img.remove());
}

/**
 * Wait for next animation frame
 */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Wait for a specific amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulate scrolling an element into view
 */
export async function scrollIntoView(element: HTMLElement): Promise<void> {
  element.scrollIntoView({ behavior: "instant" });
  // Wait for IntersectionObserver to detect the change
  await nextFrame();
  await wait(100);
}

/**
 * Create a container div at a specific position
 */
export function createContainer(options: {
  top?: number;
  height?: number;
  id?: string;
}): HTMLDivElement {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.width = "100%";
  container.style.top = `${options.top || 0}px`;
  container.style.height = `${options.height || 100}px`;
  if (options.id) container.id = options.id;
  document.body.appendChild(container);
  return container;
}

/**
 * Force a broken image by changing src to invalid URL
 */
export function breakImage(img: HTMLImageElement): void {
  img.src = TEST_IMAGES.BROKEN_EXTERNAL;
}

/**
 * Trigger image loading for lazy-loaded images
 */
export async function triggerLazyLoad(img: HTMLImageElement): Promise<void> {
  // Simulate the image entering the viewport
  await scrollIntoView(img);
}

/**
 * Create a mock slow-loading image using a blob URL
 */
export async function createSlowImage(
  delayMs: number,
): Promise<HTMLImageElement> {
  // Create a promise that resolves after delay
  await wait(delayMs);

  // Create a simple 1x1 image blob
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1, 1);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      const img = createImage({ src: url });
      resolve(img);
    });
  });
}