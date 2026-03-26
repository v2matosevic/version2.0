import { loadSiteConfig } from '@/lib/content/load-site-config'
import type { Language } from '@/types/i18n'

type NavMenuItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export function getMenuItems(lang: Language): NavMenuItem[] {
  const config = loadSiteConfig()
  return config.navigation.menu.map((item) => ({
    label: item.label[lang] ?? item.label.en,
    href: item.url[lang] ?? item.url.en,
    children: item.children?.map((child) => ({
      label: child.label[lang] ?? child.label.en,
      href: child.url[lang] ?? child.url.en,
    })),
  }))
}

export type { NavMenuItem }
