# Design Prompts — Version2.hr

Refined prompt blocks adapted from community research (see `tasks/ai-design-prompts-research.md` for raw sources). Drop these into CLAUDE.md, use as session primers, or reference during component builds.

---

## 1. CLAUDE.md Aesthetics Block

Add this to the project's CLAUDE.md before building any UI component. It overrides Claude's default tendency toward generic output.

```markdown
## Frontend Aesthetics

Every component must feel intentionally designed for a premium web development studio. This is NOT a SaaS dashboard or a startup landing page. It's a portfolio piece that proves we can build what others can't.

### Aesthetic Direction: Dark Cinematic Premium

Committed direction. Not a suggestion — enforce on every component:
- **Mood:** Dark, atmospheric, confident. Deep warm charcoal backgrounds that make typography and 3D elements pop. Breathing lighter sections for contrast rhythm.
- **Typography is the hero.** Albert Sans at Light 300 on dark backgrounds creates thin, precise strokes. Headlines should feel editorial — large, spaced, commanding. Manrope body text at 400 for crisp readability.
- **Red is surgical.** #991717 appears on buttons, links, and strategic accents. Never splashed broadly. Never combined with other accent colors. Red on dark charcoal. Red on warm off-white. Nothing else.
- **Motion is narrative.** Every animation tells a micro-story: elements arriving, text assembling character by character, scenes responding to the viewer. GSAP ScrollTrigger for reveals, per-character SplitText for headlines, Motion (import from `motion/react`) for page transitions. One orchestrated entrance per section, not scattered micro-interactions.
- **Depth and atmosphere.** Backgrounds are never flat solid colors. Subtle gradients, grain textures, layered transparencies. The R3F 3D hero sets the tone — the rest of the site maintains that atmospheric quality through CSS.

### NEVER (Explicit Bans)

These are the patterns that make AI output look generic. Enforce zero tolerance:

- NEVER use Inter, Roboto, Open Sans, Lato, system-ui, or any system font
- NEVER use purple gradients, blue-to-purple, or teal accents
- NEVER use generic card-grid layouts without spatial variation
- NEVER use centered-text hero with stock gradient background
- NEVER use uniform rounded-2xl on everything (vary border radius by element role)
- NEVER use drop shadows without purpose (flat > generic shadow)
- NEVER default to white backgrounds (warm off-white/cream minimum)
- NEVER use placeholder copy (Lorem ipsum, "Welcome to our site", "Learn more")
- NEVER use evenly-distributed pastel palettes
- NEVER create components that could belong to any brand

### INSTEAD (Positive Alternatives)

- Albert Sans 300 for headlines, Manrope 400 for body. Use extremes: 300 vs 700, not 400 vs 500.
- Size jumps of 3x+ between hierarchy levels. H1 should dwarf H2.
- Brand red (#991717) as the sole accent. Shades: #cc2323 (hover), #7a1212 (pressed).
- Asymmetric layouts. Grid-breaking hero sections. Generous negative space between sections.
- Dark sections with warm charcoal (not pure black). Light sections with warm cream (not pure white).
- CSS gradients layered with noise/grain textures for atmospheric backgrounds.
- Staggered animation-delay on section entrance. 100ms between elements, 30ms per character.
- Custom cursor states that respond to element types (grow on interactive, contextual hints).
```

---

## 2. Component Build Prompts

Use these section-by-section, not for full pages. Each prompt builds one section with full context.

### Hero Section

```
Build the homepage hero section for Version2.hr — a premium web development studio.

Aesthetic: Dark cinematic. Deep warm charcoal background. The R3F 3D scene loads
separately (placeholder div for now, min-height 100vh, styled gradient fallback).

Content overlay:
- "We build what others can't." in Albert Sans, weight 300, extremely large
  (clamp between 3rem and 8rem). Tight letter-spacing (-0.03em). White text.
- Below: a single line of Manrope 400 body text, muted warm gray, max-width 600px.
- Two CTAs: "See Our Work" (filled red #991717, hover #cc2323) and
  "Start a Project" (ghost/outline, white border, white text).
- Scroll indicator at bottom (animated chevron or line).

Layout: Text left-aligned on desktop (max-width ~50% of viewport), centered on mobile.
The 3D scene occupies the full background. Text floats over it with sufficient contrast.

Motion: Text animates in on page load — staggered character-by-character for the
headline (GSAP SplitText), fade-up for subtext and CTAs with 100ms delays between.
Respect prefers-reduced-motion (instant render, no animation).

Do NOT use a centered card layout. Do NOT use a gradient-text headline.
Do NOT add decorative blobs or circles.
```

### Service Card Grid

```
Build a services grid section showing 6 service cards for Version2.hr.

Data: Each card has: icon (Lucide), title, one-line description, link.
Services: Web Design, Web Applications, E-Commerce, AI Integration, SEO,
Digital Business Cards.

Layout: 3 columns on desktop, 2 on tablet, 1 on mobile. Cards have subtle warm
charcoal backgrounds on the dark theme, or warm off-white on light theme.
Cards should NOT all be identical rectangles — vary the visual rhythm. Consider
making the first card span 2 columns, or using different aspect ratios.

Interaction: On hover, the card lifts slightly (translateY -4px), the icon color
shifts to brand red (#991717), and a subtle border appears. Transition 200ms ease.

Typography: Card title in Albert Sans 700 (bold, not the Light 300 used for
page headlines). Description in Manrope 400. Both sized for scanning, not reading.

Do NOT use rounded-2xl cards with drop shadows. Do NOT use colored icon backgrounds.
Do NOT use a "Learn more ->" link — the entire card is clickable.
```

