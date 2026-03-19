# Legal Pages Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

## Shared Template

**Routes**: 6 legal pages, each with EN/HR/DE variants:
- Legal Notice: `/legal-notice/` | `/hr/pravna-obavijest/` | `/de/impressum/`
- Terms & Conditions: `/terms-and-conditions/` | `/hr/uvjeti-koristenja/` | `/de/nutzungsbedingungen/`
- Privacy Policy: `/privacy-policy/` | `/hr/politika-privatnosti/` | `/de/datenschutz/`
- Cookie Policy: `/cookies/` | `/hr/kolacici/` | `/de/cookies/`
- Refund Policy: `/refund-policy/` | `/hr/politika-povrata/` | `/de/widerrufsrecht/`
- Accessibility: `/accessibility/` | `/hr/izjava-o-pristupacnosti/` | `/de/barrierefreiheit/`

**Purpose**: EU/Croatian law compliance. Readable, accessible, no-frills.
**Data sources**: `content/pages/[dir]/en.md` per legal page | `content/site-config.json` for business data
**Structured data**: `WebPage` + `BreadcrumbList`

### Shared Legal Template

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base`. No grain overlay (legal pages are clean, no atmospheric effects). |
| **Section padding** | `py-12 md:py-16` (lighter than content pages). |
| **Container** | `max-w-3xl mx-auto` (768px prose column). |
| **Breadcrumbs** | `Home > [Page Name]`. Standard styling. |
| **Page title** | From frontmatter `title`. AS300, H1 size, `text-foreground`. `margin-bottom: 8px`. |
| **Last updated** | From `lastModified` frontmatter (or build date). "Last updated: [Date]". MR400, Small, `text-muted`. `margin-bottom: 48px`. |
| **No animation** | No `ST-reveal`, no scroll-triggered effects. All content renders immediately. Legal content must be instantly accessible with no animation delays. |

**Body content (rendered markdown)**:

| Element | Specification |
|---------|---------------|
| **H2** | AS300, H2 size. `margin-top: 3rem`. `margin-bottom: 1rem`. `text-foreground`. |
| **H3** | AS700, H3 size. `margin-top: 2rem`. `margin-bottom: 0.75rem`. `text-foreground`. |
| **H4** | AS700, H4 size. `margin-top: 1.5rem`. `margin-bottom: 0.5rem`. |
| **Paragraphs** | MR400, Body (1rem), line-height 1.6, `text-foreground`. `margin-bottom: 1rem`. |
| **Lists** | Standard unordered/ordered list styling. `padding-left: 1.5rem`. Standard disc/decimal markers (no custom red bullets on legal pages -- keep it conventional and scannable). |
| **Links** | `text-brand-red`, hover `text-brand-red-hover`, underline always (legal links must be clearly identifiable). |
| **Bold** | MR600. Used for emphasis on key legal terms. |
| **Tables** | For cookie inventory (Cookie Policy), data processing activities (Privacy Policy). `width: 100%`. `border-collapse: collapse`. Header: `bg-raised`. MR600, Small. Cells: `padding: 0.75rem`. `border: 1px solid var(--color-line)`. MR400, Small. `text-align: left`. Mobile: `overflow-x: auto` wrapper with horizontal scroll. |

## Page-Specific Details

### Legal Notice (`/legal-notice/`)

- Company data from `site-config.json`: legal name (Version2 j.d.o.o.), director (Marko Matosevic), OIB (91496405628), MBS (110121143), court (Trgovacki sud u Zadru), address, bank details.
- Required by Croatian Companies Act Art. 21.

### Terms & Conditions (`/terms-and-conditions/`)

- Sections: Definitions, Scope, Services, Pricing & Payment, Intellectual Property, Warranties, Liability Limitation, Termination, Governing Law (Croatian), Dispute Resolution.
- Digital content exemption from withdrawal (consumer acknowledges).

### Privacy Policy (`/privacy-policy/`)

- GDPR Article 13 structure: Data Controller, Legal Basis, Data Categories, Processing Purposes, Recipients, Retention Periods, Data Subject Rights, DPO Contact (if applicable), Supervisory Authority (AZOP).
- Data processing activities table.
- Cookie reference (links to Cookie Policy page).

### Cookie Policy (`/cookies/`)

- Cookie inventory table with columns: Cookie Name, Provider, Purpose, Duration, Type (Necessary/Analytics).
- "Change your cookie preferences" link that triggers `CookieConsent` banner re-display.
- Current cookie list: `v2_theme` (necessary, localStorage, persistent), `v2_cookie_consent` (necessary, localStorage, persistent), `v2_preloader_shown` (necessary, sessionStorage, session), `_ga`/`_ga_*` (analytics, cookie, 2 years, consent-gated), `_fbp` (analytics, cookie, 3 months, consent-gated).

### Refund Policy (`/refund-policy/`)

- 14-day withdrawal period for digital services (EU Consumer Rights Directive).
- Standard withdrawal form (text block within the page, can be copy-pasted or printed).
- Exceptions for fully performed digital content with prior consent.
- Refund timeline and method.

### Accessibility Statement (`/accessibility/`)

- WCAG 2.2 AA conformance level.
- Technologies relied upon: HTML, CSS, JavaScript, WAI-ARIA.
- Assessment methodology.
- Known limitations (list any areas not fully conformant).
- Contact for accessibility issues: info@version2.hr.
- Date of statement.

**Component**: `<LegalPageTemplate title={...} lastUpdated={...} content={...} />`
**File location**: `src/components/pages/legal-template.tsx`

---

### Critical Files for Implementation

- **`docs/design/`** -- All design tokens (colors, typography clamp values, spacing, animation durations/easings, shadows, z-index layers, grid system, noise texture spec). Every visual specification in these blueprints references tokens defined here.
- **`docs/components/`** -- Full ARIA specifications, keyboard interaction patterns, state behaviors, and loading/empty states for every component. The blueprints reference behavioral specs from these files without duplicating them.
- **`docs/interactive-pricing-tool.md`** -- Complete pricing wizard specification including calculation formula, 66-option config structure, smart behaviors (conditional visibility, dependencies), component architecture, and state management approach.
- **`content/site-config.json`** -- Navigation structure, contact info, social links, business details, analytics IDs, and form field definitions that feed the header, footer, contact page, legal pages, and all global components.
- **`docs/brand-voice.md`** -- Copy tone rules, banned words, formatting conventions, and example patterns that govern every heading, subtext, button label, and placeholder string specified in these blueprints.

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Legal (x6) | `content/pages/[legal-dir]/*.md`, `content/site-config.json` | None | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Legal Pages | `WebPage`, `BreadcrumbList` |
