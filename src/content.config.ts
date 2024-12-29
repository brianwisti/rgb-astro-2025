import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { PostSchema } from "@lib/Post";

const posts = defineCollection({
  loader: glob({ pattern: "./**/[^_]*.{mdx,mdoc}", base: "src/posts" }),
  schema: PostSchema,
});

export const collections = { posts };
