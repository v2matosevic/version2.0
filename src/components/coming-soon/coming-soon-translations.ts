type ComingSoonStrings = {
  headline: [string, string]
  reachUs: string
  sendMessage: string
  services: string[]
  copyright: string
  tagline: string
}

const TRANSLATIONS: Record<string, ComingSoonStrings> = {
  en: {
    headline: ['New website', 'in progress.'],
    reachUs: 'In the meantime, reach us at:',
    sendMessage: 'Send a message',
    services: ['Web Design', 'Web Applications', 'E-Commerce', 'AI Integration', 'SEO'],
    copyright: `\u00A9 ${new Date().getFullYear()} Version2 j.d.o.o.`,
    tagline: 'Crafted with precision in Zadar.',
  },
  hr: {
    headline: ['Nova web stranica', 'u izradi.'],
    reachUs: 'U me\u0111uvremenu, kontaktirajte nas:',
    sendMessage: 'Po\u0161aljite poruku',
    services: ['Web Dizajn', 'Web Aplikacije', 'E-Trgovina', 'AI Integracija', 'SEO'],
    copyright: `\u00A9 ${new Date().getFullYear()} Version2 j.d.o.o.`,
    tagline: 'Izra\u0111eno s precizno\u0161\u0107u u Zadru.',
  },
  de: {
    headline: ['Neue Website', 'im Aufbau.'],
    reachUs: 'In der Zwischenzeit erreichen Sie uns unter:',
    sendMessage: 'Nachricht senden',
    services: ['Webdesign', 'Webanwendungen', 'E-Commerce', 'KI-Integration', 'SEO'],
    copyright: `\u00A9 ${new Date().getFullYear()} Version2 j.d.o.o.`,
    tagline: 'Mit Pr\u00E4zision in Zadar gefertigt.',
  },
}

function getComingSoonStrings(lang: string): ComingSoonStrings {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en
}

export { getComingSoonStrings }
export type { ComingSoonStrings }
