# Design Reference Audit: Premium Dark Studio Sites

> Competitive visual analysis for Version2.hr rebuild.
> Conducted: 2026-02-27. Sites fetched and analyzed via source markup + secondary research.

---

## 1. Unseen Studio (unseen.co)

**What they are:** Brand, digital, and motion studio based in Bristol/London. Awwwards Design Studio of the Year.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| Dark base | `#212121` | Loader background, primary dark tone |
| Near-black | `#191919`, `#0a0a0a`, `#111111` | Project-specific dark backgrounds |
| Warm cream | `#EFDED9` ("Bizarre") | Primary accent — hero text, highlights |
| Deep purple-gray | `#535061` ("Scarpa") | Secondary neutral — muted text, UI elements |
| Light sections | `#f2f4f4`, `#e8e2de`, `#ede8e1` | Warm off-whites for light-mode project cards |
| Orange accent | `#FF4E1B` | Used sparingly for high-contrast moments |
| Blush/soft rose | `#e5d5d5`, `#f8d8d8` | Project-specific warm tones |
| True dark | `#000000` | Never used as page background — reserved for deep contrast |

**Key insight:** The palette is warm, not cool. The dark base `#212121` avoids cold blue-blacks. The cream `#EFDED9` paired with purple-gray `#535061` creates a dusty, editorial feel. Each project section carries its own background color + a `light_mode` boolean that flips text color automatically.

### Typography

| Role | Font | Weight | Details |
|------|------|--------|---------|
| Display / Headlines | Saol Display (Schick Toikka) | 400 (Light), Italic | Serif with sharp contrast — editorial elegance |
| Body / UI | Neue Montreal (Pangram Pangram) | 400 (Regular) | Geometric grotesque, slightly tight kerning |
| Title size | ~`1.125rem` | — | Compact, understated |
| Tagline size | ~`1rem` | — | Paired closely with title |
| Button text | ~`0.7rem` | — | Small, uppercase feel |
| Letter-spacing | `-.025rem` | — | Negative tracking on titles/taglines (compressed) |

**Key insight:** The serif/sans pairing (Saol Display + Neue Montreal) creates tension between editorial warmth and clean modernity. Headlines feel like magazine covers. Body feels like tech documentation. The negative letter-spacing compresses text into dense, confident blocks.

### Hero Section

- Full-viewport loader experience with a **3D rotating cube** (CSS 3D transforms, not WebGL)
- Cube has 6 faces with animated content (eye graphics, "UNSEEN" letterforms)
- Cube rotates via `rotateY()` / `rotateX()` / `translateZ()` with `cubic-bezier(.34, 1.56, .64, 1)` easing (bouncy overshoot)
- Progress bar animates during load with `1s ease-out` transition
- "Enter" CTA with split-line animated underline
- Audio toggle present from the start — sound design is integral
- After entry: hero tagline reads "A brand, digital and motion studio creating refreshingly unexpected ideas"
- Fixed overlay at `z-index: 12000`

### Navigation

- Toggle menu system (hamburger-style, not persistent nav bar)
- Items numbered: `01 Index`, `02 Projects`, `03 Contact`, `04 World`
- Contact email and phone displayed directly in nav
- Social links (Twitter, Instagram, LinkedIn, Dribbble, Behance)
- Likely fixed/sticky given persistent sound toggle and menu button

### Section Transitions

- Each project carries its own `bg_color` property + `light_mode` flag
- Transitions between `#191919` -> `#f2f4f4` -> `#0a0a0a` etc. create rhythm
- No uniform dark-only approach — deliberate alternation keeps scroll engagement high
- Projects section has filtering: All, Branding, Digital, Motion, Experiment

### Atmospheric Elements

- 3D perspective transforms on loader (depth without WebGL)
- Custom hover underlines: `span{transform:translateX()}` creates split-line animation
- Sound design integration (audio toggle is first-class UI element)
- "Drag to explore" interaction model for gallery — custom scroll/drag handlers
- Project items stored with 3D position data `{x, y, z}` for parallax depth effects
- `.glb` 3D model files referenced (glass material)

### What Makes It NOT Generic

