import { z } from 'zod'
import { nameField, emailField, messageField, optionalMessageField, urlField, honeypotField, languageField } from '../fields'

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  message: messageField,
  _honey: honeypotField,
})

export const contactPayloadSchema = contactSchema.extend({
  type: z.enum(['contact', 'analysis']).default('contact'),
  websiteUrl: urlField.optional(),
  language: languageField,
})

export const analysisSchema = z.object({
  name: nameField,
  email: emailField,
  websiteUrl: urlField,
  message: optionalMessageField,
  _honey: honeypotField,
})

export const analysisPayloadSchema = analysisSchema.extend({
  type: z.literal('analysis'),
  language: languageField,
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ContactPayload = z.infer<typeof contactPayloadSchema>
export type AnalysisFormData = z.infer<typeof analysisSchema>
export type AnalysisPayload = z.infer<typeof analysisPayloadSchema>
