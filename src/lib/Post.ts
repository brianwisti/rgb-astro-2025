export interface PageData {
  title: string
  description?: string
  cover_image?: string
  cover_caption?: string
  aliases?: string[]
}

export interface PageInterface {
  data: PostData
  id: string
}

export interface PostData extends PageData {
  date: Date
  tags: string[]
  categories: string[]
  uses: string[]
  series: string[]
  posse?: string[]
}

export interface PostInterface {
  data: PostData
  id: string
}
