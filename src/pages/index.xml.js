import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    title: "Random Geekery Blog",
    description: "Brian Wisti's blog",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.title,
      pubDate: post.data.date,
      link: post.slug,
    })),
    customData: `<language>en-us</language</language>`,
  });
}
