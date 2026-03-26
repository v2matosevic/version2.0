import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

const timestamps = {
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`),
}

export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull().default('contact'),
  websiteUrl: text('website_url'),
  language: text('language').notNull().default('en'),
  ip: text('ip'),
  ...timestamps,
})

export const pricingLeads = sqliteTable('pricing_leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message'),
  language: text('language').notNull().default('en'),
  selections: text('selections').notNull(),
  clientEstimate: text('client_estimate').notNull(),
  serverEstimate: text('server_estimate').notNull(),
  hasMismatch: integer('has_mismatch', { mode: 'boolean' }).notNull().default(false),
  ip: text('ip'),
  ...timestamps,
})

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  contactMethod: text('contact_method').notNull(),
  description: text('description'),
  language: text('language').notNull().default('en'),
  status: text('status').notNull().default('confirmed'),
  ip: text('ip'),
  ...timestamps,
})

export const careerApps = sqliteTable('career_apps', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  portfolioUrl: text('portfolio_url'),
  message: text('message').notNull(),
  language: text('language').notNull().default('en'),
  ip: text('ip'),
  ...timestamps,
})

export const chatConversations = sqliteTable('chat_conversations', {
  id: text('id').primaryKey(),
  language: text('language').notNull().default('en'),
  messageCount: integer('message_count').notNull().default(0),
  flagged: integer('flagged', { mode: 'boolean' }).notNull().default(false),
  flagReason: text('flag_reason'),
  ip: text('ip'),
  ...timestamps,
})

export const chatMessages = sqliteTable('chat_messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id')
    .notNull()
    .references(() => chatConversations.id),
  role: text('role').notNull(),
  content: text('content').notNull(),
  sources: text('sources'),
  ...timestamps,
})

export const analyticsEvents = sqliteTable('analytics_events', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  page: text('page').notNull(),
  data: text('data'),
  sessionId: text('session_id').notNull(),
  timestamp: text('timestamp').notNull(),
  ip: text('ip'),
  ...timestamps,
})

export const blogDrafts = sqliteTable('blog_drafts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  language: text('language').notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  category: text('category'),
  tags: text('tags'),
  featuredImage: text('featured_image'),
  status: text('status').notNull().default('draft'),
  ...timestamps,
})

export const buildLogs = sqliteTable('build_logs', {
  id: text('id').primaryKey(),
  status: text('status').notNull().default('running'),
  stdout: text('stdout'),
  stderr: text('stderr'),
  durationMs: integer('duration_ms'),
  triggeredBy: text('triggered_by'),
  ...timestamps,
})

export const adminSessions = sqliteTable('admin_sessions', {
  id: text('id').primaryKey(),
  sessionHash: text('session_hash').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  lastSeenAt: text('last_seen_at'),
  revokedAt: text('revoked_at'),
  ip: text('ip'),
  userAgent: text('user_agent'),
  ...timestamps,
})

export const rateLimitWindows = sqliteTable('rate_limit_windows', {
  keyHash: text('key_hash').primaryKey(),
  endpoint: text('endpoint').notNull(),
  hits: integer('hits').notNull().default(1),
  windowStartedAt: text('window_started_at').notNull(),
  expiresAt: text('expires_at').notNull(),
  ...timestamps,
})

export const securityEvents = sqliteTable('security_events', {
  id: text('id').primaryKey(),
  eventType: text('event_type').notNull(),
  level: text('level').notNull().default('info'),
  ip: text('ip'),
  userAgent: text('user_agent'),
  details: text('details'),
  ...timestamps,
})

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  trackingNumber: text('tracking_number'),
  carrier: text('carrier'),
  currentStatus: text('current_status').notNull().default('pending'),
  language: text('language').notNull().default('en'),
  notes: text('notes'),
  ...timestamps,
})

export const trackingEvents = sqliteTable('tracking_events', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  status: text('status').notNull(),
  location: text('location'),
  description: text('description'),
  eventTime: text('event_time').notNull(),
  ...timestamps,
})
