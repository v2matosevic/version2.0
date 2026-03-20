type LlmRequest = {
  message: string
  context: string[]
  language: string
}

type LlmResponse = {
  response: string
  sources: string[]
}

const FALLBACK_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    greeting: "Hi! I'm the Version2 assistant. I can help you with questions about our web development services, pricing, and how we work. What would you like to know?",
    services: "We specialize in custom web development: websites, web applications, e-commerce stores, SEO optimization, and AI integrations. Each project is built from scratch with React, Next.js, and TypeScript. Would you like to know more about a specific service?",
    pricing: "Our projects start at €2,500 for a landing page and scale based on complexity. You can use our interactive pricing calculator at /pricing/ for a detailed estimate, or contact us for a custom quote.",
    default: "Thanks for your message! I can help with questions about our services, pricing, process, or booking a consultation. For complex inquiries, our team responds within 24 hours at info@version2.hr.",
  },
  hr: {
    greeting: "Bok! Ja sam Version2 asistent. Mogu vam pomoći s pitanjima o našim uslugama web razvoja, cijenama i načinu rada. Što vas zanima?",
    services: "Specijalizirani smo za izradu prilagođenih web rješenja: web stranice, web aplikacije, e-commerce trgovine, SEO optimizaciju i AI integracije. Svaki projekt gradimo od nule koristeći React, Next.js i TypeScript.",
    pricing: "Naši projekti počinju od €2.500 za landing stranicu. Koristite naš interaktivni kalkulator cijena na /hr/cijene/ za detaljnu procjenu.",
    default: "Hvala na poruci! Mogu pomoći s pitanjima o uslugama, cijenama, procesu rada ili rezervaciji konzultacije. Za složenije upite, naš tim odgovara unutar 24 sata na info@version2.hr.",
  },
  de: {
    greeting: "Hallo! Ich bin der Version2-Assistent. Ich kann Ihnen bei Fragen zu unseren Webentwicklungsdiensten, Preisen und unserer Arbeitsweise helfen. Was möchten Sie wissen?",
    services: "Wir sind spezialisiert auf maßgeschneiderte Webentwicklung: Websites, Webanwendungen, E-Commerce-Shops, SEO-Optimierung und KI-Integrationen.",
    pricing: "Unsere Projekte beginnen bei €2.500 für eine Landing Page. Nutzen Sie unseren interaktiven Preiskalkulator unter /de/preise/ für eine detaillierte Schätzung.",
    default: "Vielen Dank für Ihre Nachricht! Ich kann bei Fragen zu Dienstleistungen, Preisen, Prozessen oder Beratungsterminen helfen. Unser Team antwortet innerhalb von 24 Stunden unter info@version2.hr.",
  },
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase()
  if (/^(hi|hello|hey|bok|hallo|pozdrav)/i.test(lower)) return 'greeting'
  if (/service|uslug|dienst|web.*design|develop|izradi|entwickl/i.test(lower)) return 'services'
  if (/pric|cost|cijena|preis|how much|koliko|wieviel|€|eur/i.test(lower)) return 'pricing'
  return 'default'
}

/**
 * LLM stub — returns helpful fallback responses based on RAG context.
 * Will be replaced with real LLM provider later.
 */
export async function generateResponse(request: LlmRequest): Promise<LlmResponse> {
  const lang = request.language in FALLBACK_RESPONSES ? request.language : 'en'
  const responses = FALLBACK_RESPONSES[lang]
  const intent = detectIntent(request.message)

  let response = responses[intent] ?? responses.default

  // If we have RAG context, enrich the response
  if (request.context.length > 0) {
    const contextNote = lang === 'hr'
      ? '\n\nMožda će vam koristiti i ovi resursi:'
      : lang === 'de'
        ? '\n\nDiese Ressourcen könnten auch hilfreich sein:'
        : '\n\nYou might also find these resources helpful:'
    response += contextNote
  }

  return {
    response,
    sources: request.context,
  }
}
