# Career Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/career/` (EN), `/hr/karijera/` (HR), `/de/karriere/` (DE)
**Purpose**: An invitation, not a corporate job board. Mentorship-focused.
**Data sources**: `content/pages/karijera/en.md`
**Structured data**: `WebPage` + `BreadcrumbList` + `JobPosting` (for junior dev role, with `title`, `description`, `datePosted`, `employmentType`, `hiringOrganization`, `jobLocation`)

## Section 11.1: Career Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Left-aligned cols 1-8. `min-height: 40vh`. Flex `items-end pb-12`. |
| **Headline** | "We're building. Want to help?" AS300, H1 size, `text-foreground`. |
| **Subtext** | "This isn't a corporate job board. There's no 'we're a family' speech. We're a small web development company in Zadar that builds custom websites and apps from scratch." MR400, Body Large, `text-muted`. `max-width: 600px`. `margin-top: 16px`. |

## Section 11.2: What It's Like

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Heading** | "What It's Like Here". AS300, H2 size. `margin-bottom: 24px`. |
| **Content** | Prose from content. Covers: team size, working hours (Mon-Fri 08-16), project variety, tech stack. MR400, Body Large, `text-foreground`. `max-width: 720px`. |

## Section 11.3: Junior Developer Position

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. |
| **Role badge** | "Open Position". `<Badge>` with `bg-brand-red/10 border-brand-red/30 text-brand-red`. `margin-bottom: 16px`. |
| **Title** | "Junior Developer". AS300, H2 size, `text-foreground`. `margin-bottom: 32px`. |
| **Three-column layout** | `display: grid`, `grid-template-columns: repeat(3, 1fr)` (lg+), `gap: 2rem`. Tablet: `repeat(2, 1fr)` (third wraps). Mobile: single column. |

**Column 1: "What you'll work with"**

| Element | Specification |
|---------|---------------|
| **Heading** | MR600, H4 size, `text-foreground`. `margin-bottom: 16px`. |
| **List** | Bulleted list with red square bullets. Items: React and Next.js, TypeScript, Tailwind CSS, Git and real deployment workflows, Client projects from day one. MR400, Body, `text-muted`. |

**Column 2: "What we expect"**

| Element | Specification |
|---------|---------------|
| **List items** | Curiosity, Basic HTML/CSS/JS understanding, Some projects you've built, Willingness to take feedback. |

**Column 3: "What you get"**

| Element | Specification |
|---------|---------------|
| **List items** | Hands-on mentorship, Real project work, Clear growth path, Paid position. |

## Section 11.4: Application Form

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Anchor** | `id="apply"` |
| **Heading** | "Show us what you've built." AS300, H2 size. `margin-bottom: 8px`. |
| **Subtext** | "Skip the cover letter. Your work says more than a PDF." MR400, Body, `text-muted`. `margin-bottom: 32px`. |
| **Form** | `max-width: 560px`. |

**Fields**:

| Field | Type | Required |
|-------|------|----------|
| Name | Text input | Yes |
| Email | Email input | Yes |
| Portfolio / GitHub URL | URL input | Optional |
| Short message | Textarea, 4 rows | Yes (min 10 chars) |
| Honeypot | Hidden | No |

**Submit**: "Send Application". Primary button. Same loading/success/error states as contact form. Success: "Application received! We'll review it and get back to you."

**Fallback**: "Or email us directly at info@version2.hr." MR400, Small, `text-muted`. `margin-top: 16px`.

## Section 11.5: Open Door

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Heading** | "No Opening That Fits?" AS300, H3 size. |
| **Content** | "We're always interested in good people. If you write code and build things, we want to hear from you." MR400, Body, `text-muted`. `max-width: 480px`. |
| **CTA** | "Send us a message" ghost button. Links to `mailto:info@version2.hr`. |

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Career | `content/pages/karijera/*.md` | POST `/api/career` | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Career | `WebPage`, `BreadcrumbList`, `JobPosting` |
