import { glob } from "astro/loaders"
import { z, defineCollection } from "astro:content"

const postSchema = z.object({
    title: z.string(),
    date: z.date(),
})
const posts = defineCollection({
    loader: glob({ pattern: "./**/[^_]*.mdoc", base: "src/posts" }),
    schema: postSchema,
})

export const collections = { posts }