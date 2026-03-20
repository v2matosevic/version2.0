import { searchRag } from '@/lib/rag-search'

/**
 * Page navigation map for the chat agent.
 */
const PAGE_MAP: Record<string, { url: string; description: string }> = {
  home: { url: '/', description: 'Version2 homepage' },
  services: { url: '/services/', description: 'All services overview' },
  'web-design': { url: '/services/web-design/', description: 'Custom web design service' },
  'web-applications': { url: '/services/web-applications/', description: 'Web application development' },
  'e-commerce': { url: '/services/e-commerce/', description: 'E-commerce and online store development' },
  'ai-integration': { url: '/services/ai-integration/', description: 'AI-powered features and chatbots' },
  seo: { url: '/services/seo/', description: 'SEO optimization service' },
  pricing: { url: '/pricing/', description: 'Interactive pricing calculator' },
  contact: { url: '/contact/', description: 'Contact form and booking' },
  portfolio: { url: '/portfolio/', description: 'Portfolio and case studies' },
  blog: { url: '/blog/', description: 'Blog articles about web development' },
  about: { url: '/about/', description: 'About Version2 and the team' },
  career: { url: '/career/', description: 'Career opportunities' },
  analysis: { url: '/analysis/', description: 'Free website analysis' },
  tracking: { url: '/tracking/', description: 'Order and parcel tracking' },
  booking: { url: '/contact/', description: 'Book a free consultation call' },
}

/**
 * Pricing ranges by project type and scope for quick estimates.
 */
const PRICING_RANGES: Record<string, Record<string, [number, number]>> = {
  website: {
    landing: [2500, 4500],
    business: [4500, 8000],
    corporate: [8000, 14000],
    enterprise: [14000, 25000],
  },
  webshop: {
    starter: [6500, 11000],
    growing: [11000, 20000],
    enterprise: [20000, 35000],
  },
  webapp: {
    simple: [8000, 17000],
    complex: [17000, 32000],
    enterprise: [32000, 58000],
  },
}

type ToolResult = {
  type: 'navigation' | 'pricing' | 'booking' | 'blog_results'
  data: unknown
}

/**
 * Execute a function call tool and return the result.
 */
function executeTool(name: string, args: Record<string, unknown>): ToolResult {
  switch (name) {
    case 'navigate_to_page':
      return executeNavigate(args.page_name as string)
    case 'get_pricing_estimate':
      return executePricing(args.project_type as string, args.scope as string)
    case 'check_booking_availability':
      return executeBookingCheck()
    case 'search_blog':
      return executeSearchBlog(args.query as string, (args.language as string) || 'en')
    default:
      return { type: 'navigation', data: { error: `Unknown tool: ${name}` } }
  }
}

function executeNavigate(pageName: string): ToolResult {
  const key = pageName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')
  const page = PAGE_MAP[key]

  if (page) {
    return { type: 'navigation', data: { url: page.url, description: page.description } }
  }

  // Fuzzy match
  const match = Object.entries(PAGE_MAP).find(([k, v]) =>
    key.includes(k) || k.includes(key) || v.description.toLowerCase().includes(pageName.toLowerCase()),
  )

  if (match) {
    return { type: 'navigation', data: { url: match[1].url, description: match[1].description } }
  }

  return { type: 'navigation', data: { url: '/contact/', description: 'Contact us for more information' } }
}

function executePricing(projectType: string, scope: string): ToolResult {
  const type = projectType.toLowerCase().replace(/\s+/g, '')
  const normalizedScope = scope.toLowerCase().replace(/\s+/g, '')

  const typeRanges = PRICING_RANGES[type]
  if (!typeRanges) {
    return {
      type: 'pricing',
      data: {
        estimate: 'Contact us for a custom quote',
        calculatorUrl: '/pricing/',
        availableTypes: Object.keys(PRICING_RANGES),
      },
    }
  }

  const range = typeRanges[normalizedScope]
  if (!range) {
    return {
      type: 'pricing',
      data: {
        estimate: `${projectType} projects range from €${Object.values(typeRanges)[0][0].toLocaleString()} to €${Object.values(typeRanges).at(-1)![1].toLocaleString()}`,
        calculatorUrl: '/pricing/',
        scopes: Object.keys(typeRanges),
      },
    }
  }

  return {
    type: 'pricing',
    data: {
      projectType,
      scope,
      rangeMin: range[0],
      rangeMax: range[1],
      formatted: `€${range[0].toLocaleString()} – €${range[1].toLocaleString()}`,
      calculatorUrl: '/pricing/',
      note: 'This is a base estimate. Features and add-ons may affect the final price. Use our pricing calculator for a detailed breakdown.',
    },
  }
}

function executeBookingCheck(): ToolResult {
  const today = new Date()
  const from = new Date(today)
  from.setDate(from.getDate() + 2)
  const to = new Date(today)
  to.setDate(to.getDate() + 14)

  // Return static availability info since we can't import DB modules synchronously
  // The actual availability is checked via the booking API
  return {
    type: 'booking',
    data: {
      message: 'Consultations are available Wednesday through Friday, 14:00–17:00 CET.',
      bookingUrl: '/contact/',
      note: 'Book a free 30-minute Zoom consultation. We respond within 24 hours.',
      availableDays: ['Wednesday', 'Thursday', 'Friday'],
      timeRange: '14:00 – 17:00 CET',
    },
  }
}

function executeSearchBlog(query: string, language: string): ToolResult {
  const results = searchRag(query, language, { maxResults: 5, category: 'blog' })

  return {
    type: 'blog_results',
    data: {
      results: results.map((r) => ({
        title: r.chunk.title,
        url: r.chunk.source,
        snippet: r.chunk.content.slice(0, 200) + '...',
      })),
      totalFound: results.length,
    },
  }
}

/**
 * OpenAI-compatible tool definitions for Z.AI function calling.
 */
const CHAT_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'navigate_to_page',
      description: 'Get a URL and description for a specific page on the Version2 website. Use this when the user wants to go to a page or needs a link.',
      parameters: {
        type: 'object',
        properties: {
          page_name: {
            type: 'string',
            description: 'The page name, e.g. "pricing", "contact", "portfolio", "web-design", "booking", "blog"',
          },
        },
        required: ['page_name'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_pricing_estimate',
      description: 'Get a rough price range for a project type and scope. Use when the user asks about costs or pricing.',
      parameters: {
        type: 'object',
        properties: {
          project_type: {
            type: 'string',
            enum: ['website', 'webshop', 'webapp'],
            description: 'The type of project',
          },
          scope: {
            type: 'string',
            description: 'The scope/size tier, e.g. "landing", "business", "corporate", "enterprise", "starter", "growing", "simple", "complex"',
          },
        },
        required: ['project_type', 'scope'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'check_booking_availability',
      description: 'Get available consultation booking slots. Use when the user wants to schedule a call or meeting.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_blog',
      description: 'Search blog articles for relevant content. Use when the user asks about web development topics that might be covered in our blog.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query',
          },
          language: {
            type: 'string',
            enum: ['en', 'hr', 'de'],
            description: 'The language to search in',
          },
        },
        required: ['query'],
      },
    },
  },
]

export { executeTool, CHAT_TOOLS, type ToolResult }
