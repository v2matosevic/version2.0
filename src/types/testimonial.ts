import type { LocalizedString } from './i18n'

export type Testimonial = {
  id: string
  quote: LocalizedString
  name: string
  role: string
  company: string
  industry: string
  stars: number
  tags: string[]
  featured: boolean
}

export type TestimonialsData = {
  testimonials: Testimonial[]
}
