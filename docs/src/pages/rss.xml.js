import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: "Unpic blog",
    description: "The latest news from Unpic",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
