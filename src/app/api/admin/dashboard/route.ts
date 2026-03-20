import { NextRequest, NextResponse } from 'next/server'
import { sql, desc } from 'drizzle-orm'
import { validateAdminCookie } from '@/lib/admin-auth'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

export function GET(request: NextRequest): NextResponse {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  if (!dbReady) {
    ensureDatabase()
    dbReady = true
  }

  const today = new Date().toISOString().split('T')[0]

  // Aggregate counts
  const viewsToday = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.analyticsEvents)
    .where(
      sql`${schema.analyticsEvents.type} = 'page_view'
          AND date(${schema.analyticsEvents.timestamp}) = ${today}`,
    )
    .get()

  const viewsWeek = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.analyticsEvents)
    .where(
      sql`${schema.analyticsEvents.type} = 'page_view'
          AND date(${schema.analyticsEvents.timestamp}) >= date('now', '-7 days')`,
    )
    .get()

  const totalContacts = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.contacts)
    .get()

  const totalOrders = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.orders)
    .get()

  const totalBookings = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.bookings)
    .get()

  const totalDrafts = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.blogDrafts)
    .get()

  // Recent lists
  const recentContacts = db
    .select({
      id: schema.contacts.id,
      name: schema.contacts.name,
      email: schema.contacts.email,
      type: schema.contacts.type,
      createdAt: schema.contacts.createdAt,
    })
    .from(schema.contacts)
    .orderBy(desc(schema.contacts.createdAt))
    .limit(5)
    .all()

  const recentOrders = db
    .select({
      id: schema.orders.id,
      customerName: schema.orders.customerName,
      currentStatus: schema.orders.currentStatus,
      createdAt: schema.orders.createdAt,
    })
    .from(schema.orders)
    .orderBy(desc(schema.orders.createdAt))
    .limit(5)
    .all()

  const upcomingBookings = db
    .select({
      id: schema.bookings.id,
      name: schema.bookings.name,
      date: schema.bookings.date,
      time: schema.bookings.time,
      status: schema.bookings.status,
    })
    .from(schema.bookings)
    .where(sql`${schema.bookings.date} >= date('now')`)
    .orderBy(schema.bookings.date)
    .limit(5)
    .all()

  return NextResponse.json({
    success: true,
    viewsToday: viewsToday?.count ?? 0,
    viewsWeek: viewsWeek?.count ?? 0,
    totalContacts: totalContacts?.count ?? 0,
    totalOrders: totalOrders?.count ?? 0,
    totalBookings: totalBookings?.count ?? 0,
    totalDrafts: totalDrafts?.count ?? 0,
    recentContacts,
    recentOrders,
    upcomingBookings,
  })
}
