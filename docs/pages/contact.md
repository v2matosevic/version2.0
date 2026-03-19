# Contact Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/contact/` (EN), `/hr/kontakt/` (HR), `/de/kontakt/` (DE)
**Purpose**: "Choose your path" -- two clear entry points. Send a message or book a call. Both paths converge on a response.
**Data sources**: `content/pages/kontakt/en.md` | `content/site-config.json` | backend API for booking availability
**Structured data**: `ContactPage` + `BreadcrumbList` + `LocalBusiness` (embedded with full contact details)

## Section 9.1: Contact Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Left-aligned. `min-height: 40vh`. `display: flex`, `align-items: flex-end`, `padding-bottom: 3rem`. |
| **Headline** | "Got a project? Got a question? Got an idea?" AS300, H1 size, `text-foreground`. |
| **Subtext** | "We respond within 24 hours. Usually faster." MR400, Body Large, `text-muted`. `margin-top: 12px`. |

## Section 9.2: Choose Your Path

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Layout** | `display: grid`, `grid-template-columns: 1fr 1fr` (md+), `gap: 1.5rem`. Single column mobile. |

**Card A: Send a Message**

| Element | Specification |
|---------|---------------|
| **Card** | `bg-raised`. `border: 1px solid var(--color-line)`. `rounded-xl`. `padding: 2rem md:2.5rem`. `min-height: 200px`. `cursor: pointer`. |
| **Icon** | Lucide `Mail`, 40px, `text-brand-red`. `margin-bottom: 20px`. |
| **Title** | "Send a Message". AS300, H3 size, `text-foreground`. |
| **Description** | "Skip the sales pitch. Just tell us what you need." MR400, Body, `text-muted`. `margin-top: 8px`. |
| **Hover** | `border-color: var(--color-brand-red)/30`. `transform: translateY(-4px)`. 200ms. |
| **Click** | Smooth scroll to `#contact-form` section below (Lenis `scrollTo`). |

**Card B: Book a Call**

| Element | Specification |
|---------|---------------|
| **Card** | Same styling as Card A. |
| **Icon** | Lucide `Calendar`, 40px, `text-brand-red`. |
| **Title** | "Book a Call". |
| **Description** | "Pick a time. We'll call you. No prep needed." |
| **Click** | Smooth scroll to `#book-a-call` section below. |

**Animation**: Both cards `ST-reveal` with `stagger(100ms)`.

## Section 9.3: Contact Form

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Anchor** | `id="contact-form"` |
| **Layout** | Desktop: `display: grid`, `grid-template-columns: 1fr auto`, `gap: 4rem`. Form on left (cols 1-7), contact info sidebar on right (cols 9-12). Mobile: single column, form first, info below. |

**Form (left column, max-width 560px)**:

| Element | Specification |
|---------|---------------|
| **Heading** | "Send Us a Message". AS300, H2 size, `text-foreground`. `margin-bottom: 32px`. |
| **Library** | React Hook Form + `@hookform/resolvers/zod`. |
| **Fields** | Vertical stack, `gap: 1.5rem`. |

| Field | Type | Required | Specification |
|-------|------|----------|---------------|
| **Name** | Text input | Yes | Label: "Name" (MR600, Small, `text-foreground`, `margin-bottom: 6px`). Input: `bg-sunken`, `border: 1px solid var(--color-line)`, `rounded-lg`, `px-4 py-3`, MR400 Body. Focus: `border-brand-red ring-1 ring-brand-red/20`. Error: `border-red-500` + error text below (MR400, Small, `text-red-500`, `margin-top: 4px`). Min 2, max 100 chars. |
| **Email** | Email input | Yes | Same styling. Valid email format. Max 254 chars. |
| **Message** | Textarea | Yes | Same styling. 5 rows default. `resize: vertical`. Min 10, max 5000 chars. |
| **Honeypot** | Hidden input | No | Field name: `_honey`. CSS: `position: absolute; left: -9999px; opacity: 0; height: 0; pointer-events: none;`. Rendered in DOM but invisible. |

| Element | Specification |
|---------|---------------|
| **Submit button** | "Send". `<Button variant="primary" size="md">`. Full-width on mobile, auto-width on desktop. |
| **Loading state** | Button: spinner icon + "Sending..." text. Width preserved (`min-width` captured on mount). All fields disabled. |
| **Success state** | Fields clear. Green banner above form: "Message sent! We'll get back to you within 24 hours." (MR400, Body, `text-green-400`, `bg-green-900/20`, `border: 1px solid green-800/30`, `rounded-lg`, `p-4`). |
| **Error state** | Red banner above form with error message. Fields re-enabled. Input values preserved. |
| **Validation** | Inline on blur (shows error immediately after leaving field). Re-validates on submit. `aria-describedby` linking error to field. `aria-live="polite"` region for screen readers. |
| **Submission** | POST to `/api/contact`. JSON body with name, email, message, _honey, language. |

