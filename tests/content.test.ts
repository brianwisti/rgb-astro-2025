import fs from "node:fs"
import glob from "fast-glob"
import * as matter from "gray-matter";
import { ZodError } from "astro:schema";
import { describe, expect, test } from "vitest"

import { PostSchema } from "@lib/Post.ts"

type ParsedPost = {
  path: string
  post: matter.GrayMatterFile<string>
}

const posts: ParsedPost[] = glob.sync("src/**/*.mdoc")
  .map((path: string) => {
    return { path: path, post: matter.default(fs.readFileSync(path, "utf8")) }
  }
)


describe("Content", () => {
  test("every post is accounted for", () => {
    const mdocCount = glob.sync("src/**/*.mdoc").length
    console.log("mdocCount", mdocCount)

    expect(posts.length).toBeGreaterThan(0)
    expect(posts.length).toBe(mdocCount)
  })
})

describe.each(posts)("$path", ({ path, post}) => {
  test("frontmatter is valid PostSchema", () => {
    const validation = PostSchema.safeParse(post.data)

    // expect(validation.success).toBe(true)
    expect(validation.error).toBeUndefined()
  })
})


