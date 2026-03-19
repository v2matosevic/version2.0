# Content Structure

## Overview

All website content is pre-extracted from the WordPress site and stored in `content/`. The Next.js app reads these files at build time to generate static pages.

```
content/
├── site-config.json        # Global config: nav, branding, contact, analytics, forms
├── pricing-config.json     # Interactive pricing tool configuration (66 options, 10 categories)
├── pages/                  # 17 active page directories (stale directories cleaned up 2026-02-25)
│   ├── home/                  # Homepage
│   ├── o-nama/                # About (maps to /about/)
│   ├── kontakt/               # Contact (maps to /contact/)
│   ├── usluge/                # Services overview (maps to /services/)
│   ├── web-dizajn/            # Web Design (maps to /services/web-design/)
│   ├── seo-optimizacija-trazilice/  # SEO (maps to /services/seo/)
│   ├── web-aplikacije/        # Web Applications (maps to /services/web-applications/)
│   ├── e-trgovina/            # E-Commerce (maps to /services/e-commerce/)
│   ├── ai-integracija/        # AI Integration (maps to /services/ai-integration/)
│   ├── karijera/              # Career (maps to /career/)
│   ├── analiza/               # Free Analysis (maps to /analysis/)
│   ├── pravna-obavijest/      # Legal Notice (maps to /legal-notice/)
│   ├── uvjeti-koristenja/     # Terms & Conditions (maps to /terms-and-conditions/)
│   ├── politika-privatnosti/  # Privacy Policy (maps to /privacy-policy/)
│   ├── kolacici/              # Cookie Policy (maps to /cookies/)
│   ├── politika-povrata/      # Right of Withdrawal & Refunds (maps to /refund-policy/)
│   └── izjava-o-pristupacnosti/  # Accessibility Statement (maps to /accessibility/)
├── blog/                   # 190 blog post directories (103 kept, 87 dropped — see tasks/blog-curation-manifest.md)
│   ├── slug-name/
│   │   ├── hr.md
│   │   ├── en.md
│   │   ├── de.md
│   │   └── assets/
│   │       └── featured.jpeg
│   └── ...
├── products/               # Digital business card products (21 cards, used by card customizer)
│   ├── products.json       # Product catalog: i18n category/features/colors, pricing, shared specs, 21 products
│   └── assets/             # Product images (21 .webp files, kebab-case)
└── assets/                 # Global shared assets
    ├── clients/            # Client logos (29 canonical files, kebab-case)
    ├── partners/           # Partner logos (Hostinger, Cloudflare)
    ├── logos/              # Version2 logos (white, black, variants)
    ├── flags/              # Language flag icons (de.png, en.png, hr.png)
    ├── favicon/
    └── og-images/
```

> **Note:** Page directory names in `content/pages/` use the original WordPress Croatian slugs. These do NOT match the new URL structure. The data layer maps directory names to new routes via the slug in frontmatter and the route config in `docs/sitemap.md`. For the full mapping of old URLs to new URLs, see `tasks/redirect-map.md`.

## Page Content Format

Each page directory contains up to 3 markdown files (one per language) and an optional `assets/` folder.

### Frontmatter Schema (Pages)

```yaml
---
title: "Page Title"
slug: "page-slug"               # Empty string for homepage
originalUrl: "https://..."      # Full WordPress URL (for URL preservation)
language: "hr"                  # hr | en | de
translations:
  en: "english-slug"
  de: "german-slug"
type: "page"
isHomepage: true                # Only on homepage
description: "Meta description"
---
```

### Body

Standard markdown. Headings, paragraphs, lists, blockquotes. Some pages have inline images referencing `./assets/filename`.

### Upcoming Fields (Not Yet in Content Files)

The following fields are defined in component specs but will be added to content files during implementation:

- **`faqs`** (service pages only): Array of `{ question, answer }` objects. 5-8 per service page. Added during Sprint 2.3. See `components/features.md` Service Page FAQ section.

## Blog Post Format

Same structure as pages but with additional frontmatter fields.

### Frontmatter Schema (Blog Posts)

