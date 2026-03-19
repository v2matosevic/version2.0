import type { Language } from './i18n'

export type PageFrontmatter = {
  title: string
  slug: string
  language: Language
  translations: Partial<Record<Language, string>>
  description: string
  lastModified?: string
}

export type Page = {
  frontmatter: PageFrontmatter
  content: string
  html: string
}
