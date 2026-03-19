import type { Language, UIStrings } from '@/types/i18n'
import { translations as en } from './translations/en'
import { translations as hr } from './translations/hr'
import { translations as de } from './translations/de'

const ALL_TRANSLATIONS: Record<Language, UIStrings> = { en, hr, de }

export function getTranslations(lang: Language): UIStrings {
  return ALL_TRANSLATIONS[lang] ?? ALL_TRANSLATIONS.en
}

export function t(key: string, lang: Language): string {
  const strings = getTranslations(lang)
  const parts = key.split('.')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = strings
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      // Fallback to English
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = ALL_TRANSLATIONS.en
      for (const p of parts) {
        if (fallback && typeof fallback === 'object' && p in fallback) {
          fallback = fallback[p]
        } else {
          return key
        }
      }
      return typeof fallback === 'string' ? fallback : key
    }
  }

  return typeof current === 'string' ? current : key
}
