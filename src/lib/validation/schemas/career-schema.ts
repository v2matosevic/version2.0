import { z } from 'zod'
import { nameField, emailField, messageField, optionalUrlField, honeypotField, languageField } from '../fields'

export const careerSchema = z.object({
  name: nameField,
  email: emailField,
  portfolioUrl: optionalUrlField,
  message: messageField,
  _honey: honeypotField,
})

export const careerPayloadSchema = careerSchema.extend({
  language: languageField,
})

export type CareerFormData = z.infer<typeof careerSchema>
export type CareerPayload = z.infer<typeof careerPayloadSchema>
