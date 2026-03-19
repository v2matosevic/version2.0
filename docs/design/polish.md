# Polish — Shadows, Z-Index & Focus

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). This file covers shadow tokens, z-index layering, and keyboard focus states.

## Shadow Tokens

Dark-mode-first shadows. Higher opacity than typical because dark backgrounds absorb more contrast:

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);       /* subtle card elevation */
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);       /* elevated cards, dropdowns */
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.4);       /* modals, menu overlay */
  --shadow-glow: 0 0 20px rgba(153, 23, 23, 0.3);   /* brand red glow on hover */
}
```

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Cards at rest, subtle lift |
| `--shadow-md` | Hovered cards, dropdown menus, elevated content |
| `--shadow-lg` | Modals, fullscreen menu backdrop, overlays |
| `--shadow-glow` | Interactive hover state on primary CTAs, strategic accent moments |

**Rules:**
- Never combine `--shadow-sm` and `--shadow-md` on the same element. Pick one.
- `--shadow-glow` is reserved for brand red elements on hover — never at rest.
- Light mode: reduce shadow opacity by ~30% (dark sections on light pages retain dark-mode values).

## Z-Index System

Predictable layering. Every z-index in the project must use one of these tokens — no magic numbers.

```css
:root {
  --z-base: 0;         /* default content flow */
  --z-raised: 10;      /* cards, elevated content, tooltips */
  --z-canvas: 20;      /* R3F 3D canvas — behind interactive overlays */
  --z-header: 30;      /* sticky header */
  --z-fab: 40;         /* floating action button (e.g. scroll-to-top) */
  --z-menu: 50;        /* sidebar / fullscreen navigation menu */
  --z-chat: 55;        /* AI chat overlay */
  --z-modal: 60;       /* modals, confirmation dialogs */
  --z-cookie: 70;      /* cookie consent banner */
  --z-cursor: 80;      /* custom cursor — always above content */
  --z-preloader: 100;  /* preloader — above everything during load */
}
```

**Rules:**
- Never use a raw integer for `z-index`. Always reference a token.
- If a new layer is needed, add it to this system with a clear name and slot — do not squeeze arbitrary values between existing ones.
- The R3F canvas (`--z-canvas: 20`) sits behind the header (`--z-header: 30`) so scroll-triggered content overlays naturally layer above the 3D scene.
- The custom cursor (`--z-cursor: 80`) must remain above all interactive layers except the preloader.

## Focus States

Keyboard accessibility is non-negotiable. Focus indicators must be visible, consistent, and non-intrusive on mouse interaction.

### Implementation

```css
/* Focus ring — keyboard only (focus-visible) */
:focus-visible {
  outline: 2px solid var(--color-brand-red);
  outline-offset: 2px;
}

/* On dark backgrounds where red may lack contrast */
[data-theme="dark"] :focus-visible,
.dark :focus-visible {
  outline-color: var(--color-foreground);
}

/* Remove default browser outline on mouse click */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Rules:**
- `focus-visible` only — Tab key shows the focus ring, mouse click does not.
- Focus ring color: `var(--color-brand-red)` on light backgrounds, `var(--color-foreground)` on dark backgrounds.
- Outline offset: `2px` — ring floats slightly outside the element boundary for clarity.
- Never remove focus styles entirely. Never use `outline: none` without a visible replacement.
- Interactive elements (buttons, links, inputs, custom controls) must all participate.

## Performance Targets

- Lighthouse 90+ across all categories.
- Core Web Vitals green.
- 3D/WebGL loads progressively — never blocks initial page render.

---

## Related Files
- [colors-tokens.md](colors-tokens.md) — Color palette, theme tokens, dark/light mode
- [typography.md](typography.md) — Type scale, font specs, and weight adjustments
- [layout-spacing.md](layout-spacing.md) — Spacing tokens, grid system, breakpoints
- [animation.md](animation.md) — Animation tokens, durations, and easings
- [imagery.md](imagery.md) — Image guidelines and noise/grain texture