**Contact info sidebar (right column)**:

| Element | Specification |
|---------|---------------|
| **Layout** | `display: flex`, `flex-direction: column`, `gap: 1.5rem`. `padding-top: 80px` (desktop, to align with form fields area). |

Each info item: `display: flex`, `gap: 12px`, `align-items: flex-start`.

| Item | Icon | Text | Action |
|------|------|------|--------|
| Email | Lucide `Mail` 20px `text-brand-red` | "info@version2.hr" MR400 Body `text-foreground` | `<a href="mailto:info@version2.hr">` |
| Phone | Lucide `Phone` 20px `text-brand-red` | "+385 99 561 7706" MR400 Body `text-foreground` | `<a href="tel:+385995617706">` |
| WhatsApp | Lucide `MessageCircle` 20px `text-brand-red` | "Send a WhatsApp" MR400 Body `text-foreground` | `<a href="https://wa.me/385995617706" target="_blank">` |
| Address | Lucide `MapPin` 20px `text-brand-red` | "Novigradska 21, 23000 Zadar, Croatia" MR400 Body `text-muted` | Plain text (no link) |
| Hours | Lucide `Clock` 20px `text-brand-red` | "Mon-Fri, 08:00-16:00 CET" MR400 Body `text-muted` | Plain text |

## Section 9.4: Booking System

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Anchor** | `id="book-a-call"` |
| **Heading** | "Book a Call". AS300, H2 size, `text-foreground`. `margin-bottom: 8px`. |
| **Subtext** | "Pick a time that works. Wednesday through Friday, 14:00-17:00 CET." MR400, Body, `text-muted`. `margin-bottom: 32px`. |

**Date/time picker**:

| Element | Specification |
|---------|---------------|
| **Calendar view** | Custom date grid showing next 14 days. `display: grid`, `grid-template-columns: repeat(7, 1fr)`, `gap: 4px`. Day headers: MR600, Overline size, `text-faint`. Day cells: 44x44px, `rounded-lg`, centered number. |
| **Available days** | Wed, Thu, Fri only. `bg-raised`, `border: 1px solid var(--color-line)`, `text-foreground`, `cursor: pointer`. Hover: `border-brand-red/30`. |
| **Selected day** | `bg-brand-red`, `text-white`. |
| **Unavailable days** | Mon, Tue, Sat, Sun + past days + days > 14 ahead. `opacity: 0.3`, `cursor: not-allowed`, `text-faint`. |
| **Time slots** | Displayed below calendar after day selection. `display: flex`, `flex-wrap: wrap`, `gap: 8px`. |
| **Slot button** | `px-4 py-2`, `rounded-lg`. Available: `bg-raised border-line text-foreground`. Selected: `bg-brand-red text-white`. Unavailable: `opacity: 0.3 cursor-not-allowed`. |
| **Slots** | 30-min slots with 15-min buffer: 14:00, 14:45, 15:30, 16:15. |
| **Loading** | Skeleton grid (shimmer animation) while fetching availability from `GET [API_URL]/api/availability?date=YYYY-MM-DD`. |
| **No slots** | "No available times in the next 2 weeks. Contact us directly." + email/WhatsApp links. |

**Booking form** (below calendar/slots):

| Field | Type | Required |
|-------|------|----------|
| **Contact method** | Radio group: "Email", "WhatsApp", "Phone Call". Each: `<label>` with radio input + text. Active: `text-brand-red`. |
| **Name** | Text input | Yes |
| **Email** | Email input | Yes |
| **Project description** | Textarea, 3 rows | Optional |
| **Submit** | "Book This Slot". `<Button variant="primary" size="md">`. Disabled until date + time + name + email selected. |

**Success state**: "Booking confirmed! Check your email for details." Green banner. Below: "Add to calendar" link (downloads .ics file). Booking details summary (date, time, method).

**Submission**: POST to `[API_URL]/api/bookings`.

## Section 9.5: Map

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken` |
| **Section padding** | `py-0` (flush, the map IS the visual) |
| **Height** | 300px (md: 350px, lg: 400px) |
| **Implementation** | Static dark-themed map image as default (Google Static Maps API with `style` parameter for dark theme, or a pre-generated dark map screenshot). Overlay: "View on Google Maps" button, centered, `<Button variant="secondary" size="sm">`. Links to `https://maps.google.com/?q=Novigradska+21+23000+Zadar+Croatia` in new tab. `rounded-xl` corners. Progressive: lazy-load interactive Google Maps embed on click/interaction. |
| **No grain overlay** | Clean. |

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Contact | `content/pages/kontakt/*.md`, `content/site-config.json` | POST `/api/contact`, GET `/api/availability` | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Contact | `ContactPage`, `BreadcrumbList`, `LocalBusiness` |
