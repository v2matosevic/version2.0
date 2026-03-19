# Brand Discovery — Version2

Last updated: 2026-02-25

---

## 1. Identity

- **What we are:** A web development company. A web development studio. NOT an agency.
- **Elevator pitch:** "I make websites."
- **Key differentiator:** Everything in-house. No outsourcing. Custom-built from scratch for every client.
- **Speed:** Ships fast — high quality, not shortcuts. Express delivery of premium products.
- **Integrations:** Slack, Google Workspace, Teams, CRMs, payment systems — whatever enterprise clients use.
- **Presentation:** Corporate but fun. Present as a company/team. No individual founder personality — for now.
- **Hero statement:** "We build what others can't."

## 2. Target Clients

- Big tech companies, real estate companies, law firms, private medical practices/clinics
- Anyone with a serious budget who can genuinely benefit from custom web development
- **Common thread:** Established businesses that need professional, tailored digital products — not template sites.
- **Geography:** Local (Zadar) expanding to all of Croatia, Austria/Germany, EU-wide, worldwide.
- **English-first** positioning for international ambition.

## 3. Brand Name & Logo

- **Name:** Version2. Origin: gaming team name from childhood. Personal, authentic.
- **Logo:** Two parts — geometric double-V chevron icon + "VERSION2" wordmark.
- **Icon:** Stays. Non-negotiable. Angular, modern, tech DNA. Works on dark and light.
- **Wordmark font:** Will be updated to Albert Sans (matching the headline font). Previously Muli Bold.

## 4. Language & Tone

- Direct. No marketing fluff. Say what you mean.
- Confident, understated — lets the work do the talking.
- NOT agency-speak. No "we leverage synergies" or "digital transformation partner."
- People should feel welcome. Easy to understand. Visually attractive.
- No complicated words or useless adjectives.

## 5. Visual Mood & Color

### Mood
- **Dark-first.** Dark backgrounds are the default — makes 3D, WebGL, video pop.
- **Not monolithic.** Sections breathe between dark and lighter tones.
- Hero and key moments: deep warm charcoal (not pure black).
- Content sections: warm off-white/cream or cool neutral for readability.
- Textured, modern, easy on the eyes. Dark/light shifts create rhythm.
- Dark mode is the star/default. Light mode is the accessible alternative.

