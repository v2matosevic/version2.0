# Pricing Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/pricing/` (EN), `/hr/cijene/` (HR), `/de/preise/` (DE)
**Purpose**: Interactive car-configurator pricing wizard. 4 quick steps + summary with expandable customizer.
**Data sources**: `content/pricing-config.json` (complete 66-option config)
**Structured data**: `WebPage` + `BreadcrumbList`
**Full behavioral spec**: `docs/interactive-pricing-tool.md`

## Section 8.1: Pricing Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Centered. `min-height: 25vh`. `display: flex`, `flex-direction: column`, `align-items: center`, `justify-content: center`. `padding-bottom: 2rem`. |
| **Headline** | "What does it cost?" AS300, H1 size, `text-foreground`. Centered. |
| **Subtext** | "Walk through a few questions. Get an estimate in 30 seconds." MR400, Body Large, `text-muted`. Centered. `max-width: 480px`. `margin-top: 12px`. |

## Section 8.1b: Base Includes Strip

| Property | Specification |
|----------|---------------|
| **Position** | Below hero subtext. `margin-top: 2rem`. |
| **Layout** | `display: flex`, `flex-wrap: wrap`, `justify-content: center`, `gap: 0.5rem 1rem`. |
| **Items** | Rendered from `pricing-config.json` → `baseIncludes` array. Each: MR400, Small, `text-muted`. Lucide `Check` 14px `text-brand-red` before text. |
| **Purpose** | Communicates value before the visitor enters the wizard. Answers "what do I get for the base price?" immediately. |
| **Mobile** | `flex-direction: column`, `align-items: center`. Each item on its own line. |

Items: "Responsive design", "Basic SEO", "Contact form", "GA4 setup", "SSL certificate", "1 language", "2 design revisions", "30-day support", "Cross-browser testing", "Performance optimization".

## Section 8.2: Step Indicator

| Property | Specification |
|----------|---------------|
| **Position** | Centered, below hero. `margin-bottom: 48px`. |
| **Layout** | `display: flex`, `align-items: center`, `justify-content: center`, `gap: 0`. |
| **Dots** | 5 dots (4 steps + 1 summary). Each: 10px circle. Gap between dots: 48px. Connected by thin line (`height: 1px`, `background: var(--color-line)`, `width: 48px`). |
| **Dot states** | Completed: `bg-brand-red`, `opacity: 0.5`. Current: `bg-brand-red`, `opacity: 1`, `box-shadow: 0 0 0 4px var(--color-brand-red)/20`. Upcoming: `bg-line`. |
| **Labels** | Below each dot (desktop only). MR400, Overline size, `text-faint`. Current: `text-muted`. Labels: "Type", "Scope", "Design", "Timeline", "Summary". |
| **Mobile** | Dots only, no labels. Dot size: 8px. Gap: 24px. |

**Component**: `<StepIndicator steps={5} current={currentStep} />`

## Section 8.3: Wizard Steps (1-4)

**Common properties for all 4 steps**:

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Container** | Standard |
| **Step headline** | From `pricing-config.json` step `headline` (e.g., "What are we building?"). AS300, H2 size, `text-foreground`. Centered. |
| **Step subtitle** | From config step `subtitle`. MR400, Body, `text-muted`. Centered. `max-width: 480px`. `margin-inline: auto`. `margin-top: 8px`. `margin-bottom: 40px`. |

**Option cards** (layout varies by step option count):

| Property | Specification |
|----------|---------------|
| **Grid** | `display: grid`, `gap: 1rem`. Steps 1, 3, 4 (3-4 options): `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`. Step 2 (4 options): same. Mobile: `grid-template-columns: 1fr` (stacked full-width). |

**Individual option card**:

| Element | Specification |
|---------|---------------|
| **Card** | `bg-raised`. `border: 1px solid var(--color-line)`. `rounded-xl`. `padding: 1.5rem`. `min-height: 140px`. `cursor: pointer`. `text-align: center` (steps 1,3,4) or `text-align: left` (step 2 with detail text). |
| **Icon** | Lucide icon (from config `icon` field), 32px, `text-muted`. Centered above title. `margin-bottom: 12px`. Selected: `text-brand-red`. |
| **Label** | AS700, H4 size, `text-foreground`. |
| **Description** | MR400, Small, `text-muted`. `margin-top: 6px`. |
| **Detail** | (Step 2 only) E.g., "1-3 pages". MR600, Small, `text-brand-red`. `margin-top: 4px`. |
| **Badge** | (Step 4 only) "Best Value", "Most Popular", "Fastest". `position: absolute`, `top: -8px`, `right: 12px`. `bg-brand-red text-white`. `rounded-md`, `px-2 py-0.5`. MR600, Overline size. |
| **Default state** | As described above. |
| **Hover state** | `border-color: var(--color-brand-red)/30`. `transform: translateY(-2px)`. 200ms. |
| **Selected state** | `border: 2px solid var(--color-brand-red)`. `background: var(--color-brand-red)/5`. Checkmark icon (Lucide `Check`, 16px, `text-brand-red`): `position: absolute`, `top: 12px`, `right: 12px`. |
| **"Something Else" card** | (Step 1, `redirectsToContact: true`) On click, navigates to `/contact/` instead of advancing to next step. |

