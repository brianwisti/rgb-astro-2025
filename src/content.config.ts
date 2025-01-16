import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:content"

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  categories: z.array(z.string()),
  tags: z.array(z.string()).default([]),
  uses: z.array(z.string()).default([]),
  series: z.array(z.string()).default([]),
  aliases: z.array(z.string()).default(() => new Array()),
  description: z.string().optional(),
  cover_caption: z.string().default(""),
  cover_image: z.string().optional(),
  posse: z.array(z.string()).default([]),
})

const posts = defineCollection({
  loader: glob({ pattern: "./**/[^_]*.{mdx,mdoc}", base: "src/posts" }),
  schema: PostSchema,
});

export const collections = { posts };
