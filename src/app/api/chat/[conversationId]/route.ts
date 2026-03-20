import { NextRequest, NextResponse } from 'next/server'
import { eq, asc } from 'drizzle-orm'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

type RouteParams = { params: Promise<{ conversationId: string }> }

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'chat', { windowMs: 60_000, maxRequests: 30 })
  if (rateLimited) return rateLimited

  const { conversationId } = await params

  const conversation = db.select().from(schema.chatConversations)
    .where(eq(schema.chatConversations.id, conversationId))
    .get()

  if (!conversation) {
    return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
  }

  // Verify the requesting IP matches the conversation creator
  if (conversation.ip && conversation.ip !== ip) {
    return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
  }

  const messages = db.select({
    role: schema.chatMessages.role,
    content: schema.chatMessages.content,
    sources: schema.chatMessages.sources,
    createdAt: schema.chatMessages.createdAt,
  })
    .from(schema.chatMessages)
    .where(eq(schema.chatMessages.conversationId, conversationId))
    .orderBy(asc(schema.chatMessages.createdAt))
    .all()

  return NextResponse.json({
    conversationId,
    language: conversation.language,
    messages: messages.map((m) => ({
      ...m,
      sources: m.sources ? JSON.parse(m.sources) : [],
    })),
  })
}
