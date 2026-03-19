import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown } from './parse-markdown'
import type { PageFrontmatter, Page } from '@/types/page'
import type { Language } from '@/types/i18n'

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')

export async function parsePage(pageSlug: string, lang: Language = 'en'): Promise<Page | null> {
  const filePath = path.join(PAGES_DIR, pageSlug, `${lang}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = await parseMarkdown<PageFrontmatter>(raw)

  return {
    frontmatter: parsed.frontmatter,
    content: parsed.content,
    html: parsed.html,
  }
}
