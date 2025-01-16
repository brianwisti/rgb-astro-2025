import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("posts")

  const directiveText = posts.map((post) =>
    post.data.aliases.map((alias) => `Redirect 301 ${alias} /post/${post.id}/`)
  ).flat().join("\n")

  return new Response(directiveText)
}
