import type { Language, LocalizedString } from './i18n'

export type NavItem = {
  label: LocalizedString
  url: Record<Language, string>
  children?: NavItem[]
}

export type Navigation = {
  header: NavItem[]
  menu: NavItem[]
  footer: {
    services: NavItem[]
    company: NavItem[]
    legal: NavItem[]
  }
}

export type SiteConfig = {
  site: {
    name: string
    url: string
    tagline: string
    description: string
    languages: Language[]
    defaultLanguage: Language
  }
  business: {
    legalName: string
    director: string
    oib: string
    mbs: string
    courtRegistration: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
    banking: {
      bank: string
      iban: string
      swift: string
    }
  }
  contact: {
    email: string
    phone: string
    whatsapp: string
  }
  social: Record<string, string>
  navigation: Navigation
}