1. **Loader as experience** — the 3D cube entry is a brand moment, not a loading screen
2. **Sound as design material** — audio is opt-in from first interaction
3. **Per-project color theming** — each case study transforms the entire viewport palette
4. **Warm cream + purple-gray** instead of typical white-on-black
5. **Numbered navigation** — editorial/magazine convention brought to web
6. **3D parallax data on project items** — depth is structural, not decorative

---

## 2. Dogstudio (dogstudio.co)

**What they are:** Multidisciplinary creative studio at the intersection of art, design, and technology. Multiple Awwwards recognitions.

### Color Palette

CSS values are loaded entirely via JavaScript (`dog.js` custom library), making them non-extractable from markup. Based on visual research:

| Role | Estimated Value | Description |
|------|----------------|-------------|
| Dark base | Near-black (estimated `#0a0a0a` to `#111111`) | Deep, warm dark — not pure black |
| Text | Off-white/cream | High contrast against dark base |
| Accent | Varies by section/project | Contextual color shifts |

**Key insight:** The entire visual layer is rendered via JavaScript/WebGL, meaning the site has virtually zero CSS-declared colors. The visual richness comes from the 3D rendering pipeline, not from stylesheet values.

### Typography

Fonts are loaded and rendered through their custom `dog.js` engine. Based on visual observation:

| Role | Observed Style | Details |
|------|---------------|---------|
| Hero headline | Large condensed sans-serif | "We Make Good Shit" — massive, bold, high-impact |
| Spaced variant | Same font, expanded tracking | "W e M a k e G o o d S h i t" — letter-spaced display treatment |
| Body | Clean sans-serif | Helvetica-adjacent, moderate weight |

**Key insight:** The hero headline uses a dual presentation — standard typesetting AND widely letter-spaced variant of the same text, creating visual rhythm through spacing alone. No font change needed.

### Hero Section

- Centerpiece: **Interactive 3D dog** built with Three.js + TweenMax (GSAP predecessor)
- The dog's appearance dynamically transforms as users navigate — different moods/states per section
- Hero headline: "We Make Good Shit" — unapologetic, confident brand voice
- Subtext: "Dogstudio is a multidisciplinary creative studio at the intersection of art, design and technology"
- "Our Showreel" CTA links to Vimeo
- Sound toggle present — audio synced with navigation transitions

### Navigation

- Toggle menu (hamburger-style): "Toggle menu" button
- Items: The Studio, Our Cases, Careers, Our Values, Contact
- Additional: News, Newsletter subscription
- Language switcher: English / Espanol
- Social: Facebook, Instagram, Dribbble, Twitter

### Section Transitions

- Page transitions powered by **Highway.js** (custom library for seamless SPA-style navigation without browser reloads)
- Sound and reveal animations synchronized during transitions
- `.js-in-view` / `.in-view` class-based scroll triggers for element reveals
- Motion disabled for tablet/mobile (performance-conscious graceful degradation)

### Atmospheric Elements

- Full WebGL pipeline via Three.js — the 3D dog IS the atmosphere
- TweenMax (GSAP) for animation choreography
- WebAssembly support detection with fallback
- Sound design synchronized with navigation
- WordPress CMS backend (content separate from presentation layer)

### What Makes It NOT Generic

1. **Living mascot** — the 3D dog reacts to navigation, creating emotional connection
2. **Unapologetic copywriting** — "We Make Good Shit" is the entire brand voice in 4 words
3. **Sound-synced transitions** — navigation feels like moving through a film, not clicking links
4. **Full JS rendering pipeline** — zero reliance on CSS for visual atmosphere
5. **Letter-spaced typographic doubling** — showing the same headline two ways
6. **One-month rebuild** — proves that constraint breeds creativity

---

## 3. Locomotive (locomotive.ca)

**What they are:** Digital-first design agency, Montreal. 7x Awwwards Agency of the Year. Creators of Locomotive Scroll.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| Dark base | `#000000` | Pure black — confident, not warm |
| Text on dark | `#FFFFFF` | Pure white — maximum contrast |
| Primary accent | `#DA382E` | Brand red — warm, slightly orange-shifted |
| Secondary accent | `#312DFB` | Electric blue — used for specific themed sections |
| Light sections | `#FFFFFF` bg + `#000000` text | Full inversion |
| Borders | `#ccc` | Light gray for subtle separation |

