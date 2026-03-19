import fs from 'node:fs'
import path from 'node:path'

const PORTFOLIO_PATH = path.join(process.cwd(), 'content', 'portfolio', 'portfolio-homepage.json')

type PortfolioHomepageData = {
  featured: Array<{
    slug: string
    name: Record<string, string>
    industry: Record<string, string>
    tech_highlights: string[]
    image: string
    grid_size: string
  }>
}

let cachedData: PortfolioHomepageData | null = null

export function loadPortfolioFeatured(): PortfolioHomepageData['featured'] {
  if (cachedData) return cachedData.featured

  const raw = fs.readFileSync(PORTFOLIO_PATH, 'utf-8')
  cachedData = JSON.parse(raw) as PortfolioHomepageData

  return cachedData.featured
}
