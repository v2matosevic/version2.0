# Service Detail Blueprint (Template)

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/services/web-design/`, `/services/web-applications/`, `/services/e-commerce/`, `/services/ai-integration/`, `/services/seo/` (and HR/DE equivalents)
**Purpose**: Deep dive into one service. Hero statement, what we build, process, tech, portfolio, FAQ, CTA.
**Data sources**: `content/pages/[service-dir]/en.md` (frontmatter + markdown body)
**Structured data**: `Service` (with `name`, `description`, `provider`, `areaServed`) + `BreadcrumbList` + `FAQPage` (from FAQ section)

---

## Section 3.1: Service Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Breadcrumbs** | `<Breadcrumbs items={["Home", "Services", "[Service Name]"]} />`. Position: top of container, `padding-top: 1rem`. Last item is plain text (not linked). MR400, Small, `text-muted`. Links in `text-muted`, hover `text-foreground`. Separator: `>` character, `text-faint`. Outputs `BreadcrumbList` JSON-LD. |
| **Layout** | Container. Content spans cols 1-8. `min-height: 50vh`. `display: flex`, `align-items: flex-end`, `padding-bottom: 4rem`. |
| **Headline** | From content H1 (e.g., "Your website is not a brochure. It's a product." for web-design). AS300, H1 size, `text-foreground`. |
| **Subtext** | First paragraph of content body. MR400, Body Large, `text-muted`. `max-width: 600px`. `margin-top: 16px`. |
| **CTA** | "Get a Quote". `<Button variant="primary" size="lg">`. `margin-top: 24px`. Links to `/pricing/`. |

**Animation**: Headline `SplitText-chars`. Subtext + CTA fade up with `stagger(100ms)`.

---

## Section 3.2: What We Build / What You Get

**Purpose**: Feature breakdown parsed from content markdown.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | From content H2 (e.g., "What You Get" or "What We Build"). AS300, H2 size, `text-foreground`. `margin-bottom: 40px`. |
| **Layout** | `display: grid`, `grid-template-columns: 1fr 1fr` (md+), `gap: 2rem`. Single column mobile. |

**Feature items** (parsed from content H3 sections):

| Element | Specification |
|---------|---------------|
| **Title** | From content H3 (e.g., "Client Portals", "Admin Dashboards"). AS700, H4 size, `text-foreground`. |
| **Description** | Paragraph(s) below the H3 in content. MR400, Body (1rem), `text-muted`. `margin-top: 8px`. |
| **Separator** | `border-bottom: 1px solid var(--color-line-subtle)`. `padding-bottom: 1.5rem`. `margin-bottom: 0` (gap handles spacing). |

**Animation**: Items `ST-reveal` with `stagger(80ms)`.

---

## Section 3.3: How We Work (Shared Process)

**Purpose**: Generalized 4-step pipeline. Consistent across all service pages.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "How We Work". AS300, H2 size, `text-foreground`. `margin-bottom: 48px`. |
| **Layout** | `display: grid`, `grid-template-columns: repeat(4, 1fr)` (lg+), `gap: 2rem`. Tablet: 2x2. Mobile: single column. |

**Steps**:

| # | Number | Title | Description |
|---|--------|-------|-------------|
| 1 | 01 | "Discovery" | "We learn your business, your goals, your audience. You tell us what success looks like." |
| 2 | 02 | "Design" | "Wireframes first, then full designs. You see everything before we write a line of code." |
| 3 | 03 | "Build" | "Custom code, built by our team. No outsourcing. Weekly demos so you see progress." |
| 4 | 04 | "Launch" | "Deployment, DNS, SSL, hosting. We make sure everything works in production." |

**Step structure**:

| Element | Specification |
|---------|---------------|
| **Number** | AS700, H1 size, `text-brand-red`, `opacity: 0.12`. `margin-bottom: 12px`. |
| **Title** | AS300, H3 size, `text-foreground`. |
| **Description** | MR400, Body (1rem), `text-muted`. `margin-top: 8px`. `max-width: 280px`. |
| **Connector** | Same as Services Overview process strip. |

**Animation**: Steps `ST-reveal` with `stagger(100ms)`. Optional: progressive highlight -- as user scrolls through the section, each step's number transitions from `opacity: 0.12` to `opacity: 0.3` when it becomes the "active" step based on scroll position.

---

## Section 3.4: Technologies

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "Our Stack" or "The Tech Behind It" (varies by service, from content). AS300, H2 size, `text-foreground`. `margin-bottom: 32px`. |
| **Content** | Technology names rendered as inline badge/tag elements. |
| **Layout** | `display: flex`, `flex-wrap: wrap`, `gap: 0.75rem`. |

**Badge style**: `bg-base`, `border: 1px solid var(--color-line)`, `rounded-md`, `px-3 py-1.5`. MR600, Small (0.875rem), `text-foreground`. Hover: `border-color: var(--color-brand-red)/30`, 150ms.

**Technologies by service** (client-facing stack — what Version2 builds with, not the Version2 website stack):
- **Web Design**: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL
- **Web Applications**: Next.js, React, TypeScript, Node.js, PostgreSQL, WebSockets, REST APIs
- **E-Commerce**: Next.js, React, TypeScript, Stripe, PayPal, Corvus Pay, Node.js
- **AI Integration**: Claude API, GPT API, RAG, LangChain, Embeddings, Node.js
- **SEO**: Ahrefs, Semrush, Google Search Console, Screaming Frog, Schema.org

**Animation**: Badges `ST-reveal` as a group (single reveal on the flex container).

---

## Section 3.5: Related Portfolio Projects

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "Related Projects". AS300, H3 size, `text-foreground`. `margin-bottom: 32px`. |
| **Layout** | `display: grid`, `grid-template-columns: 1fr 1fr` (md+), `gap: 1.5rem`. Single column mobile. |
| **Content** | 2 portfolio cards relevant to this service category. Same `<PortfolioCard />` component as homepage highlights. |
| **Conditional** | If no portfolio projects exist yet, this entire section is omitted from the DOM. |
| **CTA** | "View All Projects". Ghost button below grid. `margin-top: 32px`. Links to `/portfolio/`. |

---

## Section 3.6: FAQ Accordion

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "Questions We Get Asked". AS300, H2 size, `text-foreground`. `margin-bottom: 32px`. |
| **Data source** | `faqs` array from content frontmatter (to be added during implementation). Fallback: parse FAQ-style H3 + paragraph pairs from the markdown body "Questions We Get Asked" section. 5-8 items per service. Each language file has its own FAQs. Falls back to English if translated file lacks FAQs. |

**Accordion behavior**: Single-expand (opening one closes others). All items closed by default. Smooth height animation: `max-height: 0` -> measured height, 300ms `ease-out`.

**Accordion item**:

| Element | Specification |
|---------|---------------|
| **Wrapper** | `border-bottom: 1px solid var(--color-line-subtle)`. |
| **Toggle button** | Full-width, `display: flex`, `justify-content: space-between`, `align-items: center`. `py-4`. `cursor: pointer`. |
| **Question text** | AS700, H4 size, `text-foreground`. |
| **Chevron** | Lucide `ChevronDown`, 20px, `text-muted`. `transform: rotate(0deg)` (closed), `rotate(180deg)` (open). Transition 200ms `ease-out`. |
| **Answer panel** | MR400, Body (1rem), `text-muted`. Line-height 1.6. `padding-bottom: 1rem`. Supports inline markdown (bold, links). |
| **ARIA** | Toggle button: `aria-expanded="true\|false"`, `aria-controls="faq-panel-{index}"`. Panel: `role="region"`, `aria-labelledby="faq-button-{index}"`. Keyboard: Arrow Up/Down navigates between buttons. Home/End jumps to first/last. Enter/Space toggles. |

**Structured data**: Outputs `FAQPage` JSON-LD with all question-answer pairs.

**Animation**: Section heading `ST-reveal`. Accordion items `ST-reveal` with `stagger(50ms)`.

**Component**: `<Accordion items={faqs} singleExpand={true} />`
**File location**: `src/components/shared/accordion.tsx`

---

## Section 3.7: Service CTA

`<CTASection />` with service-specific copy. Examples:
- Web Design: heading "Let's build something.", subtext "Start with a free analysis of your current site.", CTA "Get Free Analysis" -> `/analysis/`, secondary CTA "Get a Quote" -> `/pricing/`.
- AI Integration: heading "Got a process that could be smarter?", subtext "We'll be honest about whether AI is the right answer.", CTA "Tell Us About It" -> `/contact/`.

---

## Data Dependencies

| Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|---------------------------|---------------------------|---------------------|
| `content/pages/[service-dir]/*.md` | None | FAQ JSON-LD |

## Structured Data

| JSON-LD Schema Types |
|---------------------|
| `Service` (with `name`, `description`, `provider`, `areaServed`), `BreadcrumbList`, `FAQPage` |
