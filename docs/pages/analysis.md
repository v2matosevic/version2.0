# Analysis Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/analysis/` (EN), `/hr/analiza/` (HR), `/de/analyse/` (DE)
**Purpose**: Lead-generation tool. Free website audit offer. Simple form, clear value proposition.
**Data sources**: `content/pages/analiza/en.md`
**Structured data**: `WebPage` + `BreadcrumbList`

## Section 12.1: Analysis Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Left-aligned. `min-height: 40vh`. Flex `items-end pb-12`. |
| **Headline** | "How good is your website? We'll tell you. For free." AS300, H1 size. |
| **Subtext** | "No strings attached. No follow-up sales calls. Just an honest look at where your site stands." MR400, Body Large, `text-muted`. `margin-top: 16px`. |

## Section 12.2: What We Analyze

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Heading** | "What We Analyze". AS300, H2 size. `margin-bottom: 40px`. |
| **Layout** | Vertical stack of 5 analysis areas. `gap-0` (items have their own padding). |

**Analysis items**:

| # | Title | Description |
|---|-------|-------------|
| 01 | "Speed" | "How fast your pages load. Where the bottlenecks are. What's slowing things down and what to fix first." |
| 02 | "SEO Health" | "Whether search engines can find and understand your content. Technical issues that hurt your rankings." |
| 03 | "Mobile Responsiveness" | "How your site looks and works on phones and tablets. Not just 'does it shrink' but 'does it actually work.'" |
| 04 | "Security" | "SSL status, exposed vulnerabilities, outdated software. The things that put your visitors and your business at risk." |
| 05 | "User Experience" | "Navigation, readability, call-to-action placement. How real people interact with your site and where they get stuck." |

**Item structure**: Same layout as Differentiators (Section 1.6). Number on left (AS700, `text-brand-red`, `opacity: 0.08`), title + description on right.

## Section 12.3: What You Get

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. `max-width: 640px`. |
| **Content** | Prose from content. Key points: straight report, ranked by impact, actionable, no jargon, no sales pitch. |
| **Callout** | "Delivered to your inbox within 2-3 business days." `border-left: 3px solid var(--color-brand-red)`. `padding-left: 1.5rem`. MR400, Body Large, `text-foreground`. `font-style: italic`. |

## Section 12.4: Analysis Form

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Heading** | "Request Your Free Analysis". AS300, H2 size. |
| **Subtext** | "Just three fields. That's all we need." MR400, Body, `text-muted`. `margin-bottom: 32px`. |
| **Form** | `max-width: 560px`. |

**Fields**:

| Field | Type | Required |
|-------|------|----------|
| Name | Text input | Yes |
| Email | Email input | Yes |
| Website URL | URL input (validated URL format) | Yes |
| Optional message | Textarea, 3 rows | No |
| Honeypot | Hidden | No |

**Submit**: "Send for Analysis". Primary button. Same states as contact form. Success: "Analysis request received! We'll send your report within 2-3 business days."

**Submission**: POST to `[API_URL]/api/contact` with `type: "analysis"`.

**Footer note**: "Over 100 websites analyzed. Based on real experience, not an automated scan." MR400, Small, `text-faint`. `margin-top: 24px`.

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Analysis | `content/pages/analiza/*.md` | POST `/api/contact` (type: "analysis") | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Analysis | `WebPage`, `BreadcrumbList` |
