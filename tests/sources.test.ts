import fs from "node:fs"
import glob from "fast-glob"
import * as matter from "gray-matter"
import { load } from "js-yaml"
import { lint, readConfig } from "markdownlint/sync"
import { describe, expect, test } from "vitest"

import { PostSchema } from "@lib/Post.ts"

type ParsedPost = {
  path: string
  post: matter.GrayMatterFile<string>
}

const tagLimit = 3

const posts: ParsedPost[] = glob.sync("src/posts/**/*.{mdx,mdoc}")
  .map((path: string) => {
    return { path: path, post: matter.default(fs.readFileSync(path, "utf8")) }
  }
)

const markdownlintConfig = readConfig(".markdownlint.yml", [load])
const unlinted = [
  "src/posts/2020/01/restructuredtext-basics-for-blogging.mdx"
]
const postsToLint = posts.filter(({ path }) => !unlinted.includes(path))

describe.each(postsToLint)("$path", ({ post }) => {
  test("frontmatter is valid PostSchema", () => {
    const validation = PostSchema.safeParse(post.data)

    expect(validation.error).toBeUndefined()
  })

  test("content is consistent Markdown", () => {
    const { content } = post
    const result = lint({
      strings: { content },
      config: markdownlintConfig,
    })

    expect(result.toString()).toBe("")
  })

  test("not too many tags", () => {
    const tags = post.data.tags

    expect(tags).toBeInstanceOf(Array)
    expect(tags.length).toBeLessThanOrEqual(tagLimit)
  })
})


