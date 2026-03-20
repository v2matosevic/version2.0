import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { trackParcel, type Carrier } from '@/lib/scrapers/track'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

type RouteParams = { params: Promise<{ trackingNumber: string }> }

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'tracking', { windowMs: 60_000, maxRequests: 10 })
  if (rateLimited) return rateLimited

  const { trackingNumber } = await params

  // Look up order in DB to find the carrier
  const order = db.select()
    .from(schema.orders)
    .where(eq(schema.orders.trackingNumber, trackingNumber))
    .get()

  if (!order || !order.carrier) {
    return NextResponse.json({
      success: false,
      error: 'Tracking number not found. Please check the number and try again.',
    }, { status: 404 })
  }

  const result = await trackParcel(trackingNumber, order.carrier as Carrier)

  // Update order status if scraping was successful
  if (result.success && result.currentStatus !== order.currentStatus) {
    db.update(schema.orders)
      .set({
        currentStatus: result.currentStatus,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.orders.id, order.id))
      .run()
  }

  return NextResponse.json({
    trackingNumber,
    carrier: order.carrier,
    customerName: order.customerName,
    currentStatus: result.success ? result.currentStatus : order.currentStatus,
    events: result.events,
    lastUpdated: new Date().toISOString(),
  })
}
