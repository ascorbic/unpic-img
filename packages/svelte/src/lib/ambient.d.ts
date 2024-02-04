declare module "style-object-to-css-string" {
  function styleToCss(styleObject: Record<string, string | number>): string;
  export = styleToCss;
}
