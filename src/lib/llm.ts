import { CHAT_TOOLS, executeTool } from '@/lib/chat-tools'

type LlmRequest = {
  message: string
  context: string[]
  language: string
}

type LlmResponse = {
  response: string
  sources: string[]
  toolResults?: Array<{ type: string; data: unknown }>
}

const SYSTEM_PROMPT = `You are Z.AI, the Version2 virtual assistant — a knowledgeable, helpful chat agent for a premium web development studio. You help visitors understand Version2's services, get pricing estimates, book consultations, and find information.

## About Version2

Version2 is a custom web development studio based in Zadar, Croatia. Founded September 2022.
- Legal name: Version2 j.d.o.o.
- Director: Marko Matošević
- Team: Small, in-house. No outsourcing, no templates.
- Location: Novigradska ul. 21, 23000 Zadar, Croatia
- Email: info@version2.hr
- Phone: +385 99 561 7706 (also WhatsApp)
- Business hours: Monday–Friday 09:00–17:00 CET
- Google rating: 5.0 stars from 29 reviews

## Services & Pricing

### Custom Websites
Landing pages from €2,500. Business sites (4–7 pages) €4,500–€8,000. Corporate sites (8–15 pages) €8,000–€14,000. Enterprise sites (15+) €14,000–€25,000.

### E-Commerce / Webshops
Starter stores (up to 50 products) €6,500–€11,000. Growing stores (50–500 products) €11,000–€20,000. Enterprise stores (500+) €20,000–€35,000. Built with Stripe payment integration.

### Web Applications
Simple dashboards/portals €8,000–€17,000. Complex multi-role apps €17,000–€32,000. Enterprise platforms €32,000–€58,000.

### AI Integration
Chatbots, smart search, automation, recommendations. From €1,800.

### SEO Optimization
Technical SEO, content strategy, link building. Audits from €800. Monthly reporting from €200/mo.

### Digital Business Cards
NFC-enabled digital business cards at €29.99. Over 486 users, 4.94 rating.

### 360° Virtual Tours
For real estate and hospitality businesses.

## Process
1. Free consultation call (30 min, online via Zoom)
2. Detailed proposal with scope, timeline, and fixed price
3. Design and development in 4–16 week sprints
4. Launch with full handover and training
5. Ongoing maintenance from €120/month

## Technology Stack
Next.js, React, TypeScript, Tailwind CSS. Three.js for 3D. GSAP for animations. Custom-built from scratch — no WordPress, no page builders, no templates.

## Portfolio Highlights
- **Misha Gashi** — Holistic wellness platform with webshop, blog, booking, and user portal
- **Village Homes Drage** — Real estate platform with interactive plot maps and camp comparison
- **Adria Escape** — Multilingual travel editorial in 5 languages with dark/light theme
- **Villa Nadja & Tamaris** — Luxury rental with booking system and gallery
- **Fiore Paklenica** — Ultra-fast rental site in 6 languages
- **SIMA Office** — Professional services site for Austrian market

## Every Project Includes
Responsive design, basic SEO, contact form, Google Analytics 4, SSL certificate, 1 language, 2 design revision rounds, 30 days post-launch support, cross-browser testing, mobile optimization, Core Web Vitals optimization.

## Key Pages to Direct Users To
- Pricing calculator: /pricing/
- Contact form: /contact/
- Book consultation: /contact/
- Portfolio: /portfolio/
- Services overview: /services/
- Web Design: /services/web-design/
- Web Applications: /services/web-applications/
- E-Commerce: /services/e-commerce/
- AI Integration: /services/ai-integration/
- SEO: /services/seo/
- Blog: /blog/
- Free analysis: /analysis/
- About us: /about/
- Order tracking: /tracking/

## Behavior Rules
- Be helpful, direct, and concise. No corporate fluff.
- When asked about pricing, give real ranges, then suggest /pricing/ for exact estimates.
- When the user seems ready to buy, suggest booking a call at /contact/.
- When you can't answer something, direct to info@version2.hr.
- Never make up information. If unsure, say so.
- Match the user's language. Croatian → respond in Croatian. German → German.
- For Croatian, use formal Vi form (Vama, Vaš, etc.).
- For German, use formal Sie form.
- Use the navigate_to_page tool to provide clickable links to relevant pages.
- Use get_pricing_estimate for pricing questions.
- Use check_booking_availability when users want to schedule a call.
- Use search_blog to find relevant articles for informational questions.`

