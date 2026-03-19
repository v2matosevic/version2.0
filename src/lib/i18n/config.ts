import type { Language } from '@/types/i18n'

export const LANGUAGES: Language[] = ['en', 'hr', 'de']

export const DEFAULT_LANGUAGE: Language = 'en'

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hr: 'Hrvatski',
  de: 'Deutsch',
}

export const LANGUAGE_LOCALES: Record<Language, string> = {
  en: 'en-US',
  hr: 'hr-HR',
  de: 'de-DE',
}
