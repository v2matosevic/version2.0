export type PortfolioProject = {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  category: string
  services: string[]
  tech: string[]
  year: number
  featured: boolean
  thumbnail: string
  screenshots: string[]
}

export type CaseStudy = PortfolioProject & {
  challenge: string
  solution: string
  results: string[]
  testimonialId?: string
  content: string
  html: string
}
