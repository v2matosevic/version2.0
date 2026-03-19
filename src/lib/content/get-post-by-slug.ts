import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown } from './parse-markdown'
import type { BlogFrontmatter, BlogPost } from '@/types/blog'
import type { Language } from '@/types/i18n'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getPostBySlug(directorySlug: string, lang: Language = 'en'): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, directorySlug, `${lang}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = await parseMarkdown<BlogFrontmatter>(raw)

  return {
    frontmatter: parsed.frontmatter,
    content: parsed.content,
    html: parsed.html,
    readingTime: parsed.readingTime,
    directorySlug,
  }
}
