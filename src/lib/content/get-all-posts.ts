import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown } from './parse-markdown'
import { CURATED_SLUGS } from './curated-slugs'
import type { BlogFrontmatter, BlogPostMeta } from '@/types/blog'
import type { Language } from '@/types/i18n'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getAllPosts(lang: Language = 'en'): Promise<BlogPostMeta[]> {
  const dirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && CURATED_SLUGS.has(entry.name))

  const posts: BlogPostMeta[] = []

  for (const dir of dirs) {
    const filePath = path.join(BLOG_DIR, dir.name, `${lang}.md`)
    if (!fs.existsSync(filePath)) continue

    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = await parseMarkdown<BlogFrontmatter>(raw)

    posts.push({
      frontmatter: parsed.frontmatter,
      readingTime: parsed.readingTime,
      wordCount: parsed.wordCount,
      directorySlug: dir.name,
    })
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })

  return posts
}
