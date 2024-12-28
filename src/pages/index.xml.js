import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const allPosts = await getCollection("posts");
  const freshPosts = allPosts.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date)
  }).slice(0, 20);

  return rss({
    title: "Random Geekery Blog",
    description: "Brian Wisti's blog",
    site: context.site,
    items: freshPosts.map((post) => ({
      title: post.data.title,
      description: post.data.title,
      pubDate: post.data.date,
      link: `https://randomgeekery.org/post/${post.id}/`,
    })),
    customData: `<language>en-us</language</language>`,
  });
}
