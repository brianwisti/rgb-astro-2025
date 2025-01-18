import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

export const PageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  aliases: z.array(z.string()).default(() => new Array()),
  cover_caption: z.string().default(""),
  cover_image: z.string().optional(),
})


export const PostSchema = PageSchema.extend({
  date: z.date(),
  categories: z.array(z.string()).default(() => new Array()),
  tags: z.array(z.string()).default(() => new Array()),
  uses: z.array(z.string()).default(() => new Array()),
  series: z.array(z.string()).default(() => new Array()),
  posse: z.array(z.string()).default(() => new Array()),
})

const categories = defineCollection({
  loader: glob({ pattern: "./*.mdx", base: "src/content/taxonomies/categories" }),
  schema: PageSchema,
})

const series = defineCollection({
  loader: glob({ pattern: "./*.mdx", base: "src/content/taxonomies/series" }),
  schema: PageSchema,
})

const tags = defineCollection({
  loader: glob({ pattern: "./*.mdx", base: "src/content/taxonomies/tags" }),
  schema: PageSchema,
})

const uses = defineCollection({
  loader: glob({ pattern: "./*.mdx", base: "src/content/taxonomies/uses" }),
  schema: PageSchema,
})

const years = defineCollection({
  loader: glob({ pattern: "./*.mdx", base: "src/content/taxonomies/years" }),
  schema: PageSchema,
})


const posts = defineCollection({
  loader: glob({ pattern: "./**/[^_]*.{mdx,mdoc}", base: "src/content/posts" }),
  schema: PostSchema,
});

export const collections = { categories, posts, series, uses, years };
