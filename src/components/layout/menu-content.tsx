'use client'

import { X } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { MenuNavLink } from '@/components/layout/menu-nav-link'
import type { Language } from '@/types/i18n'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type MenuContentProps = {
  onClose: () => void
  lang: Language
  navItems: NavMenuItem[]
  isMobile: boolean
}

function MenuContent({ onClose, lang, navItems, isMobile }: MenuContentProps) {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="text-foreground hover:text-brand-red transition-colors p-1"
          aria-label="Close navigation menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <MenuNavLink key={item.href} item={item} onClose={onClose} isMobile={isMobile} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-6 pt-8 border-t border-line-subtle">
        <div className="flex flex-col gap-2 text-sm text-muted font-body">
          <a href="mailto:info@version2.hr" className="hover:text-foreground transition-colors">
            info@version2.hr
          </a>
          <a href="tel:+385995617706" className="hover:text-foreground transition-colors">
            +385 99 561 7706
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export { MenuContent }
export type { MenuContentProps }
