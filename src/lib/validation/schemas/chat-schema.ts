import { z } from 'zod'
import { languageField } from '../fields'
import { FIELD_LIMITS } from '../constants'

export const chatMessageSchema = z.object({
  conversationId: z
    .string()
    .uuid({ error: 'Invalid conversation ID' })
    .optional(),
  message: z
    .string({ error: 'Message is required' })
    .trim()
    .min(1, { error: 'Message cannot be empty' })
    .max(FIELD_LIMITS.CHAT_MESSAGE_MAX, { error: 'Message cannot exceed 1000 characters' }),
  language: languageField,
})

export type ChatMessageData = z.infer<typeof chatMessageSchema>