```yaml
---
title: "Post Title"
slug: "post-slug"
originalUrl: "https://..."
language: "hr"
translations:
  en: "english-slug"
  de: "german-slug"
date: "2024-02-11"              # Publication date (YYYY-MM-DD)
lastModified: "2024-02-13"      # Last edit date
author: "Version2"
category: "web-development"      # Single category string (kebab-case)
tags: ["Web Development", "Performance"]  # Array of tag strings (Title Case)
excerpt: "Short description..."
featuredImage: "./assets/featured.jpeg"
---
```

### Blog Categories (final)

Categories used by the 103 kept blog posts (kebab-case in frontmatter, display name in UI):
- `web-development` — Web Development (39 posts)
- `seo` — SEO (33 posts)
- `digital-marketing` — Digital Marketing (13 posts)
- `wordpress` — WordPress (10 posts)
- `business-strategy` — Business & Strategy (5 posts)
- `ai-automation` — AI & Automation (3 posts)

Old WordPress categories (Web Dizajn, Društvene Mreže, Digitalni Marketing, Blog) were remapped during the content rewrite passes. See `tasks/content-rewrite-plan.md` Section 4 for the mapping. The 87 dropped posts retain their original WordPress categories (Social Media, Digital Marketing, case-studies, Video and Photo, Reference) — these are excluded from the build.

### Blog Tags (17 clean taxonomy)

Tags used across the 103 kept blog posts (Title Case in frontmatter). Extracted dynamically at build time for tag pills and filtering — this list is for reference:

`AI`, `Branding`, `Content Strategy`, `Conversion`, `Copywriting`, `Digital Business Card`, `E-commerce`, `Hosting`, `Local SEO`, `Performance`, `Security`, `SEO`, `Typography`, `UX`, `Web Design`, `Web Development`, `WordPress`

Note: Some kept posts still carry legacy tags from the WordPress era (`Blog`, `Social Media`, `Marketing`, etc.) — these are excluded from the displayed tag set. The build-time tag extractor should filter to this canonical list only.

### SEO Meta Description Mapping

- **Pages:** Use the `description` frontmatter field for `<meta name="description">`.
- **Blog posts:** Use the `excerpt` frontmatter field for `<meta name="description">`. Blog posts do not have a `description` field.

## site-config.json

Global configuration. Contains:
- **site**: name, URL, tagline, languages
- **business**: legal name, OIB, address, banking (for footer/legal pages)
- **contact**: email, phone, WhatsApp link
- **social**: Facebook, Instagram, Twitter, TikTok URLs
- **analytics**: GA4 ID, Google Ads IDs, Facebook Pixel ID
- **branding**: color palette, typography
- **navigation**: header (3 items), menu (full sidebar nav with children), footer (services/company/legal)
- **forms**: contact form field definitions

## Asset Organization

Images are organized within their respective directories:
- **Global assets** (`content/assets/`): logos, client logos, partner logos, flags, favicons, OG images
- **Page assets** (`content/pages/[page]/assets/`): per-page images (hero images, product images)
- **Blog assets** (`content/blog/[slug]/assets/`): featured images per blog post

## TypeScript Interfaces

