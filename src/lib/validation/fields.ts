import { z } from 'zod'
import { FIELD_LIMITS, SUPPORTED_LANGUAGES } from './constants'

export const nameField = z
  .string({ error: 'Name is required' })
  .trim()
  .min(FIELD_LIMITS.NAME_MIN, { error: 'Name must be at least 2 characters' })
  .max(FIELD_LIMITS.NAME_MAX, { error: 'Name cannot exceed 100 characters' })

export const emailField = z
  .string({ error: 'Email is required' })
  .trim()
  .email({ error: 'Please enter a valid email address' })
  .max(FIELD_LIMITS.EMAIL_MAX, { error: 'Email cannot exceed 254 characters' })
  .transform((val) => val.toLowerCase())

export const messageField = z
  .string({ error: 'Message is required' })
  .trim()
  .min(FIELD_LIMITS.MESSAGE_MIN, { error: 'Message must be at least 10 characters' })
  .max(FIELD_LIMITS.MESSAGE_MAX, { error: 'Message cannot exceed 5000 characters' })

export const optionalMessageField = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(
    z.union([
      z.undefined(),
      z
        .string()
        .min(FIELD_LIMITS.MESSAGE_MIN, { error: 'If provided, message must be at least 10 characters' })
        .max(FIELD_LIMITS.MESSAGE_MAX, { error: 'Message cannot exceed 5000 characters' }),
    ]),
  )

export const urlField = z
  .string({ error: 'URL is required' })
  .trim()
  .url({ error: 'Please enter a valid URL' })
  .max(FIELD_LIMITS.URL_MAX, { error: 'URL cannot exceed 500 characters' })

export const optionalUrlField = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(
    z.union([
      z.undefined(),
      z
        .string()
        .url({ error: 'Please enter a valid URL' })
        .max(FIELD_LIMITS.URL_MAX, { error: 'URL cannot exceed 500 characters' }),
    ]),
  )

export const languageField = z.enum(SUPPORTED_LANGUAGES, {
  error: 'Language must be one of: en, hr, de',
})

export const honeypotField = z
  .string()
  .max(0)
  .optional()
  .default('')
