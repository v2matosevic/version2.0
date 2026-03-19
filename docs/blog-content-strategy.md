# Blog & SEO Content Strategy — Version2.hr

Last updated: 2026-03-06

The complete specification for the blog system: content strategy, article structure, SEO architecture, filtering/sorting, portfolio integration, new content planning, and technical implementation details.

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Content Quality Gap Analysis](#2-content-quality-gap-analysis)
3. [Blog Post Anatomy](#3-blog-post-anatomy)
4. [Category & Tag Architecture](#4-category--tag-architecture)
5. [Filtering, Sorting & Search](#5-filtering-sorting--search)
6. [SEO Architecture](#6-seo-architecture)
7. [Internal Linking Strategy](#7-internal-linking-strategy)
8. [Portfolio Integration in Blog](#8-portfolio-integration-in-blog)
9. [New Content Strategy](#9-new-content-strategy)
10. [Content Calendar Framework](#10-content-calendar-framework)
11. [Translation & Multilingual Strategy](#11-translation--multilingual-strategy)
12. [Technical Implementation Notes](#12-technical-implementation-notes)
13. [Open Questions & Decisions Needed](#13-open-questions--decisions-needed)

---

## 1. Current State Assessment

### What Exists

- **103 curated blog posts** (of 190 original) across 3 languages (EN/HR/DE)
- **English versions fully rewritten** through 4 passes (voice, links, factual accuracy, structural metadata)
- **Croatian and German versions are WordPress originals** — not rewritten, significantly lower quality
- **6 categories**, **17 tags** — clean taxonomy post-curation
- **Zero inline images** — blog posts are text-only (images stripped during WordPress extraction)
- **Featured images exist** for all posts (`.webp` or `.jpg` in `content/blog/[slug]/assets/`)
- Frontmatter schema is defined and consistent across all 103 EN posts
- Internal link mesh complete: every post has 1+ inbound links, 2-4 outbound internal links

### Category Distribution (103 Posts)

| Category | Count | % | Strength |
|---|---:|---:|---|
| Web Development | 39 | 37.9% | Strong — core service, deep coverage |
| SEO | 33 | 32.0% | Strong — core service, evergreen |
| Digital Marketing | 13 | 12.6% | Medium — adjacent, supports web clients |
| WordPress | 10 | 9.7% | Medium — legacy platform, educational |
| Business & Strategy | 5 | 4.9% | Weak — thin, needs expansion |
| AI & Automation | 3 | 2.9% | Very weak — core service, massively underrepresented |

### Key Strengths

1. EN blog posts are well-written with consistent brand voice (direct, specific, opinionated)
2. Internal link mesh is complete — no orphan posts
3. Every post ends with a soft CTA linking to relevant service page
4. Factual accuracy verified against February 2026 data
5. All banned words eliminated, no generic openers/closers
6. Categories and tags are clean, canonical, and consistent

### Key Weaknesses

1. **AI & Automation has only 3 posts** despite being a core service offering
2. **Business & Strategy has only 5 posts** — too thin to be a meaningful category
3. **Zero inline images** — every post is a wall of text
4. **HR/DE translations are WordPress-era quality** — corporate tone, old categories, stale tags, no internal links
5. **No code examples or technical deep-dives** — posts are all beginner/intermediate level
6. **No portfolio integration** — blog posts don't reference specific Version2 projects
7. **No data/research posts** — no original data, benchmarks, or case studies
8. **WordPress category may become irrelevant** over time as the brand moves away from WP

---

## 2. Content Quality Gap Analysis

### EN Posts: Quality Comparison

I sampled three representative posts to assess quality:

**"How to Make Your Website Faster"** (web-development)
- Quality: 4.5/5. Specific metrics (Core Web Vitals with targets), practical fixes, real scenario with before/after numbers, internal links to Cloudflare and optimization posts, CTA to /analysis/. Updated to INP (replacing FID). This is the standard all posts should meet.

**"What Is SEO and Why Should You Care?"** (seo)
- Quality: 4.5/5. Structured around the three types of SEO, debunks myths, honest about timelines, links to checklist, backlinks, Google My Business posts. CTA to /services/seo/ and /analysis/.

**"ChatGPT for Business: A Playbook That Gets Results"** (ai-automation)
- Quality: 4/5. Practical prompt templates, real workflow examples, links to AI services. Slightly less specific than the other two — could use real Version2 examples of AI integration work.

### HR/DE Posts: The Quality Cliff

Comparing the same "website speed" post across languages reveals a stark gap:

| Aspect | EN (rewritten) | HR (WordPress original) | DE (WordPress original) |
|---|---|---|---|
| Word count | ~900 | ~350 | ~350 |
| Tone | Direct, specific, opinionated | Corporate, generic, formal | Corporate, generic, formal (formal "Sie") |
| Structure | 7 sections with actionable subsections | 5 short sections, one "Zaključak" (conclusion) | 5 short sections, one "Abschluss" (conclusion) |
| Internal links | 4 (to related blog posts + services) | 0 | 0 |
| CTA | Soft, service-linked, separated by `---` | Hard sell: "Zakažite besplatno savjetovanje" | Hard sell: "Einen Termin machen" |
| Category | `web-development` (new) | `Web Dizajn` (old WordPress) | `Web-Design` (old WordPress) |
| Tags | `["Performance", "Web Development"]` (clean) | `["Blog", "Internet Prisutnost", "SEO", "Version2 Produkcija", "Web Dizajn"]` (legacy) |  `["Blog", "Internetpräsenz", "SEO", "Version2-Produktion", "Web-Design"]` (legacy) |
| `lastModified` | `2026-02-25` | `2023-08-18` | `2023-08-18` |
| Factual accuracy | Verified Feb 2026 (INP, not FID) | Outdated (references pre-2024 metrics) | Outdated |
| German address | N/A | N/A | Formal "Sie" (should be informal "du" per brand decision) |

**This is not a minor gap. The HR/DE versions are essentially different articles.** They cannot be served as-is without damaging the brand on Croatian and German searches.

### Content Depth Gaps

| Topic Area | Current Coverage | Needed |
|---|---|---|
| AI/ML integration | 3 generic posts | Technical deep-dives: RAG, chatbots, automation workflows |
| Next.js / React | 0 posts | Framework comparisons, architecture decisions, performance |
| TypeScript | 0 posts | Practical guides for business owners and developers |
| Web accessibility | 1 post (SEO-adjacent) | WCAG compliance, European Accessibility Act, auditing |
| E-commerce custom | 1 post (generic) | Payment integration, inventory, custom checkout flows |
| Performance engineering | 2 posts (basic) | Core Web Vitals deep-dive, image optimization, CDN strategy |
| Security | 2 posts (WordPress-focused) | Modern security: CSP, HTTPS, auth patterns, GDPR technical |
| Case studies | 0 (13 removed) | New portfolio-linked case studies with real metrics |

---

## 3. Blog Post Anatomy

### Frontmatter Schema (Canonical)

```yaml
---
title: "Compelling Title (can differ from H1)"     # Required. Used in <title>, OG, cards
slug: "kebab-case-slug"                             # Required. Max 38 chars. URL-safe
originalUrl: "https://version2.hr/en/old-url/"      # Required. For redirect mapping
language: "en"                                      # Required. en | hr | de
translations:
  hr: "croatian-slug"                               # Required for cross-linking
  de: "german-slug"                                 # Required for cross-linking
date: "2023-08-17"                                  # Required. Original publication (YYYY-MM-DD)
lastModified: "2026-02-25"                          # Required. Last edit date
author: "Version2"                                  # Required. Always "Version2" (no individual bylines)
category: "web-development"                         # Required. Single. Kebab-case. One of 6 values
tags: ["Performance", "Web Development"]            # Required. 2-4 tags. Title Case. From canonical 17
excerpt: "Short description for cards and meta..."  # Required. 120-160 chars. Used as meta description
featuredImage: "./assets/featured.webp"             # Required. Relative path. 16:9 aspect ratio
---
```

### Required Post Elements

Every blog post MUST have these elements, in this order:

1. **Frontmatter** — complete, validated against schema
2. **H1 headline** — matches or closely relates to `title`. Hooks the reader.
3. **Opening paragraph** — 1-2 sentences. State the problem or hook. No generic openers.
4. **H2 sections** — 3-7 sections. Each with a clear, scannable heading.
5. **H3 subsections** — optional, used for detailed breakdowns within H2s
6. **Internal links** — 2-4 per post. Mix of blog posts and service pages. Natural, not forced.
7. **Horizontal rule** (`---`) — separates content from CTA
8. **Soft CTA** — italicized, 1-2 sentences. Links to relevant service page + /analysis/ or /contact/

### What Goes in a Post

- Practical, actionable advice with specific tools, numbers, or steps
- Real examples (Version2 projects when available, industry examples otherwise)
- Links to related posts (same category first, then cross-category)
- Links to relevant service pages (1-2 per post, natural placement)
- Code snippets where relevant (fenced markdown with language identifier)
- Blockquotes for emphasis or pull quotes (sparingly)
- Numbered lists for sequential steps, bullet lists for feature/option lists
- Tables for comparisons or data presentation

### What Does NOT Go in a Post

- Newsletter signup (no newsletter exists, per brand discovery)
- Comment section (AI chatbot handles questions, comments are mostly spam)
- Author bio section (always "Version2", no individual profiles)
- Social follow widgets (social links are in footer/menu only)
- Related posts inline (the Related Posts component is a separate section below the post)
- Ads or sponsored content indicators
- "Last updated" in the body (it's in frontmatter metadata, shown in the meta row)
- Generic stock phrases (see `docs/brand-voice.md` banned words list)

### Post Length Guidelines

| Post Type | Target Words | Sections (H2) |
|---|---|---|
| Explainer ("What is X?") | 800-1200 | 4-6 |
| How-to guide | 1000-1500 | 5-7 |
| Comparison/vs post | 1000-1500 | 5-7 |
| Deep-dive/technical | 1500-2500 | 6-10 |
| Case study / project walkthrough | 800-1200 | 4-6 |
| Opinion/thought leadership | 600-1000 | 3-5 |

### CTA Variations by Category

The closing CTA should relate to the post's topic. Pre-defined patterns:

| Category | CTA Template |
|---|---|
| web-development | `*We build [custom websites / web apps] from scratch. Want to know how your current site performs? [Get a free analysis.](/analysis/)*` |
| seo | `*We do [SEO for businesses](/services/seo/) across Europe. Want to know where your site stands? [Get a free analysis.](/analysis/) No pitch. Just a straight report.*` |
| digital-marketing | `*Need a website that actually converts? [See what we build.](/portfolio/) Or [get a free analysis](/analysis/) of your current site.*` |
| wordpress | `*Still on WordPress? We maintain existing sites and build custom replacements when you're ready. [Talk to us.](/contact/)*` |
| business-strategy | `*Your website is the foundation. [See how we build them.](/services/web-design/) Or [start with a free analysis.](/analysis/)*` |
| ai-automation | `*Want AI that actually works for your business? [Check out our AI integration services.](/services/ai-integration/) Or [tell us what you need.](/contact/)*` |

---

## 4. Category & Tag Architecture

### Categories (6 — Fixed Taxonomy)

Categories are the primary organization axis. Each post belongs to exactly ONE category.

| Slug | Display Name (EN) | Display Name (HR) | Display Name (DE) | Purpose |
|---|---|---|---|---|
| `web-development` | Web Development | Web Razvoj | Webentwicklung | Core: sites, apps, UX, performance, design |
| `seo` | SEO | SEO | SEO | Core: technical SEO, on-page, local, tools |
| `digital-marketing` | Digital Marketing | Digitalni Marketing | Digitales Marketing | Adjacent: content strategy, branding, e-commerce marketing |
| `wordpress` | WordPress | WordPress | WordPress | Legacy platform: guides, optimization, migration |
| `business-strategy` | Business & Strategy | Poslovanje i Strategija | Geschäft & Strategie | Business: pricing, planning, ROI, process |
| `ai-automation` | AI & Automation | AI i Automatizacija | KI & Automatisierung | Core: AI tools, chatbots, automation, LLMs |

**Category rules:**
- Categories are static. Adding a new category requires updating: blog listing pills, UI strings (3 languages), sitemap category redirects, search index weights, and this document.
- A post's category is set by its PRIMARY topic, not every topic it touches. A post about "SEO for e-commerce sites" is `seo`, not `digital-marketing`.
- Category counts shown in filter pills are computed at build time.

### Tags (17 — Canonical Set)

Tags are secondary, cross-cutting labels. Each post has 2-4 tags from this fixed set.

`AI` · `Branding` · `Content Strategy` · `Conversion` · `Copywriting` · `Digital Business Card` · `E-commerce` · `Hosting` · `Local SEO` · `Performance` · `Security` · `SEO` · `Typography` · `UX` · `Web Design` · `Web Development` · `WordPress`

**Tag rules:**
- Tags are display-only (shown below the post content). They are NOT filterable on the listing page.
- Tags are NOT linked (clicking a tag does nothing). Filtering is via categories only.
- The build-time tag extractor filters to this canonical list. Legacy WordPress tags (`Blog`, `Internet Prisutnost`, `Version2 Produkcija`, etc.) are excluded.
- New tags can be added when 3+ posts would use them. Don't create a tag for a single post.

### Why Tags Are Display-Only

The decision to make tags non-filterable is intentional:
1. **103 posts don't justify two filtering dimensions.** Category filter covers the main use case.
2. **17 tags across 103 posts means most tags have <10 posts.** Tag pages with 3 results are useless.
3. **Keeping tags display-only preserves future flexibility.** They can become filterable later without any content changes.
4. **Search covers the cross-cutting use case.** If someone wants "Performance + SEO", Fuse.js search handles that better than tag intersection.

---

## 5. Filtering, Sorting & Search

### Blog Listing Page Behavior

**Default state:** All 103 posts, sorted by date descending, 12 visible, Load More button.

**Category filter:**
- Horizontal pill bar below the search input
- Pills: All | Web Development (39) | SEO (33) | Digital Marketing (13) | WordPress (10) | Business & Strategy (5) | AI & Automation (3)
- Click updates URL to `?category=web-development` (shareable, bookmarkable)
- `useSearchParams()` wrapped in `<Suspense>` (recommended for clean loading states; not a hard requirement in standalone mode since SSR handles the initial render)
- Selecting a category resets the Load More counter to 12
- "All" clears the query param

**Search:**
- Fuse.js with lazy-loaded index (~50-80KB JSON, loaded on first input focus)
- Searched fields with weights: `title` (0.4), `excerpt` (0.3), `tags` (0.15), `contentPreview` (0.15)
- `contentPreview` = first 200 characters of raw markdown, stripped of formatting
- Fuzzy threshold: 0.3 (tolerant of typos)
- Max 8 visible results in dropdown
- When search is active: ALL matching results display in the grid (no pagination), Load More hidden
- Search is combinable with category filter (search within filtered set)
- ARIA: combobox pattern with listbox results, keyboard navigation (arrows, enter, escape)

**Sorting:**
- Default and only sort: date descending (newest first)
- No user-selectable sort options at launch. With 103 posts, date sort is sufficient.
- Future consideration: "Most read" sort (requires analytics backend data)

### Search Index Structure

Generated at build time. One index per language.

```typescript
type SearchIndexEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  contentPreview: string;  // First 200 chars of raw markdown, stripped
  date: string;
  featuredImage: string | null;
  readingTime: number;
};
```

Index file: `/blog/search-index-[lang].json` (generated alongside the build output)

### Load More Behavior

- Initial: 12 posts
- Each click: +12 posts
- Button text: "Load More (N remaining)"
- When all posts loaded or all filtered posts shown: button disappears
- Search override: when search is active, pagination is disabled, all results shown

---

## 6. SEO Architecture

### Per-Post SEO Elements

Every blog post page renders these SEO elements:

**`<head>` tags:**

```html
<!-- Title: post title + site name -->
<title>How to Make Your Website Faster | Version2</title>

<!-- Meta description: from frontmatter excerpt -->
<meta name="description" content="A slow website costs you visitors..." />

<!-- Canonical URL -->
<link rel="canonical" href="https://version2.hr/blog/how-to-optimize-web-page-speed/" />

<!-- hreflang (all 3 languages + x-default) -->
<link rel="alternate" hreflang="en" href="https://version2.hr/blog/how-to-optimize-web-page-speed/" />
<link rel="alternate" hreflang="hr" href="https://version2.hr/hr/blog/kako-optimizirati-brzinu-web-stranice/" />
<link rel="alternate" hreflang="de" href="https://version2.hr/de/blog/so-optimieren-sie-die-geschwindigkeit-von-webseiten/" />
<link rel="alternate" hreflang="x-default" href="https://version2.hr/blog/how-to-optimize-web-page-speed/" />

<!-- Open Graph -->
<meta property="og:title" content="How to Make Your Website Faster" />
<meta property="og:description" content="A slow website costs you visitors..." />
<meta property="og:image" content="https://version2.hr/og/blog/how-to-optimize-web-page-speed.png" />
<meta property="og:url" content="https://version2.hr/blog/how-to-optimize-web-page-speed/" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2023-08-17" />
<meta property="article:modified_time" content="2026-02-25" />
<meta property="article:section" content="Web Development" />
<meta property="article:tag" content="Performance" />
<meta property="article:tag" content="Web Development" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="How to Make Your Website Faster" />
<meta name="twitter:description" content="A slow website costs you visitors..." />
<meta name="twitter:image" content="https://version2.hr/og/blog/how-to-optimize-web-page-speed.png" />
```

**JSON-LD Structured Data:**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Make Your Website Faster (And Why It Matters)",
  "description": "A slow website costs you visitors, rankings, and money.",
  "image": "https://version2.hr/content/blog/how-to-optimize-web-page-speed/assets/featured.webp",
  "author": {
    "@type": "Organization",
    "name": "Version2",
    "url": "https://version2.hr"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Version2",
    "logo": {
      "@type": "ImageObject",
      "url": "https://version2.hr/logo.png"
    }
  },
  "datePublished": "2023-08-17",
  "dateModified": "2026-02-25",
  "articleSection": "Web Development",
  "wordCount": 900,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://version2.hr/blog/how-to-optimize-web-page-speed/"
  }
}
```

**Breadcrumbs (JSON-LD + visible):**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://version2.hr/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://version2.hr/blog/" },
    { "@type": "ListItem", "position": 3, "name": "How to Make Your Website Faster" }
  ]
}
```

### Blog Listing Page SEO

```html
<title>Blog | Version2 — Web Development, SEO & AI</title>
<meta name="description" content="Thoughts on web development, SEO, and building things that work. Practical guides from a web development studio that writes every line of code." />
```

JSON-LD: `CollectionPage` + `BreadcrumbList`

When a category filter is active (`?category=seo`), the `<title>` becomes:
`SEO Articles | Blog | Version2`

### OG Image Strategy

- **Default:** Satori-generated at build time. Dark background (#141414), Albert Sans headline, brand red accent line, Version2 logo. 1200x630px.
- **Per-post:** Generated from frontmatter `title` + `category`. No custom images per post (103 posts makes manual OG images impractical).
- **Template:** Defined in Sprint 1.2, generator built in Sprint 1.3.

### URL Structure Recap

```
EN: /blog/                          → Blog listing
EN: /blog/[slug]/                   → Blog post
HR: /hr/blog/                       → Blog listing (Croatian)
HR: /hr/blog/[slug]/                → Blog post (Croatian)
DE: /de/blog/                       → Blog listing (German)
DE: /de/blog/[slug]/                → Blog post (German)
```

Blog slugs differ per language. The EN slug is in the EN frontmatter, the HR slug is the directory name (WordPress original), the DE slug is in the DE frontmatter.

### RSS Feed (Decision: OPEN → Recommended YES)

Auto-generate `/feed.xml` at build time. Include all 103 posts (EN only, or one feed per language). Fields: title, link, description (excerpt), pubDate, category. ~50 lines of build script. Submit to Google Search Console alongside sitemap.

---

## 7. Internal Linking Strategy

### Current State (Post-Rewrite)

All 103 EN posts have been through an internal link pass (Pass 4):
- Every post has 2-4 internal links
- Every post has 1+ inbound links (zero orphans)
- Links use new URL structure (`/blog/[slug]/`, `/services/[slug]/`)
- All absolute `version2.hr` URLs removed from body content
- Links are contextual (flow naturally in the text)

### Link Types in Blog Posts

| Link Type | Target | Frequency | Purpose |
|---|---|---|---|
| Blog-to-blog | `/blog/[related-slug]/` | 1-3 per post | Keep readers on site, build topic clusters |
| Blog-to-service | `/services/[service]/` | 1-2 per post | Funnel readers toward conversion |
| Blog-to-analysis | `/analysis/` | 0-1 per post (CTA) | Lead generation |
| Blog-to-contact | `/contact/` | 0-1 per post (CTA) | Direct conversion |
| Blog-to-pricing | `/pricing/` | 0-1 per post | When pricing is discussed |
| External | Various | 0-2 per post | Tools, Google docs, authoritative sources |

### Topic Cluster Architecture

Blog posts form natural clusters around the service pages:

```
/services/web-design/ (hub)
  ├── /blog/how-to-optimize-web-page-speed/
  ├── /blog/what-is-responsive-web-design/
  ├── /blog/modern-web-design-ideas/
  ├── /blog/how-to-make-a-good-landing-page/
  ├── /blog/web-design-dos-and-donts/
  └── ... (39 posts)

/services/seo/ (hub)
  ├── /blog/what-is-seo-optimization/
  ├── /blog/seo-checklist-complete-guide/
  ├── /blog/what-are-backlinks-why-are-important/
  ├── /blog/what-is-domain-rating/
  └── ... (33 posts)

/services/ai-integration/ (hub)
  ├── /blog/chatgpt-how-to-use-it-for-your-purpose/
  ├── /blog/how-ai-is-changing-digital-marketing/
  ├── /blog/how-to-use-chatgpt-ai/
  └── (NEEDS MORE POSTS — only 3)

/services/e-commerce/ (hub)
  ├── /blog/how-to-advertise-your-web-shop/
  ├── /blog/how-to-write-good-product-descriptions/
  └── (NEEDS MORE POSTS)
```

### Rules for New Posts

When writing new posts, follow this internal linking protocol:
1. Link to 1-2 existing posts in the same category (builds cluster depth)
2. Link to 1 existing post in a different category (builds cross-cluster connections)
3. Link to the relevant service page (funnels toward conversion)
4. After publishing, update 2-3 existing posts to link back to the new post

---

## 8. Portfolio Integration in Blog

### Current State

Zero portfolio integration. All 13 old case study posts were removed (outdated client work). The portfolio and blog are completely separate systems.

### Recommended Integration Points

Portfolio projects should appear in the blog in three ways:

#### 8a. Project Case Study Posts (New Content Type)

Write dedicated blog posts for each portfolio project. These are NOT the portfolio case study pages (`/portfolio/[slug]/`). They are blog posts that tell the story of the project from a technical or strategic angle.

**Structure:**
```markdown
---
title: "How We Built a Booking System for Blix.hr"
category: "web-development"
tags: ["Web Development", "E-commerce", "UX"]
# ... standard frontmatter
---

# How We Built a Booking System for Blix.hr

[Opening: the client's problem]

## The Challenge
[What the client needed and why it mattered]

## Our Approach
[Technical decisions, stack choices, architecture]

## Key Features We Built
[Specific features with implementation details]

## Results
[Metrics: load time, conversion rate, client feedback]

---

*See the full project: [Blix.hr case study](/portfolio/blix/). Want something similar? [Let's talk.](/contact/)*
```

**Difference from portfolio page:** The blog post goes deeper into the HOW and WHY. The portfolio page is a visual showcase (screenshots, iframe embed, tech stack badge list). The blog post is a narrative that demonstrates expertise.

**Cross-linking:** Blog case study post links to portfolio page. Portfolio page links back to blog post under "Read the technical breakdown."

#### 8b. Project References in Existing Posts

When an existing post discusses a topic Version2 has built for a client, reference the project:

> "We built exactly this for LCL Optika — a custom e-commerce site with product configurator and appointment booking. [See the project.](/portfolio/lcl-optika/)"

This is lighter than a full case study post. It's a 1-2 sentence reference that adds credibility.

**Rule:** Only reference portfolio projects that have published case study pages. Don't reference projects that aren't on the site yet.

#### 8c. Related Projects in Blog Post Template

The blog post template already has a CTA section (Section 7.7) that varies by category. Extend this to optionally show 1-2 related portfolio cards:

```
Section 7.7: Post CTA
├── Category-specific CTA heading
├── CTA text + links
└── (Optional) 1-2 portfolio cards if projects exist in same category
```

This is a design/template decision, not a content decision. It requires:
- A mapping of portfolio projects to blog categories
- Conditional rendering (only show if matching projects exist)
- The portfolio case study pages to exist first

---

## 9. New Content Strategy

### Priority 1: Fill the Gaps (AI & Automation)

The AI & Automation category has only 3 posts but is a core service. This is the biggest content gap.

**Recommended new posts:**

| Title Concept | Angle | Target Keywords |
|---|---|---|
| "What AI Integration Actually Means for Your Website" | Explainer: chatbots, search, automation, recommendation | ai website integration, ai chatbot website |
| "RAG vs Fine-Tuning: Which One Your Business Needs" | Technical comparison, use cases, cost | RAG vs fine-tuning, business ai |
| "We Built an AI Chat Agent. Here's What We Learned" | Case study of the Version2 site's own AI agent | ai chat agent, website chatbot |
| "5 AI Features That Actually Help Your Customers" | Practical: smart search, chatbot, auto-tagging, recommendations, translation | ai features website |
| "AI for E-Commerce: Beyond Product Recommendations" | Deep-dive: dynamic pricing, inventory prediction, personalization | ai ecommerce |

### Priority 2: Technical Deep-Dives (Developer Audience)

Version2 currently has zero posts targeting developers. Adding technical content:
- Establishes credibility with technical decision-makers
- Targets long-tail keywords other studios miss
- Demonstrates the "we build what others can't" positioning

**Recommended new posts:**

| Title Concept | Angle |
|---|---|
| "Why We Chose Next.js Over WordPress for Every New Project" | Framework comparison, real metrics |
| "Static Export vs SSR: When Each Makes Sense" | Architecture decision guide |
| "How We Handle 3 Languages Without an i18n Library" | Technical deep-dive into Version2's own routing |
| "Building a Real-Time Pricing Configurator" | Technical walkthrough of the pricing tool |
| "Custom vs Template: The Real Cost Comparison" | Data-driven comparison with specific numbers |
| "Core Web Vitals in 2026: What Actually Matters" | Updated performance guide with LCP/INP/CLS |

### Priority 3: Business & Strategy Expansion

Only 5 posts in this category. Needs expansion to attract business decision-makers.

**Recommended new posts:**

| Title Concept | Angle |
|---|---|
| "How to Brief a Web Developer (So You Get What You Want)" | Practical guide for clients |
| "Website Costs in Europe: What You're Actually Paying For" | Transparent pricing breakdown |
| "When to Redesign vs When to Rebuild" | Decision framework |
| "The Real ROI of a Custom Website vs a Template" | Business case with numbers |
| "What Your Website Says About Your Business" | Brand positioning through web |

### Priority 4: Refresh Existing WordPress Posts

The 10 WordPress posts position WP as a tool, not the enemy. But some need updating:
- Elementor posts should acknowledge its improvements AND explain when to outgrow it
- "Is WordPress the Best CMS?" should be reframed around when it IS and ISN'T appropriate
- All should link to custom development as the next step when the client is ready

### Priority 5: Accessibility & Compliance (Emerging Topic)

The European Accessibility Act takes effect June 2025. This is timely, underserved content.

| Title Concept | Angle |
|---|---|
| "European Accessibility Act: What Website Owners Need to Know" | Compliance guide |
| "WCAG 2.2 in Plain Language" | Practical checklist |
| "How We Build Accessible Websites" | Process + tools |

### Content Velocity Recommendation

- **Launch:** 103 existing posts. No new posts needed for launch.
- **Post-launch Month 1-3:** 2 posts/month. Focus on AI & Automation + 1 case study.
- **Ongoing:** 2-4 posts/month. Mix of new topics, case studies, and refreshes of older posts.
- **Refreshes:** Review and update 5 older posts/month (new data, new links, improved examples).

---

## 10. Content Calendar Framework

### Post Types and Cadence

| Type | Frequency | Purpose |
|---|---|---|
| **How-to guide** | 1-2/month | SEO traffic, demonstrate expertise |
| **Project case study** | 1/month (when available) | Portfolio integration, social proof |
| **Technical deep-dive** | 1/month | Developer audience, differentiation |
| **Opinion/thought piece** | 1/quarter | Brand voice, shareability |
| **Tool/resource review** | 1/quarter | SEO for comparison keywords |
| **Content refresh** | 5 existing posts/month | Keep evergreen content current |

### Seasonal Opportunities

| Month | Topic Opportunity |
|---|---|
| January | "Web trends for [year]" roundup, planning-season content |
| March | "European Accessibility Act" compliance (June enforcement) |
| June | Mid-year SEO checkup, Core Web Vitals update cycle |
| September | Q4 planning, "get your website ready for the holidays" |
| October | Cybersecurity awareness month, security posts |
| November | Black Friday / e-commerce prep for webshop clients |

### Editorial Workflow (CMS-Driven)

1. Draft in the CMS backend (or directly in markdown files during development)
2. Review against content rewrite rules (`tasks/content-rewrite-plan.md` Section 4)
3. Verify: banned words check, internal links (2-4), CTA matches category
4. Translate to HR/DE (or mark for translation queue)
5. Publish via CMS → triggers static rebuild → deploys to Hostinger

---

## 11. Translation & Multilingual Strategy

### The Problem

HR/DE blog posts are WordPress originals: corporate tone, outdated facts, no internal links, legacy categories/tags, formal "Sie" in German. The EN versions have been through 4 rewrite passes. The quality gap is severe.

### The Plan

**Phase 1 (Launch):** Ship all 103 × 3 = 309 blog routes. HR/DE posts render as-is. The fallback chain handles missing translations gracefully.

**Phase 2 (Post-launch):** Rewrite HR/DE posts in priority order:
1. Top 20 posts by organic traffic (check Google Search Console post-launch)
2. All AI & Automation posts (only 3 — quick win)
3. Service-adjacent posts that rank for Croatian/German keywords
4. Remaining posts in batches of 10

**Rewrite scope per HR/DE post:**
- Match the EN version's structure and depth (not word-for-word translation)
- Apply brand voice in the target language
- Update category to new kebab-case value
- Replace legacy tags with canonical 17
- Add 2-4 internal links (matching the EN link targets)
- Update `lastModified` date
- German: switch from "Sie" to "du" address
- Add the `---` + soft CTA pattern

### Content Fallback Chain

At build time:
1. Requested language file exists → render it
2. Requested language file missing → render English version with a notice banner
3. English version missing → render a "content not available" page (should never happen for the 103 curated posts)

The notice banner (for fallback content): "This article is available in English. [Read in English](/blog/[en-slug]/) | [Switch to English](/)" (Note: English URLs have no prefix -- `/blog/slug/`, not `/en/blog/slug/`)

---

## 12. Technical Implementation Notes

### Build-Time Processing Pipeline

```
content/blog/[slug]/[lang].md
  → gray-matter (extract frontmatter + raw markdown)
  → validate frontmatter against schema (warn on missing fields)
  → filter against curation manifest (KEEP list only)
  → strip H1 from body (title comes from frontmatter, rendered by template)
  → unified pipeline: remark-parse → remark-rehype → rehype-highlight → rehype-stringify
  → compute reading time (words / 200, rounded up)
  → generate TOC from H2/H3 headings (id + text + level)
  → strip markdown formatting for contentPreview (first 200 chars)
  → output: BlogPost object
```

### Search Index Generation

```
For each language:
  → load all 103 BlogPostMeta objects
  → extract: slug, title, excerpt, category, tags, contentPreview, date, featuredImage, readingTime
  → write to /blog/search-index-[lang].json
  → compress (gzip at deploy time, ~15-25KB compressed)
```

### Static Params Generation (Optional Optimization)

`generateStaticParams` is optional in standalone mode — pages without it are rendered on-demand via SSR. However, using it for the 103 curated blog posts is recommended to pre-render them at build time for optimal first-load performance.

For new blog posts added via the CMS after deployment, **ISR (Incremental Static Regeneration)** can serve fresh content without a full rebuild. Set `revalidate` in the page or layout to enable time-based revalidation (e.g., `export const revalidate = 3600` for hourly checks). This eliminates the need for a full site rebuild on every new post — the CMS rebuild trigger can instead call `revalidatePath('/blog/[slug]')` or `revalidateTag('blog')`.

```typescript
// src/app/blog/[slug]/page.tsx
export function generateStaticParams() {
  return getCuratedBlogSlugs('en').map(slug => ({ slug }));
}

// src/app/hr/blog/[slug]/page.tsx
export function generateStaticParams() {
  return getCuratedBlogSlugs('hr').map(slug => ({ slug }));
}

// src/app/de/blog/[slug]/page.tsx
export function generateStaticParams() {
  return getCuratedBlogSlugs('de').map(slug => ({ slug }));
}
```

### Related Posts Algorithm

For a given post, select 3 related posts:
1. Same category, sorted by date descending, exclude current post → take first 3
2. If fewer than 3 in same category → fill remaining from other categories, sorted by date
3. Never show the current post in its own related posts

### Reading Time Calculation

```typescript
function calculateReadingTime(rawMarkdown: string): number {
  const words = rawMarkdown.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

### TOC Generation

```typescript
function generateTOC(html: string): { id: string; text: string; level: 2 | 3 }[] {
  // Parse rendered HTML for <h2> and <h3> elements
  // Extract id (auto-generated from heading text, kebab-case)
  // Return array only if length >= 3 (per blog post blueprint)
}
```

### Image Handling

- Featured images: `content/blog/[slug]/assets/featured.webp` (or `.jpg`)
- Inline images: currently none (text-only extraction from WordPress)
- Future inline images: relative paths `./assets/image-name.webp`
- Build-time optimization: Sharp script resizes to max 1200px width, generates WebP, creates tiny base64 placeholder for blur-up loading
- `loading="lazy"` on all blog images except the featured image hero (which is above the fold)

### Code Block Syntax Highlighting

- Library: `rehype-highlight` (part of the unified pipeline)
- Theme: custom dark theme matching the design system
  - Background: `bg-sunken` token
  - Comments: `text-faint`
  - Strings: `text-brand-red-light` (lighter red for readability)
  - Keywords: `text-foreground`
  - Functions: `text-muted`
  - NO neon greens, blues, or purples (per CLAUDE.md aesthetic bans)
- Supported languages: JavaScript, TypeScript, HTML, CSS, JSON, Bash, Python, PHP

---

## 13. Open Questions & Decisions Needed

### Before Build

| # | Question | Impact | Recommendation |
|---|---|---|---|
| 1 | **RSS feed — yes or no?** | Build script (~50 lines) | Yes. Trivial effort, free SEO. One feed per language. |
| 2 | **Should tags become filterable later?** | Affects URL strategy (`?tag=X`) | No for launch. Revisit at 200+ posts. |
| 3 | **Blog post inline images — when to add?** | Content quality, page weight | Post-launch. EN posts first. 2-4 images per post. |
| 4 | **Author field — always "Version2"?** | JSON-LD, meta, UI | Yes for now. Add individual authors only if team grows. |
| 5 | **Reading time — words per minute?** | Consistency | 200 wpm (standard for technical content) |

### Before Post-Launch Content Push

| # | Question | Impact | Recommendation |
|---|---|---|---|
| 6 | **Which 5 portfolio projects will have case study posts?** | Content planning, portfolio integration | Owner to provide. Must have: screenshots, tech stack, results. |
| 7 | **HR/DE rewrite priority — traffic-based or category-based?** | Translation queue | Traffic-based (requires 1-2 months of Search Console data post-launch). |
| 8 | **New post language — EN first or all 3 simultaneously?** | Workflow, cost | EN first, then translate. Same as current pattern. |
| 9 | **Will blog posts ever have comments?** | Template design, backend | No. AI chatbot handles questions. Comments are spam. |
| 10 | **Content preview length in search index?** | Index size vs search quality | 200 chars. Balances size (~60KB) and match quality. |

---

## Referenced Documents

- `docs/pages/blog-listing.md` — Blog listing page blueprint
- `docs/pages/blog-post.md` — Blog post page blueprint
- `docs/content-structure.md` — Content file organization and schemas
- `docs/seo-migration-strategy.md` — URL changes, redirects, migration checklist
- `docs/brand-voice.md` — Tone, banned words, formatting rules
- `docs/i18n.md` — Language strategy, routing, hreflang
- `tasks/blog-curation-manifest.md` — 103 KEEP / 87 DROP definitive list
- `tasks/blog-tiering-report.md` — Classification methodology
- `tasks/content-rewrite-plan.md` — Rewrite guidelines, progress tracking
- `tasks/internal-links-report.md` — All internal links mapped
- `tasks/redirect-map.md` — ~730 redirect rules