### Color Palette
- **Primary brand color:** Red (#991717) — evolved, different shades/gradients of this. The signature.
- **Dark base:** Rich warm charcoal/near-black (not pure #000).
- **Light base:** Warm off-white or cream (not pure #fff).
- **Neutral:** Dark gray, something between gray and dark. The in-between tone.
- **No secondary accent color.** Red owns the brand. White and dark tones support it.
- Everything subject to refinement during implementation.
- **Resolved hex values:** Dark base #141414, Light base #F5F0EB, Foreground #F0E8E0. See `design/colors-tokens.md` for complete token set.

### Typography Direction
- **Headlines:** Thin, minimalistic font. Lightweight, clean, modern. Bold weights for accents.
- **Body:** Highly readable font. Easy on the eyes. Clear at all sizes.
- **Nunito retired.** Moving to a dual-font system.
- Specific font selection during implementation — criteria established.
- **Resolved:** Albert Sans (headlines, 300 default, 700 for accents) + Manrope (body, 400 default, 600 for emphasis). See `design/typography.md` for full type scale and implementation tokens.

## 6. Reference Websites

Three sites defining the target quality bar:

### Unseen Studio (unseen.co)
- Gated preloader: 3D rotating cube + animated eyes + Enter button
- Full 3D WebGL architectural scene as homepage (arches, stairs, water, glass)
- Blush pink + charcoal. Sans/serif hover morphing. Custom cursor. Sound design.
- **Takeaway:** The site IS an art installation.

### Dogstudio (dogstudio.co)
- Animated dog preloader. Dark cinematic aurora/nebula background.
- Massive white serif "We Make Good Shit" + floating 3D translucent leaf
- Per-character animations. 3D matcap objects morph per project.
- **Takeaway:** Bold irreverence meets technical mastery.

### Locomotive (locomotive.ca)
- Typewriter preloader. Full-viewport video with glitch effects in deep reds/blacks.
- Serif display type. Character shuffle on hover. Own smooth scroll library.
- **Takeaway:** Confident craftsmanship with warmth.

### Patterns to Adopt
1. Preloader IS the brand moment
2. Typography as hero — massive type, imagery secondary
3. WebGL/3D integrated into the experience
4. Dark, cinematic mood
5. Custom interactions everywhere (cursors, per-char animations, scroll effects)
6. Minimal navigation with microinteractions
7. The site IS the portfolio
8. Confidence in copy — short, bold, unapologetic

## 7. What The Owner Hates

- Generic layouts, cookie-cutter sites
- Complicated/pretentious copy
- Basic/boring typography
- Inconsistency — bad padding, uneven spacing
- No responsiveness
- Walls of text, no breathing room
- Bad quality images
- Bad design layout and structure

## 8. What Clients Love About Version2

1. Speed — projects delivered fast
2. Design quality — the visual result
3. Technical capability — what they can actually build

---

## 9. Technical Stack

### Core
- Next.js 16 + TypeScript (strict) + Tailwind CSS v4
- Standalone mode (`output: 'standalone'`) deployed to Hostinger VPS

### Interaction Libraries
- **React Three Fiber (R3F)** — WebGL/3D scenes, immersive hero
- **GSAP** — Timeline animations, per-character text effects, scroll triggers
- **Lenis** — Smooth scrolling across all devices (lighter config on mobile)
- **Motion** (formerly Framer Motion) — Component animations, page transitions. Package: `motion`, import from `motion/react`.
### Sound
- Not planned for v1. Can be added later if desired.

## 10. Site Structure

### Navigation
- **Header:** Version2 logo (left) — Portfolio — Pricing — Contact (right) — Menu toggle
- **Header behavior:** Transparent over hero (3D scene goes edge-to-edge) → solid backdrop when scrolling past hero → hides on scroll down, reappears on scroll up.
- **Desktop menu:** Sidebar panel sliding in from the side (NOT full-screen overlay). Dark background, large nav links with per-character hover animations, social links, contact info, language switcher. V2 icon subtle in background.
- **Mobile menu:** Full-screen overlay (acceptable on small screens).
- Minimal header, comprehensive menu panel.

### Page Map
| Page | URL | In Header | Notes |
|------|-----|-----------|-------|
| Home | `/` | Logo link | The showpiece |
| Portfolio | `/portfolio/` | Yes | Project list + case study detail |
| Pricing | `/pricing/` | Yes | Real-time configurator |
| Contact | `/contact/` | Yes | Form + booking + info |
| Services | `/services/` | Menu only | Overview hub |
| Individual services | `/services/[slug]/` | Menu only | Web dev, web apps, e-commerce, AI, SEO |
| About | `/about/` | Menu only | Company story |
| Analysis | `/analysis/` | Menu only | Free website audit (lead-gen) |
| Blog | `/blog/` | Menu only | Listing with search + category filter |
| Blog posts | `/blog/[slug]/` | — | 103 posts at launch |
| Career | `/career/` | Footer + menu | Junior dev / mentorship |
| 404 | — | — | Branded, on-theme error page |
| Legal pages | `/legal-notice/` etc. | Footer only | Legal notice, privacy, cookies, terms, refund, accessibility |

**Persistent UI elements (all pages):**
- Header with navigation
- Floating action button (Contact / WhatsApp / AI Chat Agent)
- Cookie consent banner (first visit)
- Footer

### Footer
- **Content-rich footer.** Not minimal — comprehensive.
- Navigation columns: Services (all), Portfolio, Career, About, Contact, Blog
- Social media links
- Contact info (address, phone, email, WhatsApp)
- Legal links (legal notice, privacy policy, cookies, terms, refund policy, accessibility)
- Language switcher
- Copyright line
- Optional: CTA strip above footer ("Have a project? Let's talk.")

## 11. Preloader

- V2 icon assembling from particles into the final icon shape
- Simple, clean, branded
- Doubles as a real asset-loading indicator for the 3D scene

## 12. Hero Section

- **React Three Fiber 3D scene:** Abstract, dark, atmospheric. Geometric shapes, particles, light/shadow. Responds to mouse movement.
- **V2 icon** subtly integrated (particle formation, geometric echo — NOT a spinning logo)
- **"We build what others can't."** in massive thin type
- **The hero IS the portfolio piece.** The code-built experience proves the statement.
- AI tools used elsewhere (textures, blog imagery, mockups) — not the hero.

## 13. Scroll, Animation & Interactions

- **Smooth scroll (Lenis)** across all devices. Buttery feel.
- **Scroll-triggered animations:** Elements reveal as you scroll. GSAP ScrollTrigger.
- **Per-character text animations** on headings and key statements.
- **Custom cursor** on desktop: minimalistic, on-brand. Not over the top. Subtle dot/circle that changes state on hover (grows, morphs, shows contextual hint). Fits the dark premium aesthetic.
- **Page transitions:** Quick, subtle crossfade (<300ms). Opacity fade + slight slide-up on new content. Motion AnimatePresence. Near-zero performance cost. No heavy wipes.
- **Mobile:** Progressive degradation. Transfer as much desktop experience as possible without ruining performance. Lighter 3D (reduce particles, simplify geometry), static fallbacks where GPU can't handle it, preserve all scroll animations and page transitions.
- **No newsletter.** Blog handles SEO/traffic. Newsletter adds burden for zero return at this scale. Easy to add later if needed.

## 14. Page-by-Page Breakdown

### Home
1. **Preloader** → V2 icon particles assembling
2. **Hero** → Dark 3D scene + "We build what others can't." in massive thin type + subtle CTA
3. **Services teaser** → 3-4 bold statements (Websites. Web Apps. E-Commerce. AI.) with one-line descriptions. Punchy, visual.
4. **Portfolio highlights** → 3-4 best projects with hover interactions, large type, inline previews
5. **Client logos** → 4-5 recognizable brand logos. Understated, no "Trusted by" cheese.
6. **Why us / Differentiators** → In-house. Custom-built. Ships fast. Enterprise integrations. Visual section, not a list.
7. **CTA section** → Final push. Direct. "Let's build something." → contact/pricing link
8. **Footer**

No blog tease on homepage (blog is SEO/traffic, not homepage content). No generic stats section. No tech stack logo grid (specific tech mentioned in case studies instead).

### Services Overview (`/services/`)
- Scannable in one scroll. Like a high-end restaurant menu.
- Each service: bold name + one sentence + visual element (animation/icon/abstract)
- No paragraphs, no feature lists on the overview. Depth lives on individual pages.
- Core services prominent (web dev, web apps, e-commerce, AI, SEO)
- Supporting services below (360 tours, business cards, integrations, maintenance)
- Each card links to individual service page

### Individual Service Pages (`/services/[slug]/`)
- For: custom websites, web applications, e-commerce, AI integration, SEO
- Structure: Service hero → what we build → how we work (generalized pipeline process) → technologies → related projects from portfolio → CTA
- "How we work" is broadly consistent across services — one generalized process visualization
- Supporting services (360 tours, business cards, integrations, maintenance) live on overview only — spun out later if SEO demands

### Portfolio (`/portfolio/`)
- One fluid page. Project list with hover previews/interactions.
- Click opens a full case study page for that project.
- Case study content:
  - Project name, client industry
  - What was built and why (one paragraph)
  - Tech stack used
  - Screenshots and videos (3-5 per project)
  - **Embedded live website** (iframe — visitor can interact with the real site without leaving)
  - Client testimonial (if available)
  - Results/metrics (if available)
  - Link to live site
- 4-6 featured projects at launch, expandable

### Pricing (`/pricing/`)
- **Real-time car-configurator style.** Price updates live as options are selected/deselected.
- Covers all project types (websites, web apps, e-commerce, etc.)
- Visitors add features they want, remove what they don't — price adjusts instantly
- Final step: submit contact info to get detailed quote → feeds into backend
- Qualifies leads and sets budget expectations

### About (`/about/`)
- Company intro — when, where, who
- Origin story (optional — the gaming team name)
- What makes us different (in-house, speed, custom, no outsourcing)
- Experience and track record
- Links to portfolio, services
- Simple. Human. No corporate fluff.

### Contact (`/contact/`)
- Contact form (name, email, message, honeypot)
- Business info: address, phone, email, WhatsApp
- Social media links
- Map (optional)

### Booking / Scheduling System (embedded in contact page)
Built from scratch. Not Calendly — custom. Features:
- Visitor picks a date/time from available slots
- Chooses contact method: email, WhatsApp, or phone call
- Fills in name, email, brief project description
- **Notifications:** Both parties get confirmation (email + optional WhatsApp)
- **Add to calendar:** Visitor can add event to Google Calendar, Apple Calendar, etc.
- **Follow-up reminders:** Automated email reminder before the booking
- Backend syncs with Version2 team calendar to manage availability
- Part of the custom backend platform

### Blog (`/blog/`)
- Post listing with category filter
- **Blog search** on listing page and single post pages (client-side, static-compatible)
- 103 curated posts at launch, new high-quality content ongoing
- **Individual post template:**
  - Featured image hero
  - Post title, date, reading time, category tags
  - Auto-generated table of contents (for posts with 3+ headings)
  - Rich content: proper typography, pull quotes, code blocks with syntax highlighting, image galleries
  - Share buttons: LinkedIn, X, Facebook, copy link
  - End of post: related posts suggestion, CTA to contact/services
  - No comments (AI chatbot handles questions, comments are mostly spam)

### Analysis / Free Website Audit (`/analysis/`)
- Kept from old site. Strong lead-gen tool.
- Visitors submit their website URL, get a free analysis/audit.
- Will be expanded further (details TBD).
- Routes: `/analysis/` (EN), `/hr/analiza/` (HR), `/de/analyse/` (DE)

### Career (`/career/`)
- Not a corporate job board. An invitation.
- Tone: "We're always looking for talent. Get in touch."
- Current opening: junior developer / student. Mentorship-focused — "We want to help you grow your skills and potentially work with us."
- Application: simple form (name, email, portfolio/GitHub link, short message)
- Future: can add more positions as the team grows

### 360 Virtual Tours (service page section + demos)
- Embedded interactive tour previews on the service section
- Local Croatian service (Zadar area primarily)
- Use case: businesses display warehouses, stores, offices as virtual walks
- Demo tours embedded so visitors can experience the product immediately

### Digital Business Cards (service page + customizer)
- **Card customizer tool:** Visitors can customize their own digital card directly on the website
- Live preview of the card as they customize (name, title, colors, contact info)
- Potential 3D card preview/viewer
- This is both a product showcase and a lead generation tool
- Feeds into the backend (saves configurations, triggers contact)

### 404 Page
- Branded, on-theme. V2 style, dark aesthetic.
- Witty/clever message that fits the brand personality.
- Clear link back to homepage and maybe search/popular pages.
- Not a dead end — still feels like part of the site.

### Floating Action Button (FAB)
Fixed in the corner of every page. Expands on click to reveal three options:
1. **Contact** — Quick contact form or link to contact page
2. **WhatsApp** — Direct WhatsApp chat link
3. **AI Chat Agent** — Opens a chat interface

### AI Chat Agent
A custom-built AI assistant embedded in the website:
- **For potential clients:** Answers questions about services, pricing, projects, tech stack. Provides information they're looking for. Can guide them to relevant pages.
- **For existing clients:** Can help troubleshoot problems, answer support questions.
- **As a contact channel:** Visitors can contact Version2 through the chat. Conversations feed into the backend.
- **Trained on website content:** Knows everything on the site — services, portfolio, pricing, blog posts. RAG or similar approach.
- **Part of the custom backend platform.** Needs LLM API integration (Claude/GPT), conversation storage, notification system.
- This is a significant differentiator — most web dev studios don't have an AI agent on their site. It demonstrates the AI integration capability that Version2 offers as a service.

### Testimonials
- Owner has client testimonials available.
- Place strategically: homepage (1-2 quotes), portfolio case studies (per-project), service pages (relevant quotes).
- Design: clean, minimal. Quote + client name + company. No star ratings.

### Legal (6 Pages — All EU/Croatian Law Compliant)
- Legal Notice / Imprint (mandatory under Croatian Companies Act Art. 21)
- Terms & Conditions (purchase terms, withdrawal exemptions)
- Privacy Policy (GDPR Article 13 compliant)
- Cookie Policy (ePrivacy Directive compliant)
- Right of Withdrawal & Refunds (standard withdrawal form included)
- Accessibility Statement (WCAG 2.2 AA, European Accessibility Act)
- Footer links only

## 15. Portfolio Projects

These are NOT basic websites. They prove full-stack product capability:

1. **Mobile camp site** — Home model comparison, questionnaire recommender, availability display
2. **Personal trainer platform** — Frontend + webshop + backend portal (three-part system)
3. **QR code event app** — Real-time collaborative photo/video sharing for events
4. **Talkty** — Open-source voice-to-text app for developers
5. **Online booking (cleaning)** — Services, pricing, real-time availability, direct booking

## 16. Backend Platform

Separate from existing client app at web.version2.hr.

### Hosting
- **Hostinger VPS** — Nginx reverse proxy + PM2 process manager. Backend consolidated into Next.js API routes.
- AI agent connects to LLM API (Claude/GPT) via API key — standard HTTPS calls.
- Architecture designed to be portable — if capacity is outgrown, the setup (Nginx config, PM2 ecosystem file) migrates to any VPS in under an hour.

### Features
- Blog CMS (write and manage posts, trigger static rebuild)
- Custom analytics dashboard (page visits, clicks, scroll depth, conversions)
- Form submission management (contact, pricing tool, consultations, career applications)
- Pricing tool engine (configurator logic, price calculations)
- Scheduling/booking system (calendar API integration, availability, reminders)
- AI chat agent backend (conversation storage, LLM API calls, context management)
- Email service for notifications (booking confirmations, reminders, form receipts)
- Future expansion as needed

### CMS → Static Site Workflow
- Owner writes/edits in the custom CMS backend
- CMS saves content (markdown or structured data)
- Triggers a rebuild of the static Next.js frontend
- Deploys updated static files to Hostinger
- Blog posts and pages are always pre-rendered for performance

## 17. Language Strategy

- **English:** Primary. The star. Most polished. EU/worldwide.
- **German:** Strategic. Austrian/German market growth.
- **Croatian:** Essential. Local market, company origin, legal/credibility.

## 18. SEO & Technical

- **Structured data (JSON-LD)** on every page type: LocalBusiness (root, includes address/contact), WebSite, Service, BlogPosting, Product (digital business cards), BreadcrumbList, CreativeWork (portfolio case studies)
- **Cookie consent:** Custom-built GDPR banner. Accept / Decline / Customize. Blocks all analytics until consent. No third-party cookie libraries. Includes all required legal context.
- **Analytics:** GA4 (`GT-NBBTZS5`) + Google Ads (`AW-11213118615`, `AW-16539026255`) + Facebook Pixel (`557616629917733`) — all staying. Consent-gated.
- **Custom analytics backend:** In addition to GA4/Pixel. Tracks: page visits, button clicks, page time, scroll depth, navigation patterns, conversion events. Part of the custom backend platform. Full control over data.
- **Open Graph images:** Custom OG image per page for social sharing. Default template with V2 branding as fallback.
- **Favicon set:** apple-touch-icon, web manifest, standard favicon.ico (existing icon asset).
- **Accessibility:** WCAG 2.1 AA compliance. Semantic HTML, keyboard navigation, screen reader support, proper contrast ratios, focus states.
- **prefers-reduced-motion:** All animations respect this OS-level setting. Reduced/no animations for users who need it.
- **Performance targets:** Lighthouse 90+ across all categories. Core Web Vitals green. 3D/WebGL loads progressively — doesn't block initial page render.
- **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge). Safari WebGL tested specifically for R3F compatibility.
- **Robots.txt + XML Sitemap:** Auto-generated at build time.

## 18b. Social Media

All platforms linked on the site:
- Facebook: https://facebook.com/version2hr
- Instagram: https://instagram.com/version2hr
- TikTok: https://tiktok.com/@version2hr
- X (Twitter): https://x.com/version2hr
- WhatsApp: https://wa.me/385995617706

## 19. Content & Copy Workflow

- **All copy drafted by Claude.** Owner reviews and adjusts.
- Brand voice, tone, and identity are established in this document.
- **Imagery workflow:** Build with placeholders first → owner provides all final images → resize and swap in.
- **All images provided by the owner.** We do not source or generate images — owner handles that (AI-generated, photography, existing assets, etc.).
- Hero visuals: code-built (React Three Fiber), not images.

## 20. Timeline

No deadline. Build it right. No rush. Use as many tokens as needed.
