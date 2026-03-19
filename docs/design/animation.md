# Animation & Interaction

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). This is the core differentiator. The site must feel alive.

## Libraries

| Library | Role |
|---------|------|
| React Three Fiber (R3F) | WebGL/3D scenes — hero, interactive elements |
| GSAP + ScrollTrigger | Timeline animations, per-character text effects, scroll reveals |
| Lenis | Smooth scrolling across all devices |
| Motion (formerly Framer Motion) | Component animations, page transitions, AnimatePresence. Package: `motion`, import from `motion/react`. |
| *(Sound not planned for v1)* | — |

## Interactions

- **Custom cursor (desktop):** Minimalistic dot/circle. Changes state on hover — grows,
  morphs, shows contextual hint. Fits the dark premium aesthetic.
- **Per-character text animations:** On headings, key statements, nav links on hover.
- **Scroll-triggered reveals:** Elements animate in as they enter viewport. GSAP ScrollTrigger.
- **Page transitions:** Quick crossfade (<300ms). Opacity fade + slight slide-up on new content.
  Motion AnimatePresence. Near-zero performance cost. No heavy wipes.

## Accessibility

- **prefers-reduced-motion:** All animations respect this OS-level setting. Hard requirement.
- **Mobile degradation:** Progressive. Lighter 3D (fewer particles, simpler geometry),
  static fallbacks where GPU cannot handle it. Preserve all scroll animations and page transitions.
- **Safari WebGL:** Tested specifically for R3F compatibility.

## Preloader

- V2 icon assembling from particles into the final icon shape.
- Simple, clean, branded. The first brand moment.
- Doubles as real asset-loading indicator for the 3D scene.

## Animation Tokens

### Durations

```css
:root {
  --duration-fast: 150ms;     /* micro-interactions: hover, focus, toggle */
  --duration-normal: 300ms;   /* standard transitions: fade, slide, color */
  --duration-slow: 500ms;     /* emphasis transitions: section reveals, modals */
  --duration-page: 200ms;     /* page transitions (Motion AnimatePresence) */
}
```

### Easing Curves

All easings as `cubic-bezier()` for use in CSS `transition-timing-function`. GSAP equivalents noted.

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);        /* standard exit — elements arriving */
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);    /* symmetric — modals, page transitions */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);  /* subtle motion — hover, color shifts */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* playful overshoot — from Unseen Studio */
}
```

| Token | GSAP Equivalent | Usage |
|-------|----------------|-------|
| `--ease-out` | `"power3.out"` | Scroll reveals, elements entering viewport |
| `--ease-in-out` | `"power2.inOut"` | Page transitions, modal open/close |
| `--ease-smooth` | `"power1.out"` | Hover states, subtle color transitions |
| `--ease-bounce` | `CustomEase` (overshoot) | Sparingly — loader, playful micro-moments |

**Competitive reference:** Unseen Studio uses `cubic-bezier(.34, 1.56, .64, 1)` for their 3D cube loader. Locomotive uses `cubic-bezier(0.215, 0.61, 0.355, 1)` for section transitions. Malvah uses `cubic-bezier(.4, 0, .2, 1)` as their standard ease-out.

### GSAP ScrollTrigger Defaults

Standard scroll-reveal animation applied to section elements:

```js
gsap.from(element, {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 85%",     // element top hits 85% of viewport
    once: true,           // no reverse on scroll up
  },
});
```

| Property | Value | Rationale |
|----------|-------|-----------|
| Start position | `top 85%` | Reveals begin before element is centered — feels anticipatory |
| Opacity | `0 → 1` | Fade in |
| Y offset | `40px → 0` | Subtle upward drift — not aggressive, not flat |
| Duration | `0.8s` | Unhurried but not sluggish |
| Ease | `"power2.out"` | Smooth deceleration |
| Once | `true` | No reverse — elements stay revealed on scroll-up |

### Stagger Timing

| Context | Delay | Example |
|---------|-------|---------|
| Per-character (headline) | 30ms | GSAP SplitText — headline assembles character by character |
| Per-word (subtitle) | 80ms | Word-level stagger for subheadings |
| Per-element (section children) | 100ms | Cards, list items, feature blocks entering in sequence |
| Per-section (page load) | 150ms | Orchestrated entrance of hero → subtext → CTA |

### Reduced Motion

All animation respects `prefers-reduced-motion: reduce`:

```js
// GSAP — wrap all animations
const prefersMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
if (prefersMotion) {
  // run GSAP animation
} else {
  gsap.set(element, { opacity: 1, y: 0 }); // instant final state
}
```

```css
/* CSS — disable transitions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

When reduced motion is preferred:
- No scroll-triggered animations — elements render in final state immediately.
- No per-character text effects — headlines appear instantly.
- Page transitions reduced to a simple opacity crossfade at `--duration-fast` (150ms).
- R3F 3D scene shows a styled static fallback (gradient + text), not a frozen frame.
- Lenis smooth scroll is disabled — native browser scroll.

---

## Related Files
- [colors-tokens.md](colors-tokens.md) — Color palette, theme tokens, dark/light mode
- [typography.md](typography.md) — Type scale, font specs, and weight adjustments
- [layout-spacing.md](layout-spacing.md) — Spacing tokens, grid system, breakpoints
- [imagery.md](imagery.md) — Image guidelines and noise/grain texture
- [polish.md](polish.md) — Shadow tokens, z-index system, focus states