### Dark/Light Section Rhythm

```
Build a Section wrapper component that enforces the dark/light alternating rhythm
across the Version2.hr site.

Props: variant ('dark' | 'light' | 'neutral'), children, className, id.

Dark variant: warm charcoal background (the surface.dark token), white/light text.
Light variant: warm cream/off-white (surface.light token), dark text.
Neutral variant: slightly darker than light, for subtle distinction.

Padding: py-16 md:py-24 lg:py-32. Consistent vertical rhythm.
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8.

The transition between sections should feel smooth — consider a subtle gradient
fade at the top/bottom edges (8-16px) rather than hard color cuts.

This component is the backbone of every page. It must be minimal, composable,
and never opinionated about its children's layout.
```

---

## 3. Session Primer

Start each coding session that involves UI work with this context block:

```
Before building any component, review:
1. docs/design/ — color tokens (`colors-tokens.md`), typography (`typography.md`), spacing (`layout-spacing.md`)
2. docs/build-strategy.md — file structure, coding practices
3. docs/brand-discovery.md — Section 7 (Visual Mood), Section 10 (Component List)

Design principles for this session:
- Dark-first. Warm charcoal, not pure black.
- Typography carries the design. Albert Sans Light 300 headlines. Manrope 400 body.
- Red (#991717) is the only accent. Surgical, not splashed.
- Motion is narrative, not decorative. One orchestrated entrance per section.
- Build the component in isolation first. Then integrate into the page.
- Screenshot the result and compare against reference sites (Unseen Studio,
  Dogstudio, Locomotive) for quality bar.
```

---

## 4. Screenshot Self-Correction Loop

After building a component, use this prompt with a screenshot:

```
Here is a screenshot of the [component name] I just built.

Compare it against the Version2.hr design principles:
1. Does it feel premium? Or does it look like a template?
2. Is the typography hierarchy clear? (Large headline, readable body, no in-between)
3. Is the spacing generous enough? (Sections should breathe)
4. Does the color usage feel surgical? (Red as accent, not decoration)
5. Would this pass as a section from Unseen Studio or Dogstudio?

List specific improvements. Focus on spacing, typography weight, color restraint,
and atmospheric depth. Then implement the changes.
```

---

## 5. Reference Blueprint Technique

When building a section inspired by a reference site, screenshot it and use:

```
Build [section name] for Version2.hr. Match the spatial composition and typography
hierarchy of the reference screenshot, but adapt to our design system:
- Replace their fonts with Albert Sans (headlines) + Manrope (body)
- Replace their colors with our palette (brand red #991717, warm charcoal dark,
  warm cream light)
- Replace their content with our actual content from the markdown files
- Maintain or exceed their animation quality using GSAP ScrollTrigger

Do NOT copy their layout pixel-for-pixel. Extract the principles (spacing ratios,
type scale jumps, element rhythm) and express them in our visual language.
```

---

## 6. Reduced Motion Verification

After any animation work:

```
Verify this component respects prefers-reduced-motion:

1. Wrap all GSAP animations in a matchMedia check for '(prefers-reduced-motion: no-preference)'
2. When reduced motion is preferred: no scroll animations, no per-character effects,
   no smooth scroll via Lenis, page transitions reduced to simple crossfade (<150ms)
3. The R3F 3D scene should show a styled static fallback (gradient + text),
   not a frozen/janky 3D frame
4. The component must be fully functional and visually complete without any animation

Test by toggling the OS setting or using the CSS override:
@media (prefers-reduced-motion: reduce) { ... }
```

---

## 7. Blog Post Template Quality Check

For the blog post template specifically:

```
The blog post template must feel like reading a well-designed editorial piece,
not a generic markdown renderer.

Typography requirements:
- H1 (post title): Albert Sans 300, very large, tight tracking
- H2: Albert Sans 300, clear hierarchy jump from body
- Body: Manrope 400, 18px minimum, line-height 1.75, max-width max-w-3xl (768px)
- Code blocks: JetBrains Mono or Fira Code, warm charcoal background,
  syntax highlighting with restrained colors (no neon)
- Blockquotes: left border in brand red, Albert Sans italic, larger than body

Spacing: Generous. 2rem between paragraphs. 3rem before H2. 1.5rem after H2.
Reading a post should feel spacious, not cramped.

The reading experience IS the product demonstration. A web dev studio's blog
should have the best typography on the internet.
```

---

## 8. Website Integration Ideas

These prompts and techniques can become content on the Version2.hr site itself:

### Blog Post: "How We Use AI to Build Better Websites"
- Walk through the actual build process (this project)
- Show before/after of AI-generated vs refined components
- Demonstrate the screenshot-loop technique
- Position Version2 as AI-forward without being "AI-dependent"

### Service Page: AI Integration
- Reference the prompt engineering expertise demonstrated in the build
- Offer AI workflow consulting for client projects
- Show how AI accelerates development without compromising quality

### Blog Post: "The Prompt Engineering Behind This Website"
- Meta post about building version2.hr with AI assistance
- Share refined prompts (like these) as open-source resources
- Link to the research sources
- Demonstrates transparency and technical depth

---

## Skill Plugins to Evaluate Before Build

Test these during Layer 0 (project scaffold) to see if they add value:

```bash
# Official Anthropic design skill (the foundation)
claude plugin add anthropic/frontend-design

# GSAP, Motion, Three.js, R3F specific guidance
claude plugin add freshtechbro/claudedesignskills

# Motion with bundle optimization
claude plugin add jezweb/motion
```

Evaluate each by building a test component with and without the plugin active. Keep only what produces measurably better output.
