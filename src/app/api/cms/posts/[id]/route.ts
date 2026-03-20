import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

type RouteParams = { params: Promise<{ id: string }> }

const updateDraftSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(500).optional(),
  excerpt: z.string().max(1000).optional(),
  content: z.string().min(1).optional(),
  category: z.string().max(100).optional(),
  tags: z.string().max(500).optional(),
  featuredImage: z.string().max(500).optional(),
  status: z.enum(['draft', 'published']).optional(),
})

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { id } = await params
  const draft = db.select().from(schema.blogDrafts).where(eq(schema.blogDrafts.id, id)).get()

  if (!draft) {
    return NextResponse.json({ success: false, error: 'Draft not found' }, { status: 404 })
  }

  return NextResponse.json({ draft })
}

export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = updateDraftSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const existing = db.select().from(schema.blogDrafts).where(eq(schema.blogDrafts.id, id)).get()
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Draft not found' }, { status: 404 })
  }

  const data = parseResult.data
  db.update(schema.blogDrafts)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.blogDrafts.id, id))
    .run()

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { id } = await params

  const existing = db.select().from(schema.blogDrafts).where(eq(schema.blogDrafts.id, id)).get()
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Draft not found' }, { status: 404 })
  }

  db.delete(schema.blogDrafts).where(eq(schema.blogDrafts.id, id)).run()

  return NextResponse.json({ success: true })
}
