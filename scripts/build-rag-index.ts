/**
 * Build RAG index from all content sources.
 * Generates data/rag-chunks.json for keyword-based search.
 *
 * Processes: blog posts, pages, pricing config, portfolio, testimonials, site config.
 * Usage: npx tsx scripts/build-rag-index.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'rag-chunks.json')
const MAX_CHUNK_SIZE = 1000

type RagChunk = {
  id: string
  title: string
  content: string
  source: string
  language: string
  category: string
  keywords: string[]
}

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
  'koji', 'koja', 'koje', 'kako', 'sto', 'ali', 'ili', 'jer', 'ako', 'sve',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s\u00C0-\u024F\u0100-\u017F]/g, ' ')
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

function chunkContent(content: string): string[] {
  const paragraphs = content.split(/\n\n+/)
  const chunks: string[] = []
  let current = ''

  for (const paragraph of paragraphs) {
    if (current.length + paragraph.length > MAX_CHUNK_SIZE && current) {
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

function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s+.+$/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[*_`~[\]()#>]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function processMarkdownFile(
  filePath: string,
  source: string,
  language: string,
  category: string,
): RagChunk[] {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  const title = (frontmatter.title as string) || path.basename(filePath, '.md')
  const plainContent = stripMarkdown(content)

  if (!plainContent || plainContent.length < 50) return []

  const chunks = chunkContent(plainContent)
  return chunks.map((chunk, index) => ({
    id: `${category}-${source}-${language}-${index}`,
    title,
    content: chunk,
    source,
    language,
    category,
    keywords: [
      ...extractKeywords(title, 5),
      ...extractKeywords(chunk, 15),
    ],
  }))
}

function processBlogPosts(): RagChunk[] {
  const blogDir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(blogDir)) return []

  const chunks: RagChunk[] = []
  const postDirs = fs.readdirSync(blogDir).filter((d) =>
    fs.statSync(path.join(blogDir, d)).isDirectory(),
  )

  for (const slug of postDirs) {
    const postDir = path.join(blogDir, slug)
    const languages = ['en', 'hr', 'de']

    for (const lang of languages) {
      const filePath = path.join(postDir, `${lang}.md`)
      if (!fs.existsSync(filePath)) continue
      chunks.push(...processMarkdownFile(filePath, `/blog/${slug}/`, lang, 'blog'))
    }
  }

  console.log(`[RAG] Blog: ${postDirs.length} posts → ${chunks.length} chunks`)
  return chunks
}

function processPages(): RagChunk[] {
  const pagesDir = path.join(CONTENT_DIR, 'pages')
  if (!fs.existsSync(pagesDir)) return []

  const chunks: RagChunk[] = []
  const pageDirs = fs.readdirSync(pagesDir).filter((d) =>
    fs.statSync(path.join(pagesDir, d)).isDirectory(),
  )

  for (const slug of pageDirs) {
    const pageDir = path.join(pagesDir, slug)
    const languages = ['en', 'hr', 'de']

    for (const lang of languages) {
      const filePath = path.join(pageDir, `${lang}.md`)
      if (!fs.existsSync(filePath)) continue
      chunks.push(...processMarkdownFile(filePath, `/${slug}/`, lang, 'page'))
    }
  }

  console.log(`[RAG] Pages: ${pageDirs.length} pages → ${chunks.length} chunks`)
  return chunks
}

function processPortfolio(): RagChunk[] {
  const portfolioDir = path.join(CONTENT_DIR, 'portfolio')
  if (!fs.existsSync(portfolioDir)) return []

  const chunks: RagChunk[] = []
  const projectDirs = fs.readdirSync(portfolioDir).filter((d) => {
    const fullPath = path.join(portfolioDir, d)
    return fs.statSync(fullPath).isDirectory() && d !== 'screenshots'
  })

  for (const slug of projectDirs) {
    const projectDir = path.join(portfolioDir, slug)
    const languages = ['en', 'hr', 'de']

    for (const lang of languages) {
      const filePath = path.join(projectDir, `${lang}.md`)
      if (!fs.existsSync(filePath)) continue
      chunks.push(...processMarkdownFile(filePath, `/portfolio/${slug}/`, lang, 'portfolio'))
    }
  }

  console.log(`[RAG] Portfolio: ${projectDirs.length} projects → ${chunks.length} chunks`)
  return chunks
}

function processTestimonials(): RagChunk[] {
  const filePath = path.join(CONTENT_DIR, 'testimonials.json')
  if (!fs.existsSync(filePath)) return []

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
    testimonials: Array<{
      id: string
      name: string
      company: string
      industry: string
      quote: Record<string, string>
      tags: string[]
    }>
  }

  const chunks: RagChunk[] = []
  for (const testimonial of data.testimonials) {
    for (const [lang, quote] of Object.entries(testimonial.quote)) {
      chunks.push({
        id: `testimonial-${testimonial.id}-${lang}`,
        title: `Testimonial from ${testimonial.name}`,
        content: `${testimonial.name}${testimonial.company ? ` (${testimonial.company})` : ''}: "${quote}"`,
        source: '/about/',
        language: lang,
        category: 'testimonial',
        keywords: [
          ...extractKeywords(quote, 10),
          ...testimonial.tags,
          testimonial.name.toLowerCase(),
        ],
      })
    }
  }

  console.log(`[RAG] Testimonials: ${data.testimonials.length} reviews → ${chunks.length} chunks`)
  return chunks
}

function processPricingConfig(): RagChunk[] {
  const filePath = path.join(CONTENT_DIR, 'pricing-config.json')
  if (!fs.existsSync(filePath)) return []

  const config = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
    baseIncludes: string[]
    steps: {
      scope: { optionsByType: Record<string, Array<{ id: string; label: string; detail: string; basePrice: number[] }>> }
      features: { sections: Array<{ options: Array<{ id: string; label: string; description: string; price: number[] }> }> }
    }
  }

  const chunks: RagChunk[] = []

  // Base includes
  chunks.push({
    id: 'pricing-base-includes',
    title: 'What Every Project Includes',
    content: `Every Version2 project includes: ${config.baseIncludes.join(', ')}.`,
    source: '/pricing/',
    language: 'en',
    category: 'pricing',
    keywords: ['pricing', 'includes', 'base', 'project', 'responsive', 'seo'],
  })

  // Scope pricing
  for (const [type, scopes] of Object.entries(config.steps.scope.optionsByType)) {
    const scopeText = scopes.map((s) =>
      `${s.label} (${s.detail}): €${s.basePrice[0].toLocaleString()} – €${s.basePrice[1].toLocaleString()}`,
    ).join('. ')

    chunks.push({
      id: `pricing-scope-${type}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Pricing`,
      content: `${type.charAt(0).toUpperCase() + type.slice(1)} pricing tiers: ${scopeText}.`,
      source: '/pricing/',
      language: 'en',
      category: 'pricing',
      keywords: ['pricing', 'cost', type, ...scopes.map((s) => s.id)],
    })
  }

  // Features
  for (const section of config.steps.features.sections) {
    const featureText = section.options.map((o) =>
      `${o.label}: ${o.description} (€${o.price[0]} – €${o.price[1]})`,
    ).join('. ')

    chunks.push({
      id: `pricing-features-${section.options[0]?.id ?? 'unknown'}`,
      title: 'Available Features and Add-ons',
      content: featureText,
      source: '/pricing/',
      language: 'en',
      category: 'pricing',
      keywords: ['features', 'addon', 'pricing', ...section.options.map((o) => o.id.replace(/_/g, ' '))],
    })
  }

  console.log(`[RAG] Pricing: ${chunks.length} chunks`)
  return chunks
}

function processSiteConfig(): RagChunk[] {
  const filePath = path.join(CONTENT_DIR, 'site-config.json')
  if (!fs.existsSync(filePath)) return []

  const config = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
    business: { legalName: string; director: string; address: { street: string; city: string; postalCode: string } }
    contact: { email: string; phone: string; whatsapp: string }
  }

  const chunks: RagChunk[] = []

  chunks.push({
    id: 'site-contact-info',
    title: 'Version2 Contact Information',
    content: [
      `Company: ${config.business.legalName}`,
      `Director: ${config.business.director}`,
      `Address: ${config.business.address.street}, ${config.business.address.postalCode} ${config.business.address.city}`,
      `Email: ${config.contact.email}`,
      `Phone: ${config.contact.phone}`,
      `WhatsApp: ${config.contact.whatsapp}`,
    ].join('\n'),
    source: '/contact/',
    language: 'en',
    category: 'company',
    keywords: ['contact', 'email', 'phone', 'address', 'zadar', 'version2'],
  })

  console.log(`[RAG] Site config: ${chunks.length} chunks`)
  return chunks
}

function main(): void {
  const allChunks: RagChunk[] = [
    ...processBlogPosts(),
    ...processPages(),
    ...processPortfolio(),
    ...processTestimonials(),
    ...processPricingConfig(),
    ...processSiteConfig(),
  ]

  const outputDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allChunks, null, 2))

  const categories = new Map<string, number>()
  for (const chunk of allChunks) {
    categories.set(chunk.category, (categories.get(chunk.category) ?? 0) + 1)
  }

  console.log('\n[RAG] === Build Summary ===')
  console.log(`[RAG] Total chunks: ${allChunks.length}`)
  console.log(`[RAG] Total sources: ${new Set(allChunks.map((c) => c.source)).size}`)
  for (const [cat, count] of categories) {
    console.log(`[RAG]   ${cat}: ${count} chunks`)
  }
  console.log(`[RAG] Output: ${OUTPUT_PATH}`)
  console.log(`[RAG] File size: ${(fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1)} KB`)
}

main()