**Key insight:** Locomotive uses pure black `#000000` where most premium dark sites avoid it. They compensate with their signature red `#DA382E` which adds warmth. The site uses a `data-theme` attribute system (`primary`, `secondary`, `lisa`) that swaps entire section color schemes — similar to Unseen's per-project approach but system-level.

### Typography

| Role | Font | Weight | Details |
|------|------|--------|---------|
| Display | Editorial New | — | Serif, editorial character — magazine-like headlines |
| Body/UI | Helvetica Now | — | Modern Helvetica with improved spacing and optical sizes |
| Base size | 15px (mobile/tablet/desktop) | — | Scales to 17px at 1600px, 19px at 2000px, 21px at 2400px+ |
| Line height | 1.3 | — | Tight for headlines, comfortable for body |
| Font weight | `initial` for headings, `700` for bold emphasis | — | — |

**Key insight:** The responsive font sizing is notably restrained — only 15px base until 1600px viewport width. This creates a dense, editorial reading experience on standard screens. The jump to 21px at 2400px+ accommodates large displays without looking sparse.

### Hero Section

- Video background with responsive poster images (mobile/desktop variants)
- Headline: "Digital-First Design Agency Based in Montreal, Canada"
- Modular, stacked typographic treatment — text split across multiple lines
- Preloader: black background, animated logo with `scale(0.9)` to `scale(1)` over 0.9s with 0.3s delay

### Navigation

- Fixed header with "Let's talk" CTA
- Language toggle (English / Francais)
- Mobile menu available
- `html.has-scroll-smooth{overflow:hidden; position:fixed}` — their own Locomotive Scroll library
- Focus states: `outline-color:var(--color); outline-style:auto; outline-width:10px`

### Section Transitions

- Background-color transitions use `cubic-bezier(0.215, 0.61, 0.355, 1)` with 0.3s duration
- `data-theme` attribute drives section-level palette switching
- Featured work displayed as card carousel (6 projects with lazy-loaded SVG placeholders at 300x176px)

### Page Structure (Top to Bottom)

1. Preloader (black bg, animated logo)
2. Header/Navigation (fixed)
3. Hero (video bg, headline)
4. Featured Work carousel
5. Mission statement: "Design and code are only tools..."
6. About section + CTAs
7. Articles section
8. Culture/Travel gallery
9. Store products (they sell merchandise)
10. Footer (multi-column: Menu, Social, External links, Newsletter, Address)

### Atmospheric Elements

- Video backgrounds (responsive mobile/desktop sources)
- Locomotive Scroll — their proprietary smooth-scroll library
- Cubic-bezier easing on all transitions (not linear, not ease-in-out)
- No explicit grain/noise textures in CSS
- No explicit WebGL/Three.js — deliberately frameworks-free approach ("Why don't we use front-end frameworks at Locomotive?")

### What Makes It NOT Generic

1. **Own scroll library** — Locomotive Scroll is used across thousands of sites; they eat their own cooking
2. **No frontend framework** — deliberate choice to avoid React/Vue, building with vanilla JS
3. **Theme attribute system** — `data-theme` swaps entire color schemes per section
4. **Red as warmth injection** — `#DA382E` on pure black creates theatrical contrast
5. **Merchandise store** — a web agency selling physical products signals brand confidence
6. **Editorial New + Helvetica Now** — magazine serif + workhorse sans = editorial credibility

---

## 4. Aristide Benoist (aristidebenoist.com)

**What they are:** Independent creative developer specializing in motion and interaction. Paris-based. Multiple Awwwards SOTD. Design by Ben Mingo, 3D by Michael Novia.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| Dark base | `#141414` | Very dark charcoal — warm, not pure black |
| Text | `#bac4b8` / `rgb(186, 196, 184)` | Muted sage green — distinctive, not white |
| Fallback bg | `#fff` | White (only for no-JS fallback) |
| Fallback text | `#000` | Black (only for no-JS fallback) |

**Key insight:** The text color `#bac4b8` is the most distinctive choice on this list. It is a desaturated sage/mint green, not white, not gray, not cream. Against `#141414` it creates a soft, cinematic, slightly matrix-like atmosphere. This single color choice makes the entire site feel different from every other dark portfolio.

### Typography

