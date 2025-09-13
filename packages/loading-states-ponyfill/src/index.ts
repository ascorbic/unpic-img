/**
 * Image Resource State Ponyfill
 *
 * Observes image loading states and applies data attributes for CSS styling.
 * Uses individual boolean attributes for each state to allow multiple states
 * to be active simultaneously (e.g., both loading and stalled).
 *
 * Attributes applied:
 * - data-resource-state-pending: Image hasn't started loading (lazy-loaded, not in viewport)
 * - data-resource-state-loading: Image is currently loading
 * - data-resource-state-stalled: Image is loading but hasn't made progress
 * - data-resource-state-loaded: Image successfully loaded
 * - data-resource-state-broken: Image failed to load
 * - data-resource-state-complete: Image finished attempting to load (loaded OR broken)
 */

export interface ImageStatePonyfillOptions {
  /** Time in ms before considering an image stalled (default: 3000) */
  stallTimeout?: number;

  /** Interval in ms to check for stalls (default: 500) */
  stallCheckInterval?: number;

  /** Root margin for intersection observer (default: '50px') */
  observerRootMargin?: string;

  /** Enable debug logging (default: false) */
  debug?: boolean;

  /** Debug log prefix (default: '[ImageStatePonyfill]') */
  debugPrefix?: string;

  /** Attribute prefix for state attributes (default: 'data-resource-state-') */
  attributePrefix?: string;

  /** Enable custom events (default: true) */
  enableEvents?: boolean;

  /** Custom event name (default: 'resourcestatechange') */
  eventName?: string;
}

export type ResourceState =
  | "pending"
  | "loading"
  | "stalled"
  | "loaded"
  | "broken"
  | "complete";

interface ImageState {
  /** Current states (multiple can be true) */
  states: Set<ResourceState>;

  /** Timestamp when loading started */
  loadStartTime: number | null;

  /** Timer for stall checking */
  stallTimer: number | null;

  /** Last time progress was detected */
  lastProgress: number | null;

  /** Unique ID for debug logging */
  id: number;

  /** Whether the image has been observed by IntersectionObserver */
  isObserved: boolean;
}

export interface StateChangeEvent extends CustomEvent {
  detail: {
    /** States that were added */
    added: ResourceState[];

    /** States that were removed */
    removed: ResourceState[];

    /** All current active states */
    current: ResourceState[];

    /** The image element */
    target: HTMLImageElement;
  };
}

export class ImageStatePonyfill {
  private options: Required<ImageStatePonyfillOptions>;
  private imageStates: WeakMap<HTMLImageElement, ImageState>;
  private intersectionObserver: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private imageIdCounter = 0;

  constructor(options: ImageStatePonyfillOptions = {}) {
    this.options = {
      stallTimeout: options.stallTimeout ?? 3000,
      stallCheckInterval: options.stallCheckInterval ?? 500,
      observerRootMargin: options.observerRootMargin ?? "50px",
      debug: options.debug ?? false,
      debugPrefix: options.debugPrefix ?? "[ImageStatePonyfill]",
      attributePrefix: options.attributePrefix ?? "data-resource-state-",
      enableEvents: options.enableEvents ?? true,
      eventName: options.eventName ?? "resourcestatechange",
    };

    this.imageStates = new WeakMap();
    this.init();
  }

  private init(): void {
    this.log("Initializing ponyfill with options:", this.options);

    this.observeImages();
    this.setupMutationObserver();
    this.setupIntersectionObserver();

    this.log("Initialization complete");
  }

  private log(...args: any[]): void {
    if (this.options.debug) {
      console.log(this.options.debugPrefix, ...args);
    }
  }

  private logWarn(...args: any[]): void {
    if (this.options.debug) {
      console.warn(this.options.debugPrefix, ...args);
    }
  }

  private logGroup(label: string, fn: () => void): void {
    if (this.options.debug) {
      console.group(this.options.debugPrefix + " " + label);
      fn();
      console.groupEnd();
    }
  }