const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  en: 'Respond in English.',
  hr: 'Odgovarajte na hrvatskom jeziku. Koristite formalni oblik obraćanja (Vi, Vaš, Vam).',
  de: 'Antworten Sie auf Deutsch. Verwenden Sie die formelle Anrede (Sie, Ihr, Ihnen).',
}

const FALLBACK_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    greeting: "Hi! I'm Z.AI, the Version2 assistant. I can help you with pricing, services, booking a consultation, or answering web development questions. What would you like to know?",
    services: "We specialize in custom web development: websites (from €2,500), web applications, e-commerce stores, SEO optimization, and AI integrations. Everything built from scratch with React, Next.js, and TypeScript — no templates. Would you like pricing details? Check our calculator at /pricing/",
    pricing: "Our projects start at €2,500 for a landing page. Business websites: €4,500–€8,000. Webshops: from €6,500. Web apps: from €8,000. Use our interactive pricing calculator at /pricing/ for a detailed estimate, or contact us at /contact/ for a custom quote.",
    booking: "We offer free 30-minute Zoom consultations on Wednesdays, Thursdays, and Fridays between 14:00–17:00 CET. Book yours at /contact/ — we'll get back to you within 24 hours.",
    default: "Thanks for your message! I can help with pricing, services, booking a call, or web development questions. For complex inquiries, reach us at info@version2.hr or +385 99 561 7706.",
  },
  hr: {
    greeting: "Pozdrav! Ja sam Z.AI, Version2 asistent. Mogu Vam pomoći s cijenama, uslugama, rezervacijom konzultacije ili odgovorima na pitanja o web razvoju. Što Vas zanima?",
    services: "Specijalizirani smo za izradu prilagođenih web rješenja: web stranice (od €2.500), web aplikacije, e-commerce trgovine, SEO optimizaciju i AI integracije. Sve gradimo od nule — bez predložaka. Posjetite naš kalkulator cijena na /hr/cijene/",
    pricing: "Naši projekti počinju od €2.500 za landing stranicu. Poslovne stranice: €4.500–€8.000. Web trgovine: od €6.500. Koristite naš interaktivni kalkulator na /hr/cijene/ za detaljnu procjenu.",
    booking: "Nudimo besplatne 30-minutne Zoom konzultacije srijedom, četvrtkom i petkom od 14:00 do 17:00. Rezervirajte na /hr/kontakt/",
    default: "Hvala na poruci! Mogu Vam pomoći s cijenama, uslugama, rezervacijom poziva ili pitanjima o web razvoju. Za složenije upite javite se na info@version2.hr ili +385 99 561 7706.",
  },
  de: {
    greeting: "Hallo! Ich bin Z.AI, der Version2-Assistent. Ich kann Ihnen bei Preisen, Dienstleistungen, Terminbuchung oder Fragen zur Webentwicklung helfen. Was möchten Sie wissen?",
    services: "Wir sind spezialisiert auf maßgeschneiderte Webentwicklung: Websites (ab €2.500), Webanwendungen, E-Commerce-Shops, SEO-Optimierung und KI-Integrationen. Alles wird von Grund auf neu entwickelt. Besuchen Sie unseren Preisrechner unter /de/preise/",
    pricing: "Unsere Projekte beginnen bei €2.500 für eine Landing Page. Business-Websites: €4.500–€8.000. Webshops: ab €6.500. Nutzen Sie unseren Preisrechner unter /de/preise/ für eine detaillierte Schätzung.",
    booking: "Wir bieten kostenlose 30-minütige Zoom-Beratungen mittwochs, donnerstags und freitags von 14:00 bis 17:00 Uhr MEZ an. Buchen Sie unter /de/kontakt/",
    default: "Vielen Dank für Ihre Nachricht! Ich kann bei Preisen, Dienstleistungen, Terminbuchung oder Fragen helfen. Für komplexere Anfragen: info@version2.hr oder +385 99 561 7706.",
  },
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase()
  if (/^(hi|hello|hey|bok|hallo|pozdrav|zdravo|guten|servus)/i.test(lower)) return 'greeting'
  if (/service|uslug|dienst|web.*design|develop|izradi|entwickl|offer|ponud|angebot/i.test(lower)) return 'services'
  if (/pric|cost|cijena|preis|how much|koliko|wieviel|€|eur|budget|troš/i.test(lower)) return 'pricing'
  if (/book|reserv|termin|konzult|call|poziv|meeting|zoom|schedule|zakaž/i.test(lower)) return 'booking'
  return 'default'
}

