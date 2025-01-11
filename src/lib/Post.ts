import { z } from "astro:content"

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  categories: z.array(z.string()),
  tags: z.array(z.string()).default([]),
  uses: z.array(z.string()).default([]),
  series: z.array(z.string()).default([]),
  aliases: z.array(z.string()).default([]),
  description: z.string().optional(),
  cover_caption: z.string().default(""),
  cover_image: z.string().optional(),
})

export interface PostData {
  title: string
  date: Date
  description?: string
  tags: string[]
  categories: string[]
  uses: string[]
  series: string[]
  cover_image?: string
  cover_caption?: string
  aliases?: string[]
}

export interface PostInterface {
  data: PostData
  id: string
}
