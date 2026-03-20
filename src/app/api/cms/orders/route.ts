import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { generateId } from '@/lib/generate-id'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

const createOrderSchema = z.object({
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email(),
  trackingNumber: z.string().max(100).optional(),
  carrier: z.enum(['hrvatska-posta', 'gls', 'dpd']).optional(),
  language: z.enum(['en', 'hr', 'de']).default('en'),
  notes: z.string().max(2000).optional(),
})

export function GET(request: NextRequest): NextResponse {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { searchParams } = new URL(request.url)
  const statusFilter = searchParams.get('status')

  let orders
  if (statusFilter) {
    orders = db.select().from(schema.orders).where(eq(schema.orders.currentStatus, statusFilter)).all()
  } else {
    orders = db.select().from(schema.orders).all()
  }

  return NextResponse.json({ orders })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = createOrderSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const data = parseResult.data
  const id = generateId('ord')

  db.insert(schema.orders).values({
    id,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    trackingNumber: data.trackingNumber,
    carrier: data.carrier,
    language: data.language,
    notes: data.notes,
  }).run()

  return NextResponse.json({ success: true, id })
}
