import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("posts")

  const htaccessRules = [
    "ErrorDocument 404 /404.html",
  ]

  const redirectRules = posts.map((post) =>
    post.data.aliases.map((alias) => `Redirect 301 ${alias} /post/${post.id}/`)
  ).flat()

  const directiveText = htaccessRules.concat(redirectRules).join("\n")

  return new Response(directiveText)
}
