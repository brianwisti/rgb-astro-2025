import { DateTime } from "luxon";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

function preparePost(post) {
  return {
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.date,
    link: `https://randomgeekery.org/post/${post.id}/`,
  }
}

export async function GET(context) {
  const allPosts = await getCollection("posts");
  const freshPosts = allPosts.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date)
  }).slice(0, 20);
  const buildDate = DateTime.now().toRFC2822();
  const customData = `
<generator>Astro -- astro.build</generator>
<language>en-us</language>
<lastBuildDate>${buildDate}</lastBuildDate>
`;

  return rss({
    title: "Random Geekery Blog",
    description: "Recent blog entries on Random Geekery",
    site: context.site,
    lastBuildDate: buildDate,
    items: freshPosts.map((post) => preparePost(post)),
    customData: customData,
  });
}