```typescript
type Language = 'en' | 'hr' | 'de';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;        // rendered HTML
  rawContent: string;     // original markdown
  date: string;           // ISO 8601
  lastModified?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;    // minutes
  toc: { id: string; text: string; level: 2 | 3 }[];
  translations: Partial<Record<Language, string>>;  // lang -> slug
  language: Language;
};

type BlogPostMeta = Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'date' | 'category' | 'tags' | 'featuredImage' | 'readingTime' | 'language'>;

type PageData = {
  slug: string;
  title: string;
  description: string;
  content: string;        // rendered HTML
  rawContent: string;
  lastModified?: string;
  translations: Partial<Record<Language, string>>;
  language: Language;
  type: 'page';
};

type I18nString = Record<Language, string>;
type I18nUrl = Record<Language, string>;

type NavItem = {
  label: I18nString;
  url: I18nUrl;
  children?: NavItem[];
};

type SiteConfig = {
  site: { name: string; url: string; tagline: string; description: string; languages: Language[]; defaultLanguage: Language };
  business: {
    legalName: string; director: string; oib: string; mbs: string; courtRegistration: string;
    address: { street: string; city: string; postalCode: string; country: string };
    banking: { bank: string; iban: string; swift: string };
  };
  contact: { email: string; phone: string; whatsapp: string };
  social: Record<string, string>;
  analytics: { googleAnalytics4: string; googleAds: string[]; facebookPixel: string };
  branding: {
    colors: {
      brandRed: string; brandRedLight: string; brandRedDark: string;
      darkBase: string; darkRaised: string; darkSunken: string;
      lightBase: string; lightRaised: string; lightSunken: string;
      foreground: string; muted: string; faint: string;
      line: string; lineSubtle: string;
    };
    typography: {
      headlineFont: string; headlineWeights: number[];
      bodyFont: string; bodyWeights: number[];
      fallback: string;
    };
  };
  navigation: {
    header: NavItem[];          // 3 items: Portfolio, Pricing, Contact (top bar)
    menu: NavItem[];            // Full sidebar nav (Services w/ children, About, Blog, etc.)
    footer: { services: NavItem[]; company: NavItem[]; legal: NavItem[] };
  };
  forms: { contact: { fields: { name: string; type: string; required: boolean; label: I18nString }[]; submitLabel: I18nString } };
  seo: { sitemapUrl: string };
};

type ProductCatalog = {
  _note: string;
  category: I18nString;
  pricing: { original: number; sale: number; currency: string };
  shared: { weight: string; dimensions: string; brand: string; nfcModel: string; material: string; tags: string[] };
  features: Record<Language, string[]>;
  products: Product[];
};

type Product = {
  slug: string;
  name: string;
  image: string;
  color: I18nString;
  isCustom?: boolean;
};
```

## Content Loading Functions

```typescript
// Load a single page by slug and language
function loadPage(slug: string, lang: Language): Promise<PageData>;

// Load a single blog post by slug and language
function loadBlogPost(slug: string, lang: Language): Promise<BlogPost>;

// Load metadata for all curated blog posts in a language
function loadCuratedBlogMetas(lang: Language): Promise<BlogPostMeta[]>;

// Get all curated blog slugs for generateStaticParams
function getCuratedBlogSlugs(lang: Language): string[];

// Load site config
function loadSiteConfig(): SiteConfig;

// Load product catalog (includes pricing, shared specs, and all 21 products)
function loadProductCatalog(): ProductCatalog;
```

## Content Validation

All frontmatter is parsed by gray-matter and should be validated at build time. Missing required fields (title, date, category for blog posts) should cause a build warning, not a failure. Invalid categories or tags should log warnings.

## `site-config.json` Schema

Top-level structure of `content/site-config.json`. See the `SiteConfig` TypeScript interface above for the canonical type definition. Key structural notes:

- **`navigation.header`** — 3 items only (Portfolio, Pricing, Contact) for the top bar
- **`navigation.menu`** — Full sidebar/mobile nav (Services with 5 children, Portfolio, Pricing, About, Blog, Career, Analysis, Contact)
- **`navigation.footer`** — Three sections: `services` (5), `company` (6), `legal` (6)
- **`branding.colors`** — 14 semantic tokens (brandRed, darkBase/Raised/Sunken, lightBase/Raised/Sunken, foreground, muted, faint, line, lineSubtle)
- **`branding.typography`** — Dual-font system: `headlineFont` (Albert Sans) + `bodyFont` (Manrope), each with weight arrays

## Notes

- Not all pages have content in all 3 languages. German (`de.md`) is often shorter or truncated.
- Blog posts are primarily in Croatian. English and German translations exist but vary in completeness.
- 103 of 190 blog posts are kept; 87 dropped (see `tasks/blog-curation-manifest.md`). 13 case studies were removed in session 9 (down from 116 to 103). Dropped post directories remain in `content/blog/` but are excluded from the build.
- Blog posts serve at `/blog/[slug]/` (not at root). See `docs/sitemap.md`.
- ~~Asset filenames had inconsistent casing~~ -- normalized to lowercase kebab-case (see `tasks/filename-normalization-manifest.md`).
- The `partners` directory contains Hostinger and Cloudflare logos. Elementor was removed (no longer relevant to the brand).
