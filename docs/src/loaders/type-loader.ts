import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import type { Loader } from "astro/loaders";
import { JSDocExtractor, type DocEntry } from "./jsdoc.ts";
export * from "unpic/types";
import { SupportedProviders, type ImageCdn } from "unpic/types";
import { getMarkdown } from "./templates.ts";
import { z } from "astro:schema";

export async function unpicTypesLoader({
  useCache = true,
}: { useCache?: boolean } = {}): Promise<Loader> {
  const processor = await createMarkdownProcessor();
  const extractor = new JSDocExtractor(import.meta.filename);

  return {
    name: "unpic-types-loader",
    async load({ store }) {
      if (!useCache) {
        store.clear();
      }
      for (const provider in SupportedProviders) {
        if (useCache && store.has(provider)) {
          continue;
        }
        const options = extractor.extractType(`ProviderOptions['${provider}']`);
        const operations = extractor.extractType(
          `ProviderOperations['${provider}']`,
        );

        const markdown = getMarkdown(provider as ImageCdn, options, operations);
        const rendered = await processor.render(markdown);

        store.set({
          id: provider,
          data: {
            id: provider,
            name: SupportedProviders[provider as ImageCdn],
            options,
            operations,
          },
          body: markdown,
          rendered: {
            html: rendered.code,
            metadata: rendered.metadata,
          },
        });
      }
    },
    schema: z.object({
      id: z.string(),
      name: z.string(),
      options: z.array(
        z.object({
          name: z.string(),
          documentation: z.string(),
          type: z.string(),
        }),
      ),
      operations: z.array(
        z.object({
          name: z.string(),
          documentation: z.string(),
          type: z.string(),
        }),
      ),
    }),
  };
}
