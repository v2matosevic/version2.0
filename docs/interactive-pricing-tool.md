# Interactive Pricing Tool

## Purpose

Replace the old fixed package system (Simple, Professional, E-Commerce, Premium) with an interactive multi-step configurator. Visitors walk through a short pipeline, choose what they need, and receive an estimated price range.

Goals:
- Qualify leads before they contact us
- Set price expectations early
- Reduce "how much does a website cost?" emails
- Make the process feel transparent and modern
- Casual visitors get a number in 30 seconds; detailed buyers can customize further

## UX Philosophy

**Simple first, detailed on demand.** The main wizard is 4 quick steps that anyone can answer. The summary page then offers an expandable "Customize your estimate" section with all 66 options organized into categories. Casual visitors hit "Get Quote" immediately. Detailed buyers toggle add-ons and watch the price update live. Both paths end at the same CTA.

This avoids the trap of a 7-step wizard that overwhelms visitors before they get a number.

## User Flow

```
Step 1: Project Type
  → What are we building?
    - Website / Webshop / Web Application / Something else (→ contact form)

Step 2: Scope
  → How big are we thinking?
    - Options vary by project type
    - Websites: Landing (1-3 pages) / Business (4-7) / Corporate (8-15) / Enterprise (15+)
    - Webshops: Starter (≤50 products) / Growing (50-500) / Enterprise (500+)
    - Web Apps: Simple (1-3 roles) / Complex (multiple roles) / Enterprise (advanced)

Step 3: Design
  → How should it look?
    - Reference-based (1.0x) / Custom from scratch (1.15x) / Brand identity + custom (1.25x)

Step 4: Timeline
  → When do you need it?
    - Flexible (0.95x, "Best Value") / Standard (1.0x, "Most Popular") / Priority (1.35x, "Fastest")

Step 5: Summary & Estimate
  → Core estimate displayed prominently (one-time range)
  → "Customize your estimate" expandable panel below:
      Organized into toggle sections (all collapsed by default):
      - Core Features (14 options)
      - E-Commerce (13 options, only if webshop)
      - Integrations (13 options)
      - Design Add-ons (4 options)
      - SEO (6 options)
      - Content (6 options)
      - Analytics (5 options)
      - Hosting & Infrastructure (8 options)
      - Support & Maintenance (4 tiers, mutually exclusive)
      - Training & Handoff (4 options)
  → Price updates live as toggles change
  → Three cost lines:
      1. One-Time Project Cost (€X,XXX — €XX,XXX)
      2. Monthly Costs (€XX — €XXX /mo) — hosting, maintenance, recurring
      3. Yearly Costs (€XX — €XXX /yr) — domain, SSL, backups
  → "A starting point, not a final quote. The real number comes after we talk."
  → CTA: "Get Exact Quote" → contact form pre-filled with all selections
  → Alt CTA: "Schedule a Call" → calendar booking (Wed-Fri 14:00-17:00 CET)
```

## Price Calculation

The price updates in real-time as options are selected or deselected. Instant visual feedback on every change.

The calculation logic lives in both places:
- **Frontend:** Runs the formula client-side for instant price updates. No network delay.
- **Backend:** Validates and recalculates on submission. Prevents price manipulation. Stores the final validated estimate with the lead.

```
ONE-TIME:
(base + features + integrations + design_addons) * design_multiplier * timeline_multiplier
+ services (flat, not multiplied by design/timeline)
= Estimated range (€X,XXX — €XX,XXX)

MONTHLY:
sum(hosting + maintenance + recurring_services)
= Monthly range (€XX — €XXX /mo)

YEARLY:
sum(domain + SSL + backups)
= Yearly range (€XX — €XXX /yr)
```

Pricing data stored in `content/pricing-config.json`. The backend holds an identical copy for validation. Easy to update without code changes.

Always show a range, never a fixed number. Minimum floor: €2,500 for one-time costs.

## What's in the Config (66 options total)

All defined in `content/pricing-config.json`. Organized by section:

| Section | Count | Examples |
|---------|-------|---------|
| Core Features | 14 | Multi-language, blog, auth, social login, booking, admin, search, notifications, file mgmt, comments, dark mode, animations, AI, accessibility |
| E-Commerce | 13 | Variants, inventory, shipping, multi-currency, subscriptions, wishlist, reviews, discounts, abandoned cart, order tracking, invoicing, comparison, quick view |
| Integrations | 13 | Stripe, PayPal, local payments, crypto, CRM, email marketing, automation, live chat, ERP, maps, calendar, social feeds, custom APIs |
| Design Add-ons | 4 | Illustrations, icon set, motion design, interactive prototype |
| SEO | 6 | Technical audit, on-page, local, content strategy, schema, monthly reporting |
| Content | 6 | Copywriting, SEO copy, translation, product descriptions, photography, video |
| Analytics | 5 | Advanced setup, heatmaps, conversion tracking, custom dashboard, A/B testing |
| Hosting | 8 | Domain, shared/VPS, email, CDN, staging, backups, premium SSL |
| Maintenance | 4 | None, basic (€120-250/mo), standard (€250-500/mo), premium (€500-1000/mo) |
| Training | 4 | CMS session, docs, videos, support hours |

### Smart Behaviors

- E-commerce section only visible for webshop projects
- Stripe is free when webshop is selected
- Social login requires auth to be selected first
- Maintenance plans are mutually exclusive
- Services are flat-priced (not affected by design/timeline multipliers)
- Items with `hasQuantity` show a +/- counter (e.g., languages, integrations, pages)
- Monthly and yearly costs shown separately from one-time estimate

## Technical Implementation

### Architecture

