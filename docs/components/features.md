# Feature Components

> Source of truth: `docs/brand-discovery.md`. Design tokens: [../design/](../design/). Page-level specs: [../pages/](../pages/).

---

### Floating Action Button (FAB)
- **Position:** `fixed`, bottom-right, 24px from both edges.
- **Size:** 56px circle.
- **Color:** `var(--color-brand-red)` background, white icon (plus/close toggle).
- **Z-index:** `var(--z-fab)` = 40. Hidden during preloader.
- **Expand behavior:** On click, 3 action buttons fan upward with 60px vertical spacing between each. Stagger: 50ms between buttons.
- **Actions (bottom to top):**
  1. **Contact** — language-aware link to the contact page (`/contact`, `/hr/kontakt`, `/de/kontakt`).
  2. **WhatsApp** — direct link: `https://wa.me/385995617706`.
  3. **AI Chat** — opens the chat panel (see AI Chat Agent).
  4. **Scroll to Top** — smooth-scrolls to the top of the page via Lenis `scrollTo(0)`. Only visible when the user has scrolled past the first viewport height (`scrollY > window.innerHeight`). Hidden at the top of the page to avoid clutter. Uses an `ArrowUp` icon.
- **Dismiss:** Click FAB trigger again, click outside the expanded actions, or press Escape. No backdrop overlay.
- **ARIA/Keyboard:**
  - FAB trigger: `aria-expanded="true|false"`, `aria-haspopup="true"`.
  - Escape closes expanded state and returns focus to the FAB trigger.
  - When expanded, Tab moves through the action buttons. Shift+Tab cycles back.

### AI Chat Agent
Chat interface embedded via FAB. RAG-powered, trained on site content.
- Answers: services, pricing, projects, tech stack, support questions.
- Conversations feed into backend. LLM API integration (Claude/GPT).
- Demonstrates the AI capability Version2 offers as a service.

### Interactive Pricing Tool
Car-configurator style. Price updates live as options are selected/deselected.
- Covers all project types (websites, web apps, e-commerce, etc.).
- Visitors toggle features, price adjusts instantly.
- Final step: submit contact info for detailed quote.
- See `docs/interactive-pricing-tool.md` for full spec.

### Booking System
Custom-built (not Calendly). Embedded in contact page.
- Date/time picker from available slots.
- Contact method choice: email, WhatsApp, phone call.
- Name, email, brief project description.
- Confirmations (email + optional WhatsApp), calendar add (Google/Apple), reminders.
- Backend syncs with team calendar for availability.

### Digital Business Card Customizer
Live preview of card as visitor customizes (name, title, colors, contact info).
Potential 3D card viewer. Both product showcase and lead-gen tool.

### Blog Listing
- Grid of blog post cards (featured image, title, excerpt, category, date).
- **Search bar:** Client-side fuzzy search across titles, excerpts, categories, tags. Powered by Fuse.js. Search index generated at build time (~50-80KB, loaded on demand when search is focused).
- **Category filter:** Clickable category pills. URL updates to `/blog/?category=web-development` (shareable).
- **Pagination:** "Load More" button. Default 12 posts visible. Button appends next 12. Shows remaining count: "Load more (91 remaining)". Disappears when all posts loaded. Category filter resets the count. Search results show all matches (no pagination — 103 posts max). Optional `?page=N` URL parameter for shareable deep links (can defer to Layer 4a).
- Search and category filter can be combined.

### Blog Post
- Featured image hero (consistent 16:9 aspect ratio).
- Title, date, reading time, category tags.
- Auto-generated table of contents (for posts with 3+ headings).
- Rich content: typography, pull quotes, code blocks with syntax highlighting.
- Share buttons: LinkedIn, X, Facebook, copy link.
- End of post: related posts suggestion, CTA to contact/services.
- Search bar at top (same component as blog listing — search from any post page).
- No comments. No previous/next navigation.

### Breadcrumbs
Rendered on service sub-pages and blog post pages. Provides wayfinding and structured data.
- **Separator:** `>` character between levels.
- **Current page:** Displayed as plain text (not a link).
- **Example:** Home > Services > Web Development
- **Structured data:** Outputs `BreadcrumbList` JSON-LD (`<script type="application/ld+json">`) for SEO.
- **Styling:** Manrope 400, `text-sm`, `text-muted`. Links use `text-muted hover:text-foreground` transition.

### Service Page FAQ
Each service page includes an FAQ accordion section at the bottom (above the CTA).
- **Data source:** Frontmatter `faqs` array in each service page's markdown file. Each item: `{ question: string, answer: string }`. Answer supports inline markdown (bold, links).
- **Count:** 5-8 items per service page. Unique per service (not shared across services).
- **Translation:** Each language file has its own `faqs` array. Falls back to English if the translated file lacks FAQs.
- **Behavior:** Single-expand (opening one closes others). First item closed by default. Smooth height animation on toggle.
- **ARIA/Keyboard:**
  - Each accordion item wrapper: `role="region"`.
  - Toggle button: `aria-expanded="true|false"`, `aria-controls="faq-panel-{index}"`.
  - Arrow Up/Down navigates between accordion item buttons.
  - Home/End jumps to first/last accordion item button.
  - Enter/Space toggles the focused item.

