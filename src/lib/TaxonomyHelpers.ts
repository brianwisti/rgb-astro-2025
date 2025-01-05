// Functions for loading and sorting taxonomies

import { getCollection } from "astro:content";
import { default as slugify } from "slug";

interface Post {
  data: {
    title: string
    date: Date
    tags: string[]
    categories: string[]
    series: string[]
    uses: string[]
  };
  id: string
}

type SluggedTaxonomyMapping = Map<string, Post[]>

export async function collectSiteCategoryMap(): Promise<SluggedTaxonomyMapping> {
  const posts = await getCollection("posts")
  const slugs = new Map<string, Post[]>

  posts.forEach((post) => {
    post.data.categories.forEach((category) => {
      const slug = slugify(category)

      if (!slugs.has(slug)) {
        slugs.set(slug, [])
      }

      slugs.get(slug)?.push(post)
    })
  })

  return slugs
}

export async function collectSiteSeriesMap(): Promise<SluggedTaxonomyMapping> {
  const posts = await getCollection("posts")
  const slugs = new Map<string, Post[]>

  posts.forEach((post) => {
    post.data.series.forEach((series) => {
      const slug = slugify(series)

      if (!slugs.has(slug)) {
        slugs.set(slug, [])
      }

      slugs.get(slug)?.push(post)
    })
  })

  return slugs
}

export async function collectSiteTagMap(): Promise<SluggedTaxonomyMapping> {
  const posts = await getCollection("posts")
  const slugs = new Map<string, Post[]>

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const tags = post.data.tags

    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      const slug = slugify(tag)

      if (!slugs.has(slug)) {
        slugs.set(slug, [])
      }

      slugs.get(slug)?.push(post)
    }
  }

  return slugs
}

export async function collectSiteUsesMap(): Promise<SluggedTaxonomyMapping> {
  const posts = await getCollection("posts")
  const slugs = new Map<string, Post[]>

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const entries = post.data.uses

    if (!entries) {
      continue
    }

    for (let j = 0; j < entries.length; j++) {
      const entry = entries[j]
      console.log(`uses: ${entry}`)
      const slug = slugify(entry)

      if (!slugs.has(slug)) {
        slugs.set(slug, [])
      }

      slugs.get(slug)?.push(post)
    }
  }

  return slugs
}
