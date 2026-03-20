import { z } from 'zod'
import {
  nameField,
  emailField,
  optionalMessageField,
  honeypotField,
  languageField,
} from '../fields'
import { CONTACT_METHODS } from '../constants'

const bookingDateField = z
  .string({ error: 'Please select a date' })
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'Date must be in YYYY-MM-DD format' })
  .refine(
    (val) => {
      const date = new Date(val + 'T12:00:00Z')
      const day = date.getUTCDay()
      return day === 3 || day === 4 || day === 5
    },
    { error: 'Bookings are only available on Wednesday, Thursday, and Friday' },
  )
  .refine(
    (val) => {
      const date = new Date(val + 'T12:00:00Z')
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setDate(minDate.getDate() + 2)
      const maxDate = new Date(today)
      maxDate.setDate(maxDate.getDate() + 14)
      return date >= minDate && date <= maxDate
    },
    { error: 'Bookings must be 2-14 days in advance' },
  )

const bookingTimeField = z
  .string({ error: 'Please select a time slot' })
  .regex(/^\d{2}:\d{2}$/, { error: 'Time must be in HH:MM format' })
  .refine(
    (val) => ['14:00', '14:45', '15:30', '16:15'].includes(val),
    { error: 'Please select a valid time slot (14:00, 14:45, 15:30, or 16:15)' },
  )

const contactMethodField = z.enum(CONTACT_METHODS, {
  error: 'Please select a contact method: email, whatsapp, or phone',
})

export const bookingSchema = z.object({
  name: nameField,
  email: emailField,
  date: bookingDateField,
  time: bookingTimeField,
  contactMethod: contactMethodField,
  description: optionalMessageField,
  _honey: honeypotField,
})

export const bookingPayloadSchema = bookingSchema.extend({
  language: languageField,
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type BookingPayload = z.infer<typeof bookingPayloadSchema>
