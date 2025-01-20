import { defineCollection, z } from "astro:content";
import { SITE } from "./consts";
import { unpicTypesLoader } from "./loaders/type-loader";

const docs = defineCollection({
  schema: z.object({
    title: z.string().default(SITE.title),
    description: z.string().default(SITE.description),
    dir: z
      .union([z.literal("ltr"), z.literal("rtl")])
      .default("ltr")
      .optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    ogLocale: z.string().optional(),
    githubRepo: z.string().optional(),
    includeApi: z.boolean().optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    bluesky_post: z.string().url().optional(),
  }),
});

const providers = defineCollection({
  loader: await unpicTypesLoader({
    useCache: false,
  }),
});

export const collections = { docs, img: docs, blog, providers };
