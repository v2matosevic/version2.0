export type Language = 'en' | 'hr' | 'de'

export type TranslationKey = string

export type LocalizedString = Record<Language, string>

export type UIStrings = {
  nav: Record<string, string>
  action: Record<string, string>
  form: Record<string, string>
  blog: Record<string, string>
  general: Record<string, string>
  footer: Record<string, string>
  a11y: Record<string, string>
}
