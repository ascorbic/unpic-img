import type { HTMLImgAttributes } from "svelte/elements";

declare global {
  namespace svelteHTML {
    interface IntrinsicElements {
      img: HTMLImgAttributes & {
        // Because https://github.com/sveltejs/svelte/issues/8099
        fetchpriority?: "auto" | "low" | "high" | null;
      };
    }
  }
}

export {};