| Role | Font | Weight | Details |
|------|------|--------|---------|
| Primary body | "jws" (custom) | 700 (Bold) | Likely a custom-commissioned or licensed display sans |
| Secondary | "TNY" (custom) | 400 (Regular) | Possibly editorial/serif character |
| Fallback | Arial | — | Standard fallback |
| Base size | 16px (100% inherited) | — | Standard baseline |
| Ligatures | Disabled (`"liga" off`) | — | Intentional — cleaner, more mechanical feel |

**Key insight:** Disabling ligatures is a deliberate typographic choice. Standard ligatures (fi, fl, etc.) add warmth and flow. Disabling them creates a more rigid, engineered, monospaced-adjacent feel — perfect for a developer portfolio that values precision over editorial beauty.

### Hero Section

- Single-page application architecture (`#app` container, JS-rendered)
- Device-responsive: different CSS and JS bundles for mobile (`"m"`) vs desktop (`"d"`)
- Content rendered entirely via JavaScript — no visible HTML structure in source
- Performance-conscious: conditional asset loading, versioned bundles (`?v=2`)

### Navigation

- Not visible in HTML markup — rendered entirely via JavaScript
- Implied minimal structure given the portfolio nature

### Atmospheric Elements

- Fixed overlay system: `.iss-w` at `position:fixed; z-index:9999; height:100%` — likely a WebGL canvas overlay
- Conditional rendering based on device detection via `navigator.userAgent`
- `font-display:swap` for performance-optimized font loading
- No explicit Three.js/GSAP references in HTML (loaded dynamically)
- Credits list 3D work by Michael Novia — WebGL/3D is present but loaded asynchronously

### What Makes It NOT Generic

1. **Sage green text** `#bac4b8` on `#141414` — immediately distinctive from white-on-black convention
2. **Ligatures disabled** — typography signals engineering precision
3. **Fully JS-rendered** — no HTML content in source, everything is canvas/dynamic
4. **Device-specific bundles** — different experiences for mobile vs desktop, not responsive CSS
5. **Collaborative credits** — design, development, and 3D by different specialists, openly credited
6. **Restraint** — no grain, no gradients, no overlays in CSS; atmosphere comes from content and interaction

---

## 5. Immersive Garden (immersive-g.com) — Awwwards Agency of the Year 2024

**What they are:** Digital production studio, Paris. Specialized in design, animation, and development. Awwwards Agency of the Year (2024), SOTM February 2025.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| Light base | `#e8e8e8` | Warm light gray — not pure white |
| Dark base | `#030303` | Near-black — warmer than `#000000` |
| Text on light | `#030303` | Near-black on warm gray |
| Text on dark | `#e8e8e8` | Light gray on near-black |
| UI accent | `#90ee90` | Light green — for controls and interactive elements |
| Hover accent | `#fff` | Pure white — only for hover states |

**Key insight:** The palette is deliberately narrow: near-black, warm gray, and a single green accent. The green `#90ee90` is almost neon against the dark base — it serves as a functional marker for interactivity, not decoration. The site alternates between dark and light via body class modifiers.

### Typography

| Role | Font | Weight | Details |
|------|------|--------|---------|
| Display/Headers | PSTimes | Regular | Serif — editorial, classic character |
| Body | Helvetica Neue Regular / Light | Regular, Light | Clean sans-serif workhouse |
| Hero text | ~1.94vw (~37px at 1920px) | — | Viewport-relative sizing |
| Navigation | ~0.97vw (~14px at 1920px) | — | Half the hero text size |

**Key insight:** Viewport-relative typography (vw units) means the text literally scales with the browser. At 1920px, hero text is ~37px. At 2560px, it grows to ~50px. This creates a cinematic widescreen effect on large monitors.

### Hero Section

- Full-viewport centered grid layout (CSS Grid with named columns)
- Logo: grid columns 2/4
- Progress/text: grid columns 4/10
- Scroll indicator: grid columns 10/13
- Sequential opacity reveals with transform delays
- WebGL canvas (`.webglApp > canvas`) as background layer

### Navigation

- Button-based system with `.navButton` class
- Dynamic color switching (`.navButton--white` / `.navButton--black`)
- Logo animation states (`.logo__wrapper--black/white`)
- Hover: `translateX(4px)` shift — subtle horizontal movement
- Cubic-bezier timing on all transitions

### Atmospheric Elements

