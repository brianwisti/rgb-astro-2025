import fs from "node:fs"
import glob from "fast-glob"
import * as matter from "gray-matter";
import { describe, expect, test } from "vitest"

import { PostSchema } from "@lib/Post.ts"

type ParsedPost = {
  path: string
  post: matter.GrayMatterFile<string>
}

const posts: ParsedPost[] = glob.sync("src/posts/**/*.{mdx,mdoc}")
  .map((path: string) => {
    return { path: path, post: matter.default(fs.readFileSync(path, "utf8")) }
  }
)


describe("Content", () => {
  test("every post is accounted for", () => {
    const postFileCount = glob.sync("src/posts/**/*.{mdx,mdoc}").length
    console.log("postFileCount", postFileCount)

    expect(posts.length).toBeGreaterThan(0)
    expect(posts.length).toBe(postFileCount)
  })
})

describe.each(posts)("$path", ({ path, post}) => {
  test("frontmatter is valid PostSchema", () => {
    const validation = PostSchema.safeParse(post.data)

    // expect(validation.success).toBe(true)
    expect(validation.error).toBeUndefined()
  })
})


