/**
 * Build RAG index from blog posts and pages.
 * Generates data/rag-chunks.json with keyword-based TF-IDF search data.
 *
 * Usage: npx tsx scripts/build-rag-index.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'rag-chunks.json')

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'under', 'and', 'but',
  'or', 'nor', 'not', 'so', 'yet', 'both', 'either', 'neither', 'each',
  'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'because',
  'about', 'this', 'that', 'these', 'those', 'it', 'its', 'you', 'your',
  'we', 'our', 'they', 'their', 'he', 'she', 'his', 'her', 'i', 'me', 'my',
])

type RagChunk = {
  id: string
  title: string
  content: string
  source: string
  language: string
  keywords: string[]
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s\u00C0-\u024F]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

function extractKeywords(text: string, maxKeywords = 20): string[] {
  const tokens = tokenize(text)
  const freq = new Map<string, number>()
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1)
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word)
}

function chunkContent(content: string, maxChunkSize = 1000): string[] {
  const paragraphs = content.split(/\n\n+/)
  const chunks: string[] = []
  let current = ''

  for (const paragraph of paragraphs) {
    if (current.length + paragraph.length > maxChunkSize && current) {
      chunks.push(current.trim())
      current = ''
    }
    current += paragraph + '\n\n'
  }

  if (current.trim()) {
    chunks.push(current.trim())
  }

  return chunks
}

function processMarkdownFile(filePath: string, source: string, language: string): RagChunk[] {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  const title = (frontmatter.title as string) || path.basename(filePath, '.md')
  const plainContent = content.replace(/^#+\s+.+$/gm, '').replace(/[*_`[\]()#]/g, '').trim()

  const chunks = chunkContent(plainContent)
  return chunks.map((chunk, index) => ({
    id: `${source}-${language}-${index}`,
    title,
    content: chunk,
    source,
    language,
    keywords: [
      ...extractKeywords(title, 5),
      ...extractKeywords(chunk, 15),
    ],
  }))
}

function main(): void {
  const chunks: RagChunk[] = []

  // Process blog posts (curated 103)
  const blogDir = path.join(CONTENT_DIR, 'blog')
  if (fs.existsSync(blogDir)) {
    const langDirs = fs.readdirSync(blogDir).filter((d) => fs.statSync(path.join(blogDir, d)).isDirectory())
    for (const lang of langDirs) {
      const langDir = path.join(blogDir, lang)
      const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        const slug = file.replace('.md', '')
        chunks.push(...processMarkdownFile(path.join(langDir, file), `/blog/${slug}/`, lang))
      }
    }
  }

  // Process pages
  const pagesDir = path.join(CONTENT_DIR, 'pages')
  if (fs.existsSync(pagesDir)) {
    const langDirs = fs.readdirSync(pagesDir).filter((d) => fs.statSync(path.join(pagesDir, d)).isDirectory())
    for (const lang of langDirs) {
      const langDir = path.join(pagesDir, lang)
      const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        const slug = file.replace('.md', '')
        chunks.push(...processMarkdownFile(path.join(langDir, file), `/${slug}/`, lang))
      }
    }
  }

  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(chunks, null, 2))
  console.log(`[RAG] Built ${chunks.length} chunks from ${new Set(chunks.map((c) => c.source)).size} sources`)
}

main()
