// Functions for loading and sorting taxonomies

import { getCollection } from "astro:content"
import { default as slugify } from "slug"
import type { PostInterface } from "./Post"

type SluggedTaxonomyMapping = Map<string, PostInterface[]>
type StringArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never
}[keyof T]
type TaxonomyType = StringArrayKeys<PostInterface["data"]>
type TaxonomyMap = Promise<SluggedTaxonomyMapping>

async function collectSiteTaxonomyMap(taxonomyType: TaxonomyType): TaxonomyMap {
  const posts = await getCollection("posts")
  const slugs = new Map<string, PostInterface[]>()

  posts.forEach((post) => {
    const taxonomyEntries = post.data[taxonomyType]

    if (!taxonomyEntries) {
      console.error(`Post ${post.id} is missing a ${taxonomyType} field`)
      return
    }

    taxonomyEntries.forEach((taxonomy) => {
      const slug = slugify(taxonomy)

      if (!slugs.has(slug)) {
        slugs.set(slug, [])
      }

      slugs.get(slug)!.push(post)
    })
  })

  return slugs
}

export async function collectSiteCategoryMap(): TaxonomyMap {
  return collectSiteTaxonomyMap("categories")
}

export async function collectSiteSeriesMap(): TaxonomyMap {
  return collectSiteTaxonomyMap("series")
}

export async function collectSiteTagMap(): TaxonomyMap {
  return collectSiteTaxonomyMap("tags")
}

export async function collectSiteUsesMap(): TaxonomyMap {
  return collectSiteTaxonomyMap("uses")
}
