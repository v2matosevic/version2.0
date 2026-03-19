import fs from 'node:fs'
import path from 'node:path'
import type { TestimonialsData } from '@/types/testimonial'

const TESTIMONIALS_PATH = path.join(process.cwd(), 'content', 'testimonials.json')

let cachedData: TestimonialsData | null = null

export function loadTestimonials(): TestimonialsData {
  if (cachedData) return cachedData

  const raw = fs.readFileSync(TESTIMONIALS_PATH, 'utf-8')
  cachedData = JSON.parse(raw) as TestimonialsData

  return cachedData
}
