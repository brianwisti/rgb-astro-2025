import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

import { PostSchema } from "@lib/Post";

const posts = defineCollection({
  loader: glob({ pattern: "./**/[^_]*.mdoc", base: "src/posts" }),
  schema: PostSchema,
});

export const collections = { posts };
