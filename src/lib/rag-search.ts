import fs from 'node:fs'
import path from 'node:path'

type RagChunk = {
  id: string
  title: string
  content: string
  source: string
  language: string
  keywords: string[]
}

let chunks: RagChunk[] | null = null

function loadChunks(): RagChunk[] {
  if (chunks) return chunks

  const filePath = path.join(process.cwd(), 'data', 'rag-chunks.json')
  if (!fs.existsSync(filePath)) {
    console.warn('[RAG] No rag-chunks.json found. Run: npx tsx scripts/build-rag-index.ts')
    return []
  }

  chunks = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RagChunk[]
  return chunks
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'to', 'of', 'in',
  'for', 'on', 'with', 'at', 'by', 'from', 'and', 'but', 'or', 'not',
  'this', 'that', 'it', 'you', 'we', 'they', 'do', 'does', 'did', 'what',
  'how', 'can', 'your', 'my', 'about',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s\u00C0-\u024F]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

type SearchResult = {
  chunk: RagChunk
  score: number
}

/**
 * Keyword-based search with title bonus.
 */
export function searchRag(query: string, language: string, maxResults = 5): SearchResult[] {
  const allChunks = loadChunks()
  const queryTokens = tokenize(query)

  if (queryTokens.length === 0) return []

  const results: SearchResult[] = []

  for (const chunk of allChunks) {
    if (chunk.language !== language && chunk.language !== 'en') continue

    let score = 0
    const titleLower = chunk.title.toLowerCase()
    const contentLower = chunk.content.toLowerCase()

    for (const token of queryTokens) {
      // Title match (3x weight)
      if (titleLower.includes(token)) score += 3
      // Keyword match (2x weight)
      if (chunk.keywords.includes(token)) score += 2
      // Content match (1x weight)
      if (contentLower.includes(token)) score += 1
    }

    if (score > 0) {
      results.push({ chunk, score })
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
}
