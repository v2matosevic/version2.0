import type { Language } from './i18n'

export type BlogFrontmatter = {
  title: string
  slug: string
  originalUrl: string
  language: Language
  translations: Partial<Record<Language, string>>
  date: string
  lastModified: string
  author: string
  category: string
  tags: string[]
  excerpt: string
  featuredImage: string
}

export type BlogPost = {
  frontmatter: BlogFrontmatter
  content: string
  html: string
  readingTime: number
  directorySlug: string
}

export type BlogPostMeta = Omit<BlogPost, 'content' | 'html'> & {
  wordCount: number
}

export type BlogCategory = {
  name: string
  slug: string
  count: number
}