  private setupIntersectionObserver(): void {
    if (!("IntersectionObserver" in window)) {
      this.logWarn("IntersectionObserver not supported");
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          const state = this.imageStates.get(img);

          if (entry.isIntersecting && state?.states.has("pending")) {
            this.log(
              `Image #${state.id} entered viewport, browser will start loading`,
            );
            // Remove pending state as image is now in viewport
            this.removeState(img, "pending");
            // Browser will start loading, we'll detect via other mechanisms
            this.checkImageLoadingState(img);
          }
        });
      },
      {
        rootMargin: this.options.observerRootMargin,
      },
    );

    this.log(
      `IntersectionObserver initialized with ${this.options.observerRootMargin} margin`,
    );
  }

  private setupMutationObserver(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (this.isImageElement(node)) {
            this.log("New image added to DOM via mutation");
            this.observeImage(node);
          } else if (node instanceof Element) {
            const images = node.querySelectorAll("img");
            if (images.length > 0) {
              this.log(`${images.length} new image(s) found in added node`);
              images.forEach((img) => this.observeImage(img));
            }
          }
        });
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.log("MutationObserver initialized to watch for new images");
  }

  private isImageElement(node: Node): node is HTMLImageElement {
    return node instanceof HTMLImageElement;
  }

  private observeImages(): void {
    const images = document.querySelectorAll("img");
    this.log(`Found ${images.length} existing images to observe`);
    images.forEach((img) => this.observeImage(img));
  }

  private observeImage(img: HTMLImageElement): void {
    // Skip if already observing
    if (this.imageStates.has(img)) return;

    const imageId = ++this.imageIdCounter;
    const imgInfo = `Image #${imageId} (${img.src || "no src yet"})`;

    const state: ImageState = {
      states: new Set(),
      loadStartTime: null,
      stallTimer: null,
      lastProgress: null,
      id: imageId,
      isObserved: false,
    };

    this.imageStates.set(img, state);

    this.logGroup(`Observing ${imgInfo}`, () => {
      this.log("Complete:", img.complete);
      this.log("Natural width:", img.naturalWidth);
      this.log("Loading attribute:", img.loading);
      this.log("In viewport:", this.isInViewport(img));
    });

    // Determine initial state
    if (img.complete) {
      if (img.naturalWidth > 0) {
        this.addState(img, "loaded");
        this.addState(img, "complete");
      } else if (img.src) {
        this.addState(img, "broken");
        this.addState(img, "complete");
      }
    } else if (img.loading === "lazy" && !this.isInViewport(img)) {
      this.addState(img, "pending");
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(img);
        state.isObserved = true;
      }
    } else if (img.src) {
      this.addState(img, "loading");
      this.startMonitoring(img);
    }

    this.attachEventListeners(img);
  }

  private attachEventListeners(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    const imgInfo = `Image #${state?.id}`;

    // When image starts loading
    img.addEventListener("loadstart", () => {
      this.log(`${imgInfo} loadstart event fired`);
      this.removeState(img, "pending");
      this.addState(img, "loading");
      this.startMonitoring(img);
    });

    // When image loads successfully
    img.addEventListener("load", () => {
      this.log(`${imgInfo} load event fired`);
      this.stopMonitoring(img);
      this.removeState(img, "loading");
      this.removeState(img, "stalled");
      this.removeState(img, "pending");
      this.addState(img, "loaded");
      this.addState(img, "complete");
      this.unobserveImage(img);
    });

    // When image fails to load
    img.addEventListener("error", () => {
      this.log(`${imgInfo} error event fired`);
      this.stopMonitoring(img);
      this.removeState(img, "loading");
      this.removeState(img, "stalled");
      this.removeState(img, "pending");
      this.addState(img, "broken");
      this.addState(img, "complete");
      this.unobserveImage(img);
    });

    // Monitor progress
    img.addEventListener("progress", () => {
      const state = this.imageStates.get(img);
      if (state) {
        state.lastProgress = Date.now();
        this.log(`${imgInfo} progress event fired`);
      }
    });

    this.log(`Event listeners attached to ${imgInfo}`);
  }

  private startMonitoring(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    if (!state) return;

    state.loadStartTime = Date.now();
    state.lastProgress = Date.now();

    this.log(
      `Starting stall monitoring for Image #${state.id} (checking every ${this.options.stallCheckInterval}ms)`,
    );

    state.stallTimer = window.setInterval(() => {
      this.checkForStall(img);
    }, this.options.stallCheckInterval);
  }

  private stopMonitoring(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    if (state?.stallTimer) {
      clearInterval(state.stallTimer);
      state.stallTimer = null;
      this.log(`Stopped stall monitoring for Image #${state.id}`);
    }
  }

  private checkForStall(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    if (!state || !state.states.has("loading")) return;

    const timeSinceLastProgress = Date.now() - (state.lastProgress || 0);

    if (
      timeSinceLastProgress > this.options.stallTimeout &&
      !state.states.has("stalled")
    ) {
      this.logWarn(
        `Image #${state.id} stalled (no progress for ${timeSinceLastProgress}ms)`,
      );
      this.addState(img, "stalled");
    }
  }

  private checkImageLoadingState(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    if (!state) return;

    this.log(`Checking loading state for Image #${state.id}`);

    if (!img.complete && img.src) {
      this.addState(img, "loading");
      this.startMonitoring(img);
    }
  }

  private unobserveImage(img: HTMLImageElement): void {
    const state = this.imageStates.get(img);
    if (state?.isObserved && this.intersectionObserver) {
      this.intersectionObserver.unobserve(img);
      state.isObserved = false;
    }
  }

  private addState(img: HTMLImageElement, newState: ResourceState): void {
    const state = this.imageStates.get(img);
    if (!state) return;

    if (!state.states.has(newState)) {
      state.states.add(newState);
      img.setAttribute(this.options.attributePrefix + newState, "");

      this.log(
        `State added for Image #${state.id}: +${newState} (current: ${Array.from(state.states).join(", ")})`,
      );

      this.dispatchStateChange(img, [newState], []);
    }
  }

  private removeState(
    img: HTMLImageElement,
    stateToRemove: ResourceState,
  ): void {
    const state = this.imageStates.get(img);
    if (!state) return;

    if (state.states.has(stateToRemove)) {
      state.states.delete(stateToRemove);
      img.removeAttribute(this.options.attributePrefix + stateToRemove);

      this.log(
        `State removed for Image #${state.id}: -${stateToRemove} (current: ${Array.from(state.states).join(", ")})`,
      );

      this.dispatchStateChange(img, [], [stateToRemove]);
    }
  }

  private dispatchStateChange(
    img: HTMLImageElement,
    added: ResourceState[],
    removed: ResourceState[],
  ): void {
    if (!this.options.enableEvents) return;

    const state = this.imageStates.get(img);
    if (!state) return;

    const event: StateChangeEvent = new CustomEvent(this.options.eventName, {
      detail: {
        added,
        removed,
        current: Array.from(state.states),
        target: img,
      },
      bubbles: true,
    }) as StateChangeEvent;

    img.dispatchEvent(event);
  }

  private isInViewport(img: HTMLImageElement): boolean {
    const rect = img.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= window.innerHeight &&
      rect.left <= window.innerWidth
    );
  }

  // Public API

  /**
   * Get the current states of an image
   */
  public getImageStates(img: HTMLImageElement): ResourceState[] {
    const state = this.imageStates.get(img);
    return state ? Array.from(state.states) : [];
  }

  /**
   * Check if an image has a specific state
   */
  public hasState(img: HTMLImageElement, stateName: ResourceState): boolean {
    const state = this.imageStates.get(img);
    return state ? state.states.has(stateName) : false;
  }

  /**
   * Get a summary of all image states in the document
   */
  public getStateSummary(): Record<ResourceState | "total", number> {
    const summary: Record<ResourceState | "total", number> = {
      pending: 0,
      loading: 0,
      stalled: 0,
      broken: 0,
      loaded: 0,
      total: 0,
      complete: 0,
    };

    document.querySelectorAll("img").forEach((img) => {
      const state = this.imageStates.get(img);
      if (state) {
        summary.total++;
        state.states.forEach((s) => {
          summary[s]++;
        });
      }
    });

    return summary;
  }

  /**
   * Log current state summary to console
   */
  public logStateSummary(): void {
    const summary = this.getStateSummary();
    this.logGroup("Current State Summary", () => {
      this.log(`Total images: ${summary.total}`);
      this.log(`Pending: ${summary.pending}`);
      this.log(`Loading: ${summary.loading}`);
      this.log(`Stalled: ${summary.stalled}`);
      this.log(`Broken: ${summary.broken}`);
      this.log(`Loaded: ${summary.loaded}`);
    });
  }

  /**
   * Manually observe a new image
   */
  public observe(img: HTMLImageElement): void {
    this.observeImage(img);
  }

  /**
   * Stop observing all images and clean up
   */
  public disconnect(): void {
    this.intersectionObserver?.disconnect();
    this.mutationObserver?.disconnect();

    // Clear all stall timers
    document.querySelectorAll("img").forEach((img) => {
      this.stopMonitoring(img);
    });

    this.log("Ponyfill disconnected");
  }

  /**
   * Update options dynamically
   */
  public setOptions(options: Partial<ImageStatePonyfillOptions>): void {
    Object.assign(this.options, options);
    this.log("Options updated:", options);
  }
}

// Export as default as well
export default ImageStatePonyfill;