**Step navigation**:

| Element | Specification |
|---------|---------------|
| **Back button** | Ghost button, left side of container, below cards. Text: "Back". Lucide `ArrowLeft` 16px before text. Hidden on step 1. |
| **Forward** | No explicit "Next" button. Selection auto-advances after 300ms visual feedback delay (selected state renders, then slides to next step). |

**Step transitions**: Motion `AnimatePresence`. Exit: slide left + fade out (`x: -40, opacity: 0`, 200ms). Enter: slide in from right + fade in (`x: 40, opacity: 0` -> `x: 0, opacity: 1`, 250ms, `ease-out`). Back navigation reverses direction.

## Section 8.4: Summary (Step 5)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Container** | Standard |
| **Layout** | Desktop (lg+): `display: grid`, `grid-template-columns: 380px 1fr`, `gap: 3rem`. Price display on left (sticky), customizer + CTAs on right. Mobile: single column, price display on top (not sticky). |

**Price display** (left column, sticky):

| Element | Specification |
|---------|---------------|
| **Wrapper** | `position: sticky`, `top: 88px` (header height 72px + 16px gap). `bg-raised`. `rounded-xl`. `padding: 1.5rem`. `border: 1px solid var(--color-line)`. |
| **Selections summary** | Small recap of chosen options. Each: MR400, Small, `text-muted`. E.g., "Business Website . 4-7 pages . Custom Design . Standard Timeline". |
| **Divider** | `border-bottom: 1px solid var(--color-line-subtle)`. `margin: 16px 0`. |
| **One-time label** | "Estimated Project Cost". MR600, Overline size, uppercase, `text-muted`. |
| **One-time amount** | AS300, H2 size, `text-foreground`. Format: "EUR 5,000 -- EUR 8,000". |
| **Monthly label** | "Monthly". MR600, Small, `text-muted`. `margin-top: 16px`. |
| **Monthly amount** | AS700, H4 size, `text-foreground`. Format: "EUR 120 -- EUR 250 /mo". |
| **Yearly label** | "Yearly". MR600, Small, `text-muted`. `margin-top: 8px`. |
| **Yearly amount** | MR400, Body, `text-foreground`. Format: "EUR 50 -- EUR 150 /yr". |
| **Price animation** | When selections change, numbers animate (count up/down to new value, 300ms, `power2.out`). CSS: `tabular-nums` for stable width. |
| **Estimated timeline** | Rendered from `pricing-config.json` → `estimatedTimelines[projectType][scope][timeline]`. E.g., "Estimated delivery: 4-6 weeks". MR400, Small, `text-muted`. Lucide `Clock` 14px before text. `margin-top: 12px`. Hidden when timeline is "flexible" (no reliable estimate). |
| **Disclaimer** | "A starting point, not a final quote. The real number comes after we talk." MR400, Small, `text-faint`. `margin-top: 16px`. |
| **Share link** | "Share this estimate" text link. Lucide `Link` 14px. MR400, Small, `text-faint`. On click: copies the shareable URL to clipboard and shows a brief "Copied!" toast. `margin-top: 8px`. |
| **Mobile** | Not sticky. Rendered as a card at top of summary, `padding: 1rem`. Same info in condensed single-column layout. Timeline and share link below the price amounts. |

**Customizer panel** (right column):

| Element | Specification |
|---------|---------------|
| **Toggle button** | "Customize your estimate". MR600, Body, `text-foreground`. Lucide `ChevronDown` 16px. `padding: 12px 0`. `border-bottom: 1px solid var(--color-line-subtle)`. Click expands/collapses. |
| **Collapsed** | Only toggle button visible. |
| **Expanded** | 10 category sections (from `pricing-config.json`), each as a collapsible `<Accordion>` item. All collapsed by default. |
| **Category header** | Title + option count. E.g., "SEO . 6 options". MR600, H4 size, `text-foreground`. Lucide `ChevronDown` 16px rotates on expand. `py-3`. `border-bottom: 1px solid var(--color-line-subtle)`. |
| **Inside category** | List of feature toggles. Each: `display: flex`, `justify-content: space-between`, `align-items: center`, `py-2`. Left: feature label (MR400, Body, `text-foreground`) + price range (MR400, Small, `text-muted`, e.g., "+EUR 200 - EUR 500"). Right: toggle switch. |
| **Toggle switch** | Track: `40px x 20px`, `rounded-full`. Off: `bg-line`. On: `bg-brand-red`. Thumb: `16px` white circle, `transition: transform 150ms`. |
| **Quantity selector** | For items with `hasQuantity`. `display: flex`, `align-items: center`, `gap: 8px`. Minus button: `bg-raised border-line rounded-md 28x28px`. Number: MR600, Body. Plus button: same styling. Min 0, max varies. |
| **Maintenance picker** | Mutually exclusive tiers (None, Basic, Standard, Premium). Radio buttons styled as small cards. Selected: `border-brand-red bg-brand-red/5`. |
| **E-commerce section** | Only visible when `projectType === "webshop"`. Hidden for website/webapp. |
| **Smart behaviors** | Stripe free when webshop selected. Social login requires auth selected. Changes update price display instantly. |

