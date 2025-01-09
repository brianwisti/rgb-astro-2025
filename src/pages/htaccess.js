import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("posts")

  const directiveText = posts.map((post) => {
    const { aliases } = post.data
    const permalink = post.id

    if (!aliases) { return "" }

    return aliases.map((alias) => `Redirect 301 ${alias} /post/${permalink}`).join("\n")
  }).filter((postRedirects) => postRedirects != "").join("\n")

  return new Response(directiveText)
}
