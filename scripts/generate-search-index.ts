import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'search-index.json')
const CONTENT_PREVIEW_LENGTH = 200

// Import curated slugs from source
function getCuratedSlugs(): Set<string> {
  const curatedModule = path.join(process.cwd(), 'src', 'lib', 'content', 'curated-slugs.ts')
  const content = fs.readFileSync(curatedModule, 'utf-8')
  const matches = content.match(/'([a-z0-9-]+)'/g)
  if (!matches) return new Set()
  return new Set(matches.map((m) => m.replace(/'/g, '')))
}

type SearchEntry = {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  preview: string
}

function main(): void {
  const curatedSlugs = getCuratedSlugs()
  const entries: SearchEntry[] = []

  const dirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && curatedSlugs.has(entry.name))

  for (const dir of dirs) {
    const filePath = path.join(BLOG_DIR, dir.name, 'en.md')
    if (!fs.existsSync(filePath)) continue

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const plainContent = content
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`~]/g, '')
      .trim()

    const preview = plainContent.slice(0, CONTENT_PREVIEW_LENGTH)

    entries.push({
      slug: dir.name,
      title: data.title || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      tags: data.tags || [],
      preview,
    })
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2), 'utf-8')

  console.log(`Search index generated: ${entries.length} posts`)
}

main()