- **WebGL/Three.js canvas** — full-viewport background layer
- SVG mask animations with `will-change: transform`
- Page transitions: `.fade-global-*`, `.page-default-transition-*` classes
- Dark/light mode switching via body class modifiers
- Antialiased text rendering (`-webkit-font-smoothing: antialiased`)
- No visible grain texture in CSS — likely baked into WebGL layer
- Blend modes handled through opacity transitions, not CSS `mix-blend-mode`

### Responsive Breakpoints

- 1915px, 1440px, 768px — three-tier responsive strategy

### What Makes It NOT Generic

1. **WebGL as atmosphere** — the canvas layer creates visual depth without CSS tricks
2. **Grid-based composition** — named CSS Grid columns create precise editorial layouts
3. **Green accent `#90ee90`** on monochromatic base — functional, not decorative
4. **vw-based typography** — text scales cinematically with viewport
5. **SVG mask animations** — transitions use shape masks, not opacity fades
6. **Minimalist serif headers** — PSTimes creates gravitas without heavy weights

---

## 6. Malvah Studio (malvah.co) — Awwwards Studio of the Year 2025

**What they are:** Creative studio, Cape Town. Branding, UI/UX design, and motion. Awwwards Studio of the Year 2025.

### Color Palette

| Role | Value | Description |
|------|-------|-------------|
| True black | `rgb(0, 0, 0)` | Used for dark sections |
| Dark charcoal | `rgb(16, 16, 16)` | `#101010` — primary dark surface |
| Pure white | `rgb(255, 255, 255)` | Light section base |
| Off-white | `rgb(230, 230, 230)` | `#e6e6e6` — softer light sections |
| Soft blue-gray | `rgb(196, 206, 211)` | `#c4ced3` — "alice-white" accent |
| Shadow gray | `rgb(89, 89, 89)` | `#595959` — muted text, UI elements |

**Key insight:** The palette is colder than the other sites studied. The blue-gray accent `#c4ced3` gives it a Nordic/minimal feel. The `#101010` dark charcoal (not pure black) provides a subtly warmer dark surface.

### Typography

| Role | Font | Weight | Details |
|------|------|--------|---------|
| All text | Neue Haas Grotesk Text Pro | 400 | Single font family, single weight throughout |
| Fallback | Helvetica Neue | — | Expected fallback |
| Hero display | `.hero-1` class | 400 | 65px (mobile) to 136px (desktop) — fluid |
| Section display | `.display-1` class | 400 | 50px (mobile) to 88px (desktop) |
| Body | `.body-1` class | 400 | 14px (mobile) to 16px (desktop) |
| Line height (display) | 0.8 | — | Extremely tight — overlapping descenders |
| Line height (body) | 1.75 | — | Generous reading rhythm |
| Hero fluid calc | `calc(30.3662px + 1.50235vw)` up to 52px | — | CSS-calculated responsive sizing |

**Key insight:** Single font, single weight, massive scale range (14px to 136px). Hierarchy is created entirely through size, not weight or family changes. The 0.8 line-height on display text means letterforms literally overlap vertically — an aggressive editorial choice.

### Hero Section

- Headline: "Crafting distinctive brand experiences"
- 12-column CSS Grid (`.site-grid`) on desktop, 6-column on mobile
- Fluid typography via `calc()` + `vw` units

### Navigation

- Fixed header with logo (grid columns 1-4 mobile, 1-6 desktop)
- Mobile: `clip-path` animation on menu reveal
- Desktop: nav positioned at grid column 10
- Active states: `router-link-exact-active` with background highlighting (Vue/Nuxt)

### Atmospheric Elements

- **Lenis smooth scroll** (`html.lenis-smooth` class)
- **Backdrop blur**: `blur(64px)` on overlay elements
- **Mix-blend-difference** applied selectively — inverts colors on overlapping elements
- Opacity layers via CSS variables (`--tw-bg-opacity: .3`)
- **Theme toggle**: `[data-theme=light]` / `[data-theme=dark]` attribute system
- Frequent `position:sticky` with calculated offsets
- Cubic-bezier transitions: `cubic-bezier(.4, 0, .2, 1)` (standard ease-out)
- Duration range: 75ms to 1s

### What Makes It NOT Generic