The configurator UI is fully client-side for instant responsiveness. The backend (Next.js API routes) handles submission and validation:
- React state management for step progression and add-on toggles
- Local JSON file for pricing configuration (instant client-side calculation)
- Form submission at the end goes to the custom backend API (see `features/form-specs.md`)
- Backend validates the price calculation, stores the lead, and notifies the team

### Component Structure

```
PricingWizard/
├── PricingWizard.tsx          # Main wrapper, state management
├── StepIndicator.tsx          # Progress dots (4 steps + summary)
├── steps/
│   ├── ProjectTypeStep.tsx    # Step 1: big option cards
│   ├── ScopeStep.tsx          # Step 2: tier cards (vary by project type)
│   ├── DesignStep.tsx         # Step 3: tier cards
│   ├── TimelineStep.tsx       # Step 4: tier cards with badges
│   └── SummaryStep.tsx        # Step 5: estimate + expandable add-ons
├── addons/
│   ├── AddOnPanel.tsx         # Expandable "Customize your estimate" wrapper
│   ├── AddOnSection.tsx       # Collapsible category (Core Features, SEO, etc.)
│   ├── AddOnToggle.tsx        # Individual feature toggle with price
│   ├── QuantitySelector.tsx   # +/- counter for per-unit items
│   └── MaintenancePicker.tsx  # Mutually exclusive tier selector
├── OptionCard.tsx             # Selectable option card component
├── PriceDisplay.tsx           # Live-updating price (one-time + monthly + yearly)
├── calculate-estimate.ts      # Pure function: selections → { oneTime, monthly, yearly }
└── pricing-config.json        # Symlink or import from content/pricing-config.json
```

### State

All selections stored in a single state object:
- `projectType`, `scope`, `design`, `timeline` — from the 4 wizard steps
- `features`, `integrations`, `ecommerce`, `designAddons` — toggled in summary add-ons
- `services` — SEO, content, analytics, hosting, maintenance, training selections

Persisted to `sessionStorage` under key `v2_pricing_state`. On every selection change, the full state object is written. On page load, if the key exists, the wizard restores to the last active step with all selections intact. This covers browser back button, accidental refresh, and the pricing → contact → back-to-pricing flow. The state is cleared when the visitor submits the estimate (successful POST /api/pricing response).

A separate `v2_pricing_selections` key stores a clean copy of the final selections (without UI state like current step) for the contact form handoff.

### Animation

- Smooth step transitions (slide or crossfade, <300ms)
- Progress indicator updates
- Add-on sections expand/collapse with smooth height animation
- Price counter animates when the number changes (counting up/down effect)
- Nothing heavy. The tool should feel fast and responsive.

## Design Notes

- Each wizard step should feel like one focused question, not a form
- Large, clickable option cards — not radio buttons
- Visual indicators for selected options (border highlight, checkmark, subtle glow)
- Back button on every step
- Mobile-friendly: steps stack vertically, option cards are full-width
- The summary should feel like a receipt or invoice preview
- Add-on panel uses a clean toggle grid — scannable, not overwhelming
- Category sections are collapsed by default with item counts ("SEO · 6 options")
- Price breakdown at the top of summary is always visible (sticky on scroll)

## Content

All copy (headlines, descriptions, disclaimers) lives in `content/pricing-config.json`. No hardcoded text in components. This allows the owner to update wording without code changes.

## i18n Strategy

The pricing tool has two categories of translatable text:

### 1. Structural UI (in `ui-strings.ts`)

Short, reusable interface labels that follow the site-wide translation system:

- Step indicator labels: "Type", "Scope", "Design", "Timeline", "Summary"
- Navigation: "Back", step counter ("Step 2 of 4")
- Price labels: "Estimated Project Cost", "Monthly", "Yearly", "/mo", "/yr"
- Actions: "Get Exact Quote", "Schedule a Call", "Customize your estimate", "Share this estimate", "Copied!"
- Notices: disclaimer text, minimum floor notice, dependency removal notice

These are ~12 keys already inventoried in `i18n.md` under the `pricing.*` namespace. They're translated upfront with all other UI strings in Layer 2.

### 2. Content Copy (in `pricing-config.json`)

Option labels, descriptions, headlines, and subtitles. There are ~150 translatable strings in the config (66 option labels + 66 descriptions + ~20 headlines/subtitles/notes).

**Approach:** The config JSON stays English-only (it's the pricing engine, not a content file). Translations for config strings live in `ui-strings.ts` under the `pricing.config.*` namespace, keyed by option ID:

```typescript
// Example structure in ui-strings.ts
pricing: {
  config: {
    step_projectType_headline: {
      en: "What are we building?",
      hr: "Sto gradimo?",
      de: "Was bauen wir?"
    },
    option_website_label: {
      en: "Website",
      hr: "Web stranica",
      de: "Webseite"
    },
    option_website_description: {
      en: "A website that works as hard as you do.",
      hr: "Web stranica koja radi jednako kao i ti.",
      de: "Eine Website, die so hart arbeitet wie du."
    }
    // ... ~150 keys total
  }
}
```

The component reads the option ID from the JSON config and looks up the translated label/description from ui-strings. If a translation is missing, it falls back to the English string in the JSON config itself.

**Why not translate the JSON directly?** The config is also used by the backend for price validation. Keeping it language-neutral (English + numbers) avoids syncing translations between frontend and backend. The frontend handles display; the config handles logic.

### Number Formatting

Prices are formatted with `Intl.NumberFormat` using the locale from the current language:

| Language | Example (€5,200) | Locale |
|----------|-------------------|--------|
| EN | EUR 5,200 | `en-US` |
| HR | 5.200 EUR | `hr-HR` |
| DE | 5.200 EUR | `de-DE` |

See `i18n.md` for the full currency formatting spec.
