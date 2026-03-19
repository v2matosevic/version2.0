import type { Language } from '@/types/i18n'

/**
 * Resolves a content file path based on language.
 * Content files are organized as: content/{type}/{slug}/{lang}.md
 */
export function getContentPath(type: 'blog' | 'pages', slug: string, lang: Language): string {
  return `content/${type}/${slug}/${lang}.md`
}

/**
 * Given a path, detect which language it belongs to.
 * Returns 'en' for root paths, 'hr' for /hr/ prefix, 'de' for /de/ prefix.
 */
export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/hr/') || pathname === '/hr') return 'hr'
  if (pathname.startsWith('/de/') || pathname === '/de') return 'de'
  return 'en'
}
