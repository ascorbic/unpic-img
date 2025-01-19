import { JSDocExtractor } from "./jsdoc.ts";

export * from "unpic/types";

export const extractor = new JSDocExtractor(import.meta.filename);