function getFallbackResponse(request: LlmRequest): LlmResponse {
  const lang = request.language in FALLBACK_RESPONSES ? request.language : 'en'
  const responses = FALLBACK_RESPONSES[lang]
  const intent = detectIntent(request.message)
  const response = responses[intent] ?? responses.default

  return { response, sources: request.context }
}

type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  tool_calls?: Array<{
    id: string
    type: 'function'
    function: { name: string; arguments: string }
  }>
  tool_call_id?: string
}

type ApiResponse = {
  choices?: Array<{
    message?: ChatMessage
    finish_reason?: string
  }>
}

/**
 * Call Z.AI with function calling support.
 * Handles tool calls by executing them and sending results back for final response.
 */
async function callLlmWithTools(
  messages: ChatMessage[],
  apiKey: string,
  baseUrl: string,
  model: string,
): Promise<ChatMessage> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      tools: CHAT_TOOLS,
      max_tokens: 800,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json() as ApiResponse
  const assistantMessage = data.choices?.[0]?.message

  if (!assistantMessage) {
    throw new Error('No response from LLM')
  }

  return assistantMessage
}

/**
 * Generate a response using Z.AI GLM API (OpenAI-compatible) with function calling.
 * Falls back to hardcoded responses if LLM is not configured or fails.
 */
async function generateResponse(request: LlmRequest): Promise<LlmResponse> {
  const apiKey = process.env.LLM_API_KEY
  const baseUrl = process.env.LLM_BASE_URL
  const model = process.env.LLM_MODEL || 'glm-4-plus'

  if (!apiKey || !baseUrl || apiKey === 'REPLACE_WITH_ACTUAL_ZAI_API_KEY') {
    return getFallbackResponse(request)
  }

  const langInstruction = LANGUAGE_INSTRUCTIONS[request.language] || LANGUAGE_INSTRUCTIONS.en
  const contextBlock = request.context.length > 0
    ? `\n\nRelevant context from our knowledge base:\n${request.context.join('\n\n')}`
    : ''

  const messages: ChatMessage[] = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\n${langInstruction}${contextBlock}` },
    { role: 'user', content: request.message },
  ]

  try {
    let assistantMessage = await callLlmWithTools(messages, apiKey, baseUrl, model)
    const toolResults: Array<{ type: string; data: unknown }> = []

    // Handle tool calls (up to 3 rounds to prevent infinite loops)
    let rounds = 0
    while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0 && rounds < 3) {
      rounds++
      messages.push(assistantMessage)

      for (const toolCall of assistantMessage.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments) as Record<string, unknown>
        const result = executeTool(toolCall.function.name, args)
        toolResults.push(result)

        messages.push({
          role: 'tool',
          content: JSON.stringify(result.data),
          tool_call_id: toolCall.id,
        })
      }

      // Get the final response with tool results
      assistantMessage = await callLlmWithTools(messages, apiKey, baseUrl, model)
    }

    const content = assistantMessage.content
    if (!content) {
      return getFallbackResponse(request)
    }

    return {
      response: content,
      sources: request.context,
      toolResults: toolResults.length > 0 ? toolResults : undefined,
    }
  } catch (error) {
    console.error('LLM request failed:', error)
    return getFallbackResponse(request)
  }
}

export { generateResponse, type LlmRequest, type LlmResponse }