1. **Single font, single weight** — all hierarchy through scale alone
2. **0.8 line-height on headlines** — letterforms overlap, creating density
3. **`clip-path` menu animation** — geometric reveal instead of slide/fade
4. **`mix-blend-difference`** — text inverts against images, no need for overlay layers
5. **Lenis integration** — buttery smooth scroll without custom library development
6. **calc() + vw typography** — mathematically precise fluid sizing

---

## Cross-Site Pattern Analysis

### What the Best Dark Sites Share

| Pattern | Unseen | Dogstudio | Locomotive | Aristide | Immersive Garden | Malvah |
|---------|--------|-----------|------------|----------|-----------------|--------|
| Pure black avoided | Yes (`#212121`) | Yes (warm near-black) | No (`#000`) | Yes (`#141414`) | Yes (`#030303`) | Partial (`#101010`) |
| Warm text color | Yes (`#EFDED9` cream) | Estimated cream | No (pure `#FFF`) | Yes (`#bac4b8` sage) | Partial (`#e8e8e8`) | No (pure `#FFF`) |
| Serif/Sans pairing | Yes (Saol + Neue Montreal) | No (single family) | Yes (Editorial New + Helvetica Now) | Unknown (custom fonts) | Yes (PSTimes + Helvetica Neue) | No (Neue Haas Grotesk only) |
| Sound design | Yes | Yes | No | Unknown | No | No |
| WebGL / 3D | Partial (CSS 3D + glb) | Yes (Three.js) | No | Likely (async loaded) | Yes (canvas layer) | No |
| Custom scroll | Custom drag | Custom | Locomotive Scroll | Unknown | Custom | Lenis |
| Per-section theming | Yes (bg_color per project) | Yes (3D dog transforms) | Yes (data-theme attrs) | Unknown | Yes (body class toggle) | Yes (data-theme attrs) |
| Loader/entry experience | Yes (3D cube) | Yes (3D dog) | Yes (logo animation) | Unknown (JS-rendered) | Yes (grid reveal) | Unknown |

### Dark Base Color Spectrum (Warmest to Coolest)

1. `#212121` — Unseen (warmest, most charcoal)
2. `#141414` — Aristide (warm dark)
3. `#101010` — Malvah (near-black, slight warmth)
4. `#030303` — Immersive Garden (near-black, neutral)
5. `#000000` — Locomotive (pure black, compensated with red accent)

### Typography Strategy Spectrum

| Strategy | Examples | Effect |
|----------|----------|--------|
| Serif + Sans pairing | Unseen, Locomotive, Immersive Garden | Editorial credibility, visual tension |
| Single family, scale hierarchy | Malvah, Dogstudio | Discipline, minimalism, confidence |
| Custom/proprietary fonts | Aristide | Uniqueness, can't be replicated |
| Viewport-relative sizing | Immersive Garden, Malvah | Cinematic scaling, responsive without breakpoints |
| Negative letter-spacing | Unseen (`-.025rem`) | Dense, confident, compressed energy |
| Disabled ligatures | Aristide | Mechanical precision, developer identity |

### The "Atmospheric Depth" Toolkit

| Technique | Who Uses It | Implementation |
|-----------|-------------|----------------|
| WebGL canvas background | Immersive Garden, Dogstudio | Full-viewport `<canvas>` behind content |
| CSS 3D transforms | Unseen | `perspective`, `rotateX/Y`, `translateZ` |
| Per-project parallax data | Unseen | `{x, y, z}` position objects on project items |
| `mix-blend-difference` | Malvah | Text inverts against underlying images |
| Backdrop blur | Malvah | `blur(64px)` on overlay elements |
| SVG mask animations | Immersive Garden | Shape-based transitions with `will-change: transform` |
| Video backgrounds | Locomotive | Responsive mobile/desktop video sources |
| Sound design | Unseen, Dogstudio | Audio toggle as first-class UI element |
| clip-path reveals | Malvah | Geometric animation on menu/section transitions |

---

## Implications for Version2.hr

### What to Adopt

1. **Warm charcoal base, not pure black.** Our `#141414`-range dark base (matching Aristide) or slightly warmer like Unseen's `#212121`. Never `#000000`.

2. **Per-section color theming.** A `data-theme` attribute system (like Locomotive/Malvah) that swaps palette per section. Our red `#991717` can anchor dark sections while warm off-whites breathe between them.

