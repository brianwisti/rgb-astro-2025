import { z } from "astro:content"

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()),
  cover_image: z.string().optional(),
});
