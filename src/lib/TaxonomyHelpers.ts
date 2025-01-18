// Functions for loading and sorting taxonomies

import { getCollection } from "astro:content"
import { default as slugify } from "slug"
import type { CollectionEntry } from "astro:content"
import type { PostInterface } from "./Post"

export interface TaxonomyEntry {
  page: object
  posts: PostInterface[]
}

export type SluggedTaxonomyMapping = Map<string, TaxonomyEntry>
type StringArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never
}[keyof T]
type TaxonomyType = StringArrayKeys<PostInterface["data"]>
type TaxonomyMap = Promise<SluggedTaxonomyMapping>

export async function collectSiteTaxonomyMap(taxonomyType: TaxonomyType): TaxonomyMap {
  if (!taxonomyType) {
    throw Error("Cannot collect taxonomy map for undefined taxonomyType!")
  }

  const posts = await getCollection("posts")
  const definedPages = await getCollection(taxonomyType)
  const slugs = new Map<string, TaxonomyEntry>()

  posts.forEach((post) => {
    const taxonomyEntries = post.data[taxonomyType]

    if (!taxonomyEntries) {
      console.error(`Post ${post.id} is missing a ${taxonomyType} field`)
      return
    }

    taxonomyEntries.forEach((taxonomy) => {
      const slug = slugify(taxonomy)

      if (!slugs.has(slug)) {
        const page = definedPages.find((entry) => entry.id == slug) || {
          id: slug,
          collection: taxonomyType,
          data: {
            title: slug,
          },
          body: "",
        }
        slugs.set(slug, { page: page, posts: [] })
      }

      slugs.get(slug)!.posts.push(post)
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

export async function getYears(): Promise<SluggedTaxonomyMapping> {
  const posts = await getCollection("posts")
  const yearPages = await getCollection("years")

  const years = new Map<string, TaxonomyEntry>()

  posts.forEach((post) => {
    const year = post.data.date.getFullYear().toString()
    if (!years.has(year)) {
      const page = yearPages.find(
        (page) => page.data.title === year.toString(),
      ) || {
        id: year,
        collection: "years",
        data: { title: year },
        body: "",
      }

      years.set(year, { page, posts: [] })
    }

    years.get(year)!.posts.push(post)
  })

  return years
}