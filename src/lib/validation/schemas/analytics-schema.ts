import { z } from 'zod'

const EVENT_TYPES = ['page_view', 'click', 'scroll_depth', 'time_on_page', 'conversion'] as const

const analyticsEventSchema = z.object({
  type: z.enum(EVENT_TYPES, { error: 'Invalid event type' }),
  page: z.string().min(1).max(500),
  data: z.record(z.string(), z.unknown()).optional(),
  sessionId: z.string().min(1).max(100),
  timestamp: z.string().min(1),
})

export const analyticsEventsSchema = z.object({
  events: z.array(analyticsEventSchema).min(1).max(50),
})

export type AnalyticsEventData = z.infer<typeof analyticsEventSchema>
export type AnalyticsEventsPayload = z.infer<typeof analyticsEventsSchema>
