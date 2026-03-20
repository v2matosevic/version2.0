export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 5000,
  URL_MAX: 500,
  CHAT_MESSAGE_MAX: 1000,
  HONEYPOT_FIELD: '_honey',
} as const

export const SUPPORTED_LANGUAGES = ['en', 'hr', 'de'] as const

export const CONTACT_METHODS = ['email', 'whatsapp', 'phone'] as const

export const PROJECT_TYPES = ['website', 'webshop', 'webapp'] as const

export const SCOPE_OPTIONS = [
  'landing', 'business', 'corporate', 'enterprise',
  'starter', 'growing',
  'simple', 'complex',
] as const

export const DESIGN_OPTIONS = ['reference', 'custom', 'brand'] as const

export const TIMELINE_OPTIONS = ['flexible', 'standard', 'priority'] as const

export const MAINTENANCE_TIERS = [
  'maintenance_none',
  'maintenance_basic',
  'maintenance_standard',
  'maintenance_premium',
] as const
