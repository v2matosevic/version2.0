# Typography

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). This file defines the dual-font system, type scale, and all typographic tokens.

## Dual-Font System

Nunito is retired.

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headlines | **Albert Sans** | Light (300) default, Bold (700) for accents | H1-H4, hero statements, section titles |
| Body | **Manrope** | Regular (400), Semibold (600) | Paragraphs, UI text, navigation |

**Why this pair:**
- Albert Sans: Scandinavian-heritage geometric sans. At Thin/Light weights on dark charcoal, the strokes create a premium editorial feel. Open apertures, balanced proportions. Designed by Andreas Rasmussen.
- Manrope: Screen-optimized geometric sans. High x-height for clarity at 16-18px. Semi-condensed proportions. Pairs naturally with Albert Sans's geometric DNA without being redundant.
- Both are variable fonts (weight axis 100-900). Light text on dark backgrounds renders optically heavier due to anti-aliasing — compensated via CSS custom properties (see Font Weight Adjustment below).
- Both support Latin Extended (all Croatian diacritics: c, c, z, s, d).

Self-hosted via `next/font`. `display: swap` for performance. Subset to Latin + Latin Extended.

Wordmark font to be updated to match Albert Sans.

## Font Weight Adjustment (Dark vs. Light)

Light text on dark backgrounds renders optically heavier due to subpixel anti-aliasing. Compensate with CSS custom properties on the weight axis:

```css
:root {
  --font-weight-headline: 300;
  --font-weight-headline-bold: 700;
  --font-weight-body: 400;
  --font-weight-body-semibold: 600;
}

html.light {
  --font-weight-headline: 325;
  --font-weight-headline-bold: 725;
  --font-weight-body: 425;
  --font-weight-body-semibold: 625;
}
```

Usage: `font-variation-settings: 'wght' var(--font-weight-headline)` on headline elements, or the Tailwind `font-[var(--font-weight-headline)]` utility.

## Typography Scale

Every text level uses `clamp()` for fluid sizing. No breakpoint jumps — continuous scaling between minimum and maximum.

| Level | clamp() Value | ~Mobile | ~Desktop | Font | Weight |
|-------|--------------|---------|----------|------|--------|
| Display | `clamp(3rem, 5vw + 1rem, 5.5rem)` | 48px | 88px | Albert Sans | 300 |
| H1 | `clamp(2.5rem, 4vw + 0.5rem, 4rem)` | 40px | 64px | Albert Sans | 300 |
| H2 | `clamp(2rem, 3vw + 0.5rem, 3rem)` | 32px | 48px | Albert Sans | 300 |
| H3 | `clamp(1.5rem, 1.5vw + 0.5rem, 2rem)` | 24px | 32px | Albert Sans | 300 |
| H4 | `clamp(1.25rem, 0.5vw + 1rem, 1.5rem)` | 20px | 24px | Albert Sans | 700 |
| Body Large | `1.25rem` (20px) | 20px | 20px | Manrope | 400 |
| Body | `1rem` (16px) min, `1.125rem` (18px) for blog prose | 16px | 16-18px | Manrope | 400 |
| Small | `0.875rem` (14px) | 14px | 14px | Manrope | 400 |
| Overline | `0.75rem` (12px) uppercase | 12px | 12px | Manrope | 600 |

**Usage notes:**
- Display is reserved for hero statements only. Never use on subpages.
- H1 is the page title level. One per page.
- Body Large is for lead paragraphs (the first paragraph of a section or article).
- Overline is always uppercase with `letter-spacing: 0.1em` — used for labels, categories, metadata tags.

## Line Heights

| Level | Line Height | Rationale |
|-------|------------|-----------|
| Display | 1.1 | Tight — large text needs minimal leading |
| H1 | 1.1 | Same — keeps hero headlines dense and impactful |
| H2 | 1.2 | Slightly more room for multi-line section headings |
| H3 | 1.2 | Consistent with H2 |
| H4 | 1.3 | Card titles may wrap — needs breathing room |
| Body | 1.6 | Standard readability |
| Blog prose | 1.75 | Generous — editorial reading experience |
| Small | 1.5 | Compact but readable |

## Letter Spacing

| Level | Value | Effect |
|-------|-------|--------|
| Display | -0.03em | Maximum compression — dense, cinematic |
| H1 | -0.025em | Tight — confident, editorial (matches Unseen's `-.025rem`) |
| H2 | -0.02em | Moderate compression |
| H3 / H4 | -0.01em | Subtle tightening |
| Body | 0 | Natural — no tracking adjustment |
| Overline | 0.1em | Wide — uppercase labels need space to breathe |

## Responsive Typography Behavior

Typography scales fluidly via `clamp()` — no breakpoint-based overrides needed for font size. Layout and composition shift at breakpoints:

| Breakpoint | Behavior |
|------------|----------|
| < 640px (mobile) | Display/H1 at clamp minimum (~48px/~40px). Headlines stack full-width. Body at 16px. Single-column layout. Hero text centered. Overline stacks above headline. |
| 640-767px (sm) | Minor layout shifts. Two-column grids begin for cards. Text alignment stays centered on hero, left-aligned on content sections. |
| 768-1023px (md) | Display/H1 scaling upward (~60px/~50px). Asymmetric grids activate (1fr 1.2fr). Section padding increases to `py-24`. Blog prose at 18px. Hero text left-aligned. |
| 1024-1279px (lg) | Near-maximum type scale. Full 12-column grid. Section padding `py-32`. All layout patterns active. |
| 1280px+ (xl/2xl) | Display/H1 at clamp maximum (~88px/~64px). Container capped at `max-w-7xl` (1280px). Content centers within viewport. No further scaling — prevents comically large text on ultrawide. |

**Blog prose special case:** Body text is `1rem` (16px) site-wide but `1.125rem` (18px) within `.prose` / blog article containers from `md:` breakpoint upward. Line height shifts from 1.6 to 1.75 for long-form readability.

## CSS Custom Properties for Typography

Defined in `src/styles/globals.css` within the `@theme` block or as standalone custom properties:

```css
:root {
  /* Type scale */
  --text-display: clamp(3rem, 5vw + 1rem, 5.5rem);
  --text-h1: clamp(2.5rem, 4vw + 0.5rem, 4rem);
  --text-h2: clamp(2rem, 3vw + 0.5rem, 3rem);
  --text-h3: clamp(1.5rem, 1.5vw + 0.5rem, 2rem);
  --text-h4: clamp(1.25rem, 0.5vw + 1rem, 1.5rem);
  --text-body-lg: 1.25rem;
  --text-body: 1rem;
  --text-body-prose: 1.125rem;
  --text-small: 0.875rem;
  --text-overline: 0.75rem;

  /* Leading */
  --leading-display: 1.1;
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-body: 1.6;
  --leading-prose: 1.75;

  /* Tracking */
  --tracking-display: -0.03em;
  --tracking-h1: -0.025em;
  --tracking-h2: -0.02em;
  --tracking-heading: -0.01em;
  --tracking-body: 0;
  --tracking-overline: 0.1em;
}
```

---

## Related Files
- [colors-tokens.md](colors-tokens.md) — Color palette, theme tokens, dark/light mode
- [layout-spacing.md](layout-spacing.md) — Spacing tokens, grid system, breakpoints
- [animation.md](animation.md) — Animation tokens, durations, and easings
- [imagery.md](imagery.md) — Image guidelines and noise/grain texture
- [polish.md](polish.md) — Shadow tokens, z-index system, focus states
