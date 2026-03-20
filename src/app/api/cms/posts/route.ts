import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { generateId } from '@/lib/generate-id'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

const createDraftSchema = z.object({
  slug: z.string().min(1).max(200),
  language: z.enum(['en', 'hr', 'de']),
  title: z.string().min(1).max(500),
  excerpt: z.string().max(1000).optional(),
  content: z.string().min(1),
  category: z.string().max(100).optional(),
  tags: z.string().max(500).optional(),
  featuredImage: z.string().max(500).optional(),
})

export function GET(request: NextRequest): NextResponse {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  const { searchParams } = new URL(request.url)
  const language = searchParams.get('language')

  let drafts
  if (language) {
    drafts = db.select().from(schema.blogDrafts).where(eq(schema.blogDrafts.language, language)).all()
  } else {
    drafts = db.select().from(schema.blogDrafts).all()
  }

  return NextResponse.json({ drafts })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = createDraftSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const data = parseResult.data
  const id = generateId('draft')

  db.insert(schema.blogDrafts).values({
    id,
    slug: data.slug,
    language: data.language,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    tags: data.tags,
    featuredImage: data.featuredImage,
  }).run()

  return NextResponse.json({ success: true, id })
}
