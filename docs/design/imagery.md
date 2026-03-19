# Imagery

> Source of truth: `docs/brand-discovery.md`. Implementation patterns from `docs/design-reference-audit.md` (6 competitive sites analyzed). This file covers image guidelines, icon standards, and the noise/grain texture system.

## Image Guidelines

- **Hero:** Code-built R3F 3D scene. NOT images. AI tools used elsewhere, not here.
- **Portfolio:** Screenshots in device mockups + embedded live sites (iframe).
- **Blog:** Featured image hero, consistent 16:9 aspect ratio.
- **Client logos:** Understated, desaturated/grayscale with color on hover.
- **Icons:** Lucide React (`lucide-react`). Tree-shakeable, consistent 24x24 stroke icons. No other icon library.
- **All images provided by owner.** Build with placeholders first, swap later.

## Noise & Grain Texture

Atmospheric grain applied to section backgrounds. Creates cinematic depth — backgrounds feel textured, not flat. Inspired by film grain and analog photography.

### Implementation

Apply via CSS pseudo-element on section containers:

```css
.section-atmosphere::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/textures/noise.png"); /* 200x200 repeating noise tile */
  background-repeat: repeat;
  opacity: 0.04;           /* dark sections: 0.03–0.05 */
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}

html.light .section-atmosphere::after {
  opacity: 0.025;          /* light sections: 0.02–0.03 */
}
```

**Alternative (inline SVG filter, no external asset):**

```html
<svg class="sr-only" aria-hidden="true">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```

```css
.section-atmosphere::after {
  content: "";
  position: absolute;
  inset: 0;
  filter: url(#grain);
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```

### Rules

- Apply to section backgrounds only — never to content, text, images, or interactive elements.
- `pointer-events: none` is mandatory — the grain layer must not intercept clicks.
- Keep opacity subtle: 0.03-0.05 on dark, 0.02-0.03 on light. If grain is consciously visible, it is too strong.
- The noise PNG should be tiny (< 5KB) and repeat seamlessly. Generate at 200x200px with uniform distribution.
- The SVG filter approach avoids an extra network request but renders slightly differently across browsers. Choose one approach per project and stick with it.

---

## Related Files
- [colors-tokens.md](colors-tokens.md) — Color palette, theme tokens, dark/light mode
- [typography.md](typography.md) — Type scale, font specs, and weight adjustments
- [layout-spacing.md](layout-spacing.md) — Spacing tokens, grid system, breakpoints
- [animation.md](animation.md) — Animation tokens, durations, and easings
- [polish.md](polish.md) — Shadow tokens, z-index system, focus states
