import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { chatMessageSchema } from '@/lib/validation/schemas/chat-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { searchRag } from '@/lib/rag-search'
import { generateResponse } from '@/lib/llm'
import { sendEmail } from '@/lib/email'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'
const MAX_MESSAGES_PER_CONVERSATION = 50
const FLAG_KEYWORDS = /pricing|urgent|dring|hitno|cijena|preis|human|čovjek|mensch|contact.*us|javite.*se/i

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'chat', { windowMs: 60_000, maxRequests: 30 })
  if (rateLimited) return rateLimited

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = chatMessageSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const data = parseResult.data
  let conversationId = data.conversationId

  // Get or create conversation
  if (conversationId) {
    const existing = db.select().from(schema.chatConversations)
      .where(eq(schema.chatConversations.id, conversationId))
      .get()

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
    }

    if (existing.messageCount >= MAX_MESSAGES_PER_CONVERSATION) {
      return NextResponse.json({
        success: false,
        error: 'Conversation limit reached. Start a new conversation or contact us directly.',
      }, { status: 400 })
    }
  } else {
    conversationId = randomUUID()
    db.insert(schema.chatConversations).values({
      id: conversationId,
      language: data.language,
      ip,
    }).run()
  }

  // Store user message
  db.insert(schema.chatMessages).values({
    id: generateId('msg'),
    conversationId,
    role: 'user',
    content: data.message,
  }).run()

  // RAG search
  const ragResults = searchRag(data.message, data.language, 3)
  const context = ragResults.map((r) => r.chunk.source)

  // Generate response
  const llmResult = await generateResponse({
    message: data.message,
    context,
    language: data.language,
  })

  // Store assistant message
  db.insert(schema.chatMessages).values({
    id: generateId('msg'),
    conversationId,
    role: 'assistant',
    content: llmResult.response,
    sources: JSON.stringify(llmResult.sources),
  }).run()

  // Update conversation message count
  const currentConv = db.select().from(schema.chatConversations)
    .where(eq(schema.chatConversations.id, conversationId))
    .get()

  const newCount = (currentConv?.messageCount ?? 0) + 2

  db.update(schema.chatConversations)
    .set({
      messageCount: newCount,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.chatConversations.id, conversationId))
    .run()

  // Follow-up heuristic: flag conversations mentioning pricing/urgent/human
  if (FLAG_KEYWORDS.test(data.message)) {
    db.update(schema.chatConversations)
      .set({
        flagged: true,
        flagReason: 'Keyword match: ' + data.message.slice(0, 100),
      })
      .where(eq(schema.chatConversations.id, conversationId))
      .run()

    sendEmail({
      to: TEAM_EMAIL,
      subject: `[Version2 Chat] Flagged conversation — ${conversationId.slice(0, 8)}`,
      html: `<p>A chat conversation was flagged for follow-up.</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Conversation:</strong> ${conversationId}</p>`,
    }).catch((err) => console.error('[Chat] Flag email failed:', err))
  }

  return NextResponse.json({
    conversationId,
    response: llmResult.response,
    sources: llmResult.sources,
  })
}
