declare module "style-object-to-css-string" {
  function styleToCss(styleObject: Record<string, string | number>): string;
  export = styleToCss;
}

// Because https://github.com/sveltejs/svelte/issues/8099
declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    fetchpriority?: "auto" | "low" | "high" | null;
  }
}