3. **Serif + Sans typography pairing.** Albert Sans (headlines) is sans-serif. Consider whether one display serif moment (like Locomotive's Editorial New or Unseen's Saol Display) could add editorial weight to key hero moments — or whether Albert Sans at weight 300 already achieves enough contrast against Manrope.

4. **Viewport-relative headline sizing.** Use `clamp()` or `calc() + vw` for hero headlines (like Immersive Garden's ~1.94vw / Malvah's `calc(30.3662px + 1.50235vw)`). This creates the cinematic scaling effect without breakpoint jumps.

5. **WebGL as atmosphere, not decoration.** R3F canvas as a background layer (like Immersive Garden), with styled static fallbacks per the existing plan. The 3D hero should feel like depth, not a tech demo.

6. **Lenis for scroll.** Already in our stack. Malvah validates this choice — Lenis provides the buttery feel without building a custom library.

7. **Loader as brand moment.** Unseen's 3D cube entry and Locomotive's logo animation prove that a well-crafted 2-3 second entry experience is expected at this tier, not indulgent.

8. **Negative letter-spacing on headlines.** Unseen's `-.025rem` creates that compressed, confident, premium density. Test with Albert Sans weight 300.

### What to Avoid

1. **Pure black `#000000` backgrounds.** Only Locomotive uses it, and they compensate with theatrical red. Our warm charcoal approach is more aligned with the majority.

2. **Sound design as default.** While Unseen and Dogstudio use it beautifully, it adds complexity without clear ROI for a web development company. Defer to Phase 7 if ever.

3. **Fully JS-rendered content.** Aristide's approach (zero HTML content) is hostile to SEO. Our approach is correct — HTML-first (pre-rendered via `generateStaticParams`), JS-enhanced.

4. **Single-weight typography.** Malvah's all-400-weight approach requires massive scale range to work. Our Albert Sans 300 + Manrope 400 two-font strategy provides more hierarchy tools.

5. **Cool blue-gray accents.** Malvah's `#c4ced3` is too cold for our brand. Our warm cream/off-white direction (closer to Unseen's `#EFDED9`) is better aligned.

---

## Reference Hex Values Quick-Sheet

For implementation reference — the exact values observed across all six sites:

```
DARK BASES (warmest to coolest):
#212121  Unseen — warm charcoal (RECOMMENDED RANGE)
#191919  Unseen projects — slightly deeper
#141414  Aristide — warm dark
#111111  Unseen projects — deep charcoal
#101010  Malvah — near-black
#0a0a0a  Unseen/Dogstudio — very deep
#030303  Immersive Garden — near-black neutral
#000000  Locomotive — pure black (NOT recommended)

LIGHT BASES:
#EFDED9  Unseen "Bizarre" — warm cream (CLOSEST TO OUR TARGET)
#e8e8e8  Immersive Garden — warm light gray
#e8e2de  Unseen — earthy off-white
#e6e6e6  Malvah — neutral off-white
#f2f4f4  Unseen — cool off-white
#FFFFFF  Locomotive/Malvah — pure white

TEXT ON DARK:
#EFDED9  Unseen — warm cream
#e8e8e8  Immersive Garden — warm gray
#bac4b8  Aristide — sage green (DISTINCTIVE)
#FFFFFF  Locomotive/Malvah — pure white

ACCENTS:
#991717  Version2 brand red (our own)
#DA382E  Locomotive — warm red (similar family)
#FF4E1B  Unseen — orange (high energy)
#90ee90  Immersive Garden — light green (functional)
#c4ced3  Malvah — blue-gray (cool)
#535061  Unseen "Scarpa" — purple-gray (muted)

EASING CURVES:
cubic-bezier(.34, 1.56, .64, 1)  Unseen — bouncy overshoot
cubic-bezier(0.215, 0.61, 0.355, 1)  Locomotive — smooth ease-out
cubic-bezier(.4, 0, .2, 1)  Malvah — standard ease-out
```

---

*Sources: Direct site markup analysis via fetch, [Fonts In Use](https://fontsinuse.com/uses/61459/locomotive-portfolio-website-and-visual-ident), [ilovecreatives](https://ilovecreatives.com/internet-gem-websites/unseen-studio), [Communication Arts](https://www.commarts.com/webpicks/dogstudio), [Pangram Pangram](https://pangrampangram.com/products/neue-montreal), [Awwwards](https://www.awwwards.com/annual-awards-2025/)*
