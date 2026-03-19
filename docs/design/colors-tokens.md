# Colors & Tokens

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). This file defines implementation-ready color tokens and mode strategy.

## Philosophy

Dark. Cinematic. Premium. The site IS the portfolio piece. White space is a feature.
Typography does the heavy lifting — imagery is secondary. Every detail signals precision.

## Color Palette

Red owns the brand. No secondary accent color. White and dark tones support it.

```
Primary (red):     #991717 — the signature
Primary gradient:  #991717 -> #b91d1d -> #cc2323 (subtle evolution, not neon)
Dark base:         Warm charcoal/near-black (NOT pure #000) — hero, dark sections
Light base:        Warm off-white/cream (NOT pure #fff) — content sections, light mode
Neutral:           Dark gray, between gray and dark — borders, muted text, dividers
```

All colors pass **WCAG 2.1 AA** contrast ratios against their paired backgrounds (WCAG 2.1 AA is the project standard — sufficient for European Accessibility Act compliance):
- Foreground on base: 15.9:1 (AAA), Muted on base: 6.3:1 (AA), Faint on base: 3.2:1 (large text only).

**Competitive reference** (from `design-reference-audit.md`):
- Our dark base `#141414` matches Aristide Benoist. Warmer than `#000`, cooler than Unseen's `#212121`.
- Our light base `#F5F0EB` close to Unseen's warm cream `#EFDED9`.
- Locomotive's red `#DA382E` is in the same warm family as our `#991717`.

### Tailwind v4 Theme Tokens

Defined via `@theme` directive in `src/styles/globals.css` (Tailwind v4 CSS-first config, no JS config file):

```css
@theme {
  /* Brand — static, mode-independent */
  --color-brand-red: #991717;        /* buttons, links, accents */
  --color-brand-red-light: #cc2323;  /* hover states, gradients */
  --color-brand-red-dark: #7a1212;   /* pressed states */

  /* Semantic — dark defaults, overridden by html.light */
  --color-base: #141414;             /* main background (warm charcoal) */
  --color-raised: #1c1c1c;           /* cards, elevated surfaces */
  --color-sunken: #0c0c0c;           /* inset areas, hero */
  --color-foreground: #F0E8E0;       /* primary text (warm off-white) */
  --color-muted: #9A918A;            /* secondary text */
  --color-faint: #6A625C;            /* tertiary/decorative */
  --color-line: #2a2a2a;             /* borders, dividers */
  --color-line-subtle: #1f1f1f;      /* very subtle borders */
}
```

### Light Mode Overrides

Light mode overrides (in globals.css on `html.light`):
- base: `#F5F0EB` (warm cream), raised: `#FFFFFF`, sunken: `#EDE8E3`
- foreground: `#1A1714`, muted: `#6B635C`, faint: `#8A8380`
- line: `#DDD5CC`, line-subtle: `#E8E2DB`

Generates utilities: `bg-base`, `text-foreground`, `border-line`, `bg-brand-red`, etc. All semantic utilities auto-adapt to dark/light mode via CSS custom property cascading.

## Dark Mode

Dark-first. Dark is the default. Light mode is the accessible alternative.

- **First visit:** Detect `prefers-color-scheme`. No preference = dark.
- **Manual toggle:** Persisted to `localStorage`. Overrides system preference.
- **Dark sections:** Deep warm charcoal backgrounds. Makes 3D, WebGL, video pop.
- **Light sections:** Warm off-white/cream for readability. Content sections breathe.
- **Rhythm:** Pages alternate between dark and lighter tones — not monolithic.

## Dark/Light Mode Implementation

### CSS Strategy

Tailwind v4 dark mode via `class` strategy (not `media`). The `<html>` element gets `class="dark"` or `class="light"`.

- **Default:** Dark. No class on `<html>` = dark (CSS defaults to dark styles). `class="light"` activates light mode.
- **First visit:** Check `localStorage` for `v2_theme`. If absent, check `prefers-color-scheme`. If `prefers-color-scheme: light`, apply light. Otherwise dark.
- **Storage key:** `v2_theme` in `localStorage`. Values: `"dark"` | `"light"` | absent (= follow system).
- **Toggle location:** Inside the menu panel (desktop sidebar + mobile fullscreen). A simple sun/moon icon toggle. NOT in the header bar.

### Flash Prevention

Inline `<script>` in `<head>` (before any CSS loads) reads `localStorage` and applies the class synchronously. Runs before first paint (~200 bytes):

```html
<script>
  (function(){
    var t = localStorage.getItem('v2_theme');
    if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      document.documentElement.classList.add('light');
    }
  })();
</script>
```

### Section-Level Overrides

Some sections force a specific mode regardless of global toggle (e.g., 3D hero is always dark, legal pages may use light for readability). Use `data-theme="dark"` or `data-theme="light"` on section containers. CSS targets: `[data-theme="light"]` overrides the global mode for that subtree.

---

## Related Files
- [typography.md](typography.md) — Type scale, font specs, and weight adjustments
- [layout-spacing.md](layout-spacing.md) — Spacing tokens, grid system, breakpoints
- [animation.md](animation.md) — Animation tokens, durations, and easings
- [imagery.md](imagery.md) — Image guidelines and noise/grain texture
- [polish.md](polish.md) — Shadow tokens, z-index system, focus states
- [../pages/_conventions.md](../pages/_conventions.md) — Token shorthand used in blueprints