### Case Study
- Project name, client industry, what was built and why.
- Tech stack used. Screenshots/videos (3-5 per project).
- **Embedded live website** (iframe -- visitor interacts with real site without leaving).
- Client testimonial (if available). Results/metrics (if available). Link to live site.

### Cookie Consent
Custom-built GDPR banner. No third-party cookie libraries. Blocks all analytics scripts until consent is given.
- **Position:** `fixed` bottom, full width bar.
- **Z-index:** `var(--z-cookie)` = 70 (above everything except devtools).
- **Layout:** Text left ("We use cookies for analytics to improve your experience."), buttons right. Responsive: stacks vertically on mobile.
- **Buttons:**
  - Accept All — primary button (filled red). Enables all categories.
  - Decline — ghost button. Disables optional categories. Essential cookies still set.
  - Customize — text link. Expands an inline panel below the bar.
- **Customize panel:** Toggle switches for:
  - **Analytics** (GA4 / FB Pixel) — off by default, user can enable.
  - **Functional** (essential) — always on, no toggle shown (just a label with "Always active").
  - No "Marketing" category (Google Ads is reclassified under Analytics for this site's usage).
- **Storage:** `localStorage` key `v2_cookie_consent`. Value: JSON `{ version: 1, analytics: boolean, timestamp: "ISO-8601-string" }`.
- **Re-consent:** Bump `version` in code when categories change. On load, if stored version < current version, discard old consent and re-show banner.
- **ARIA/Keyboard:**
  - Banner: `role="dialog"`, `aria-label="Cookie preferences"`.
  - Focus trap when the Customize panel is expanded.
  - Tab cycles through buttons and toggles. Enter/Space activates.

### 404 Page
- **Route:** `src/app/not-found.tsx` (Next.js built-in). For language-specific 404s, each language folder also has a `not-found.tsx` (`src/app/hr/not-found.tsx`, `src/app/de/not-found.tsx`). In standalone mode, Next.js serves `not-found.tsx` automatically for unknown routes.
- **Headline:** "This page went offline." (Albert Sans Light, same scale as hero text)
- **Subtext:** "Either we moved it, or it never existed. Either way, let's get you somewhere useful." (Manrope Regular)
- **Links:** Homepage, Services, Blog, Contact — as prominent text links, not tiny footer-style.
- **Visual:** Dark background (same as hero). Subtle particle animation or static atmospheric gradient. Feels like part of the site, not a system error page.
- **Language-aware:** Renders in detected language (URL starts with `/hr/` → Croatian, `/de/` → German, else English). Copy stored in `ui-strings.ts`.

---

## Loading & Empty States

Every async operation and content-dependent view needs a defined loading and empty state.

### Button Loading
Spinner replaces label text. Button disabled. Width preserved (no layout shift).

### Form Submission
Button shows spinner + "Sending..." text. All fields disabled. On success: fields clear, green confirmation message above form. On error: fields re-enabled, red banner above form with error message.

### Blog Search (No Results)
"No posts found for '[query]'. Try a different search term." with a link to view all posts.

### Blog Category (Empty)
"No posts in this category yet." Defensive — should not happen with current data.

### Image Loading
Skeleton placeholder (gray shimmer matching the image's aspect ratio). WebP with blur-up: tiny inline base64 placeholder → full image swap on load.

### 3D Scene Loading
Preloader (V2 icon particle assembly). If WebGL unsupported or GPU tier too low: static dark atmospheric gradient image with the same hero text overlay.

### Booking Slots Loading
Skeleton date/time grid. If no slots available: "No available times in the next 2 weeks. Contact us directly." with email/WhatsApp links.

### Pricing Tool Loading
Each step renders immediately (no data fetch). Price calculation is synchronous client-side.

### Page Transition
Quick opacity fade + slight slide-up (<300ms). Motion AnimatePresence (`motion/react`). Outgoing page fades to 0, incoming fades from 0 with 8-16px upward translate.

### Language Fallback
When content isn't available in the requested language, show the English version with a notice bar: "This page is not yet available in [Language]. Showing English version."

## Related Files
- [layout.md](layout.md) — Layout components (Header, Footer, Menu, PageTransition)
- [sections.md](sections.md) — Page section components (Hero, Services Teaser, etc.)
- [ui-primitives.md](ui-primitives.md) — UI primitive components (Button, Card, Input, etc.)
- [registry.md](registry.md) — Complete component registry with file paths and props
- [../pages/_globals.md](../pages/_globals.md) — Detailed visual specs for global components
