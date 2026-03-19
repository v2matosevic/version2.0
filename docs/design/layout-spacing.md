# Layout & Spacing

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). Responsive breakpoint behavior merged from `docs/pages/_conventions.md`.

## Spacing & Layout

Use Tailwind defaults. Custom tokens only where design requires it.

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `py-16 md:py-24 lg:py-32` | Vertical rhythm between sections |
| Container max-width | `max-w-7xl` (1280px) | Page-level constraint |
| Content max-width | `max-w-3xl` (768px) | Prose readability |

## Grid System

**12-column CSS grid** as the structural backbone (matching Malvah's `.site-grid` pattern):

```css
.grid-standard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem; /* 24px */
}
```

| Layout | Columns | Usage |
|--------|---------|-------|
| Standard grid | `repeat(12, 1fr)`, gap `1.5rem` (24px) | Page-level structure |
| Asymmetric grid | `1fr 1.2fr` | Content + media pairs (text left, visual right) |
| Card grid | `repeat(auto-fill, minmax(320px, 1fr))` | Service cards, portfolio items |
| Prose width | `max-w-3xl` (768px) | Blog content, long-form readability |

### Container

```css
.container {
  max-width: 1280px; /* max-w-7xl */
  margin-inline: auto;
  padding-inline: 1rem;    /* px-4 */
}
@media (min-width: 640px)  { .container { padding-inline: 1.5rem; } } /* sm:px-6 */
@media (min-width: 1024px) { .container { padding-inline: 2rem; } }   /* lg:px-8 */
```

### Full-Bleed

For hero sections and edge-to-edge backgrounds, use negative margin to break out of the container:

```css
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

Or simply place the section outside the container entirely (preferred — simpler DOM).

## Breakpoints

Tailwind defaults: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

### Layout Shift Summary

| Breakpoint | Grid | Section Padding | Container Padding |
|------------|------|----------------|-------------------|
| < 640px | 1 column | `py-16` (64px) | `px-4` (16px) |
| 640px (sm) | 2 columns (cards) | `py-16` | `px-6` (24px) |
| 768px (md) | Asymmetric grids activate | `py-24` (96px) | `px-6` |
| 1024px (lg) | Full 12-column | `py-32` (128px) | `px-8` (32px) |
| 1280px (xl) | Container capped | `py-32` | `px-8` |

### Responsive Breakpoint Behavior (Full Detail)

Comprehensive layout behavior at each breakpoint, including all component-level changes:

| Breakpoint | Grid System | Section Padding | Container Padding | Key Layout Changes |
|------------|------------|----------------|-------------------|-------------------|
| < 640px (mobile) | 1 column | `py-16` (64px) | `px-4` (16px) | All grids single column. Hero text centered on homepage. Cards stacked full-width. Blog grid 1 col. Pricing cards stacked. Contact path cards stacked. Footer single column. Stats 2+2+1 wrap. TOC collapsible above content. FAB unchanged. Mobile menu replaces sidebar. |
| 640px (sm) | 2 columns for cards | `py-16` | `px-6` (24px) | Card grids become 2-col. Blog grid 2 cols. Minor layout shifts. |
| 768px (md) | Asymmetric grids | `py-24` (96px) | `px-6` | Service bands activate 2-col asymmetric. Contact form + sidebar grid. Blog prose 18px. Hero text left-aligned. Footer 2x2 grid. |
| 1024px (lg) | Full 12-column | `py-32` (128px) | `px-8` (32px) | All layout patterns active. Desktop menu replaces mobile. Blog grid 3 cols. Pricing grid 3-4 cols. Blog TOC sticky sidebar. Header shows text links. |
| 1280px+ (xl) | Container capped 1280px | `py-32` | `px-8` | Max container reached. Typography at clamp maximums. Content centers in viewport. No further scaling. |

## Borders & Radius

- Small elements (badges, chips): `rounded-md`
- Cards, inputs: `rounded-lg` or `rounded-xl`
- Full round (avatars, icons): `rounded-full`

---

## Related Files
- [colors-tokens.md](colors-tokens.md) — Color palette, theme tokens, dark/light mode
- [typography.md](typography.md) — Type scale, font specs, and responsive typography behavior
- [animation.md](animation.md) — Animation tokens, durations, and easings
- [imagery.md](imagery.md) — Image guidelines and noise/grain texture
- [polish.md](polish.md) — Shadow tokens, z-index system, focus states
