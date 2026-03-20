'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LANGUAGES } from '@/lib/i18n/config'
import { translatePath } from '@/lib/i18n/route-map'
import type { Language } from '@/types/i18n'

type LanguageSwitcherProps = {
  currentLang: Language
}

const LANG_SHORT: Record<Language, string> = {
  en: 'EN',
  hr: 'HR',
  de: 'DE',
}

function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()

  return (
    <div role="radiogroup" aria-label="Language" className="flex items-center gap-1">
      {LANGUAGES.map((lang) => {
        const isActive = lang === currentLang
        const href = translatePath(pathname, lang)

        return (
          <Link
            key={lang}
            href={href}
            role="radio"
            aria-checked={isActive}
            className={[
              'px-2 py-1 rounded-md text-sm font-body transition-colors',
              isActive
                ? 'text-foreground bg-raised'
                : 'text-faint hover:text-foreground',
            ].join(' ')}
          >
            {LANG_SHORT[lang]}
          </Link>
        )
      })}
    </div>
  )
}

export { LanguageSwitcher }
export type { LanguageSwitcherProps }
