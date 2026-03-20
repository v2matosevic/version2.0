import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown } from '@/lib/content/parse-markdown'
import type { Language } from '@/types/i18n'

const PORTFOLIO_DIR = path.join(process.cwd(), 'content', 'portfolio')
const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'portfolio', 'screenshots')

type CaseStudyFrontmatter = {
  slug: string
  title: string
  client: string
  industry: string
  year: number
  services: string[]
  tech: string[]
  url: string
  featured: boolean
  grid_size: string
  hero_image: string
  summary: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  translations?: Record<string, string>
}

type CaseStudy = {
  frontmatter: CaseStudyFrontmatter
  html: string
}

const PORTFOLIO_SLUGS = [
  'misha-gashi',
  'village-homes-drage',
  'adria-escape',
  'villa-nadja-tamaris',
  'fiore-paklenica',
  'sima-office',
] as const

async function getCaseStudy(slug: string, lang: Language): Promise<CaseStudy | null> {
  const filePath = path.join(PORTFOLIO_DIR, slug, `${lang}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = await parseMarkdown<CaseStudyFrontmatter>(raw)

  return {
    frontmatter: parsed.frontmatter,
    html: parsed.html,
  }
}

function getPortfolioSlugs(): string[] {
  return [...PORTFOLIO_SLUGS]
}

function getPortfolioScreenshots(slug: string): string[] {
  const dir = path.join(SCREENSHOTS_DIR, slug)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
    .sort()
    .map((file) => `/portfolio/screenshots/${slug}/${file}`)
}

export { getCaseStudy, getPortfolioSlugs, getPortfolioScreenshots }
export type { CaseStudy, CaseStudyFrontmatter }