**CTA buttons** (below customizer, or below price display on mobile):

| Element | Specification |
|---------|---------------|
| **Primary** | "Get Exact Quote". `<Button variant="primary" size="lg">`. Links to `/contact/?from=pricing&ref={estimateId}` with all selections stored in `sessionStorage` under key `v2_pricing_selections`. The contact form reads this on mount, pre-fills the message with a summary, and shows a "Based on your estimate" banner. SessionStorage is the transport — URL params would be too long for 66 options. The `ref` param is only set after submission (the estimate ID from the API response). |
| **Secondary** | "Schedule a Call". `<Button variant="secondary" size="lg">`. Links to `/contact/#book-a-call`. |
| **Layout** | `display: flex`, `gap: 1rem`. Desktop: horizontal. Mobile: stacked, full-width. `margin-top: 2rem`. |

**Component**: `<PricingWizard />`
**File location**: `src/components/pricing/pricing-wizard.tsx` (main wrapper + state management)

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Pricing | `content/pricing-config.json` | POST `/api/pricing` (submit quote) | -- |

## Shareable URL Encoding

Selections are encoded into a compact URL for sharing estimates. This is separate from the sessionStorage transport used for the contact form handoff.

**Format:** `/pricing/?c={encoded}`

The `c` param is a base64url-encoded JSON string of the 4 wizard selections only (not the full 66-option customizer state):

```
{ "t": "website", "s": "business", "d": "custom", "tl": "standard" }
```

Short keys keep the URL under ~100 chars. On page load, if `c` param exists, the wizard auto-advances to the summary step with those selections pre-applied. The customizer panel starts collapsed as normal.

**Why only wizard steps:** The 4 core selections produce the base estimate — that's what a decision-maker needs to see. Customizer add-ons are exploratory and don't need to be shared.

**Clipboard copy:** The "Share this estimate" link generates this URL and copies it. A brief toast confirms "Link copied."

## Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| **Project type changes on back-navigation** | When visitor goes back to Step 1 and changes project type (e.g., webshop → website), all type-specific selections are cleared: e-commerce features are deselected, Stripe free-when status recalculates, scope resets (webshop scopes don't exist for websites). The wizard returns to Step 2 with scope options for the new type. |
| **Feature total exceeds base by 5x+** | No cap. The tool is transparent — if someone adds €45,000 of features to a €2,500 landing page, show the real number. This is self-qualifying: serious buyers configure realistically, and tire-kickers won't submit. |
| **Dependency removed** | When `auth` is deselected, `social_login` is automatically deselected too (it requires auth). Show a brief inline notice: "Social Login removed (requires User Authentication)." |
| **Calculated price below minimum floor** | If the one-time minimum (after all multipliers) falls below €2,500, clamp to €2,500. Show a footnote: "Minimum project cost: €2,500." |
| **Invalid shareable URL params** | If the `c` param fails to decode or contains invalid option IDs, ignore it silently and show the wizard at Step 1. No error message — the visitor just starts fresh. |
| **Browser back button from summary** | SessionStorage persists all selections. The wizard restores state. The visitor can back-navigate through steps without losing customizer selections. |
| **Price display overflow** | Prices are rounded per the config rules (nearest €100 for one-time, nearest €10 for recurring). Format with `Intl.NumberFormat` and `tabular-nums` CSS. At maximum theoretical price (~€90,000+), the H2-sized display still fits within the 380px sticky column. |
| **Mobile summary scroll** | On mobile, the price card is at the top (not sticky). When the visitor expands customizer sections and scrolls deep, a compact floating price bar appears at the bottom of the viewport: one-time range only, `bg-raised`, `padding: 0.5rem 1rem`, `border-top: 1px solid var(--color-line)`, `z-index: var(--z-fab) - 1`. Appears on scroll when the main price card is out of viewport. |
| **Reduced motion** | Step transitions are instant (no slide animation). Price counter updates instantly (no counting animation). Accordion expand/collapse is instant. Toggle switches snap without transition. |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Pricing | `WebPage`, `BreadcrumbList` |
