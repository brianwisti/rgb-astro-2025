import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("posts")
  console.log(`${posts.length} posts`)

  const directiveText = posts.map((post) => {
    console.log(post.data)
    const { aliases } = post.data
    const permalink = post.id

    console.log(`${permalink} => ${aliases}`)
    if (!aliases) { return "" }

    return aliases.map((alias) => `Redirect 301 ${alias} /post/${permalink}`).join("\n")
  }).filter((postRedirects) => postRedirects != "").join("\n")

  console.log(`htaccess directives:\n${directiveText}`)

  return new Response(directiveText)
}
