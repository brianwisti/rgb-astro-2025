import { z } from "astro:content"

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  categories: z.array(z.string()),
  tags: z.array(z.string()).default([]),
  series: z.array(z.string()).default([]),
  description: z.string().optional(),
  cover_image: z.string().optional(),
});

export interface PostInterface {
    data: {
        title: string
        date: Date
        description?: string
        tags: string[]
        categories: string[]
        series: string[]
        cover_image?: string
    };
    id: string
}

