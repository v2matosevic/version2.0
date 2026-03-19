# UI Primitive Components

> Source of truth: `docs/brand-discovery.md`. Design tokens: [../design/](../design/). Page-level specs: [../pages/](../pages/).

---

### Button
- **Sizes:** sm (`padding: 8px 16px`), md (`padding: 12px 24px`), lg (`padding: 16px 32px`).
- **Border-radius:** `rounded-lg`.
- **Font:** Manrope 600.
- **Variants:**
  - Primary: `bg-brand-red text-white`. Hover: `bg-brand-red-light`. Active: `bg-brand-red-dark`.
  - Secondary: `border border-line text-foreground`. Hover: `border-brand-red`.
  - Ghost: no border, no background, `text-muted`. Hover: `text-foreground`.
- **States:**
  - Loading: spinner icon replaces label text. Button width preserved (`min-width` set on mount). Button disabled during loading.
  - Disabled: `opacity-50 cursor-not-allowed`. No hover effects.
  - Focus: `ring-2 ring-brand-red/40 ring-offset-2 ring-offset-base` (visible focus ring for keyboard users).

### Card
- **Default:** `bg-raised border border-line rounded-xl`.
- **Elevated:** adds `shadow-md`.
- **Bordered:** `border-2` (heavier border for emphasis).
- **Interactive:** `hover:translate-y-[-2px] hover:border-brand-red/30 transition-all duration-200`. Used for blog cards, project cards, service cards.

### Badge
Small labels for categories, tags, status. `text-sm`, `px-2 py-0.5`, `rounded-md`. Manrope 600.

### Input / Textarea
- **Base:** `bg-sunken border border-line rounded-lg px-4 py-3`. Manrope 400.
- **Focus:** `border-brand-red ring-1 ring-brand-red/20`.
- **Error:** `border-red-500`. Error message text below in red (`text-sm text-red-500 mt-1`).
- **Label:** Manrope 600, `text-sm`, `mb-1.5` above input.
- **Hint text:** `text-muted text-sm mt-1` (below input, for guidance — hidden when error shows).

### Select
Same base styling as Input. Custom dropdown panel: `bg-raised border border-line rounded-lg shadow-md`. Options: `px-4 py-2 hover:bg-sunken`.

### Modal
- **Size:** `max-w-lg`, centered in viewport.
- **Style:** `bg-raised rounded-xl shadow-lg`, padding `24px`.
- **Backdrop:** `rgba(0,0,0,0.6)` with `backdrop-blur(4px)`.
- **Entry:** `scale(0.95) opacity(0)` to `scale(1) opacity(1)`, 200ms, ease-out.
- **Exit:** reverse, 150ms, ease-in.
- **ARIA/Keyboard:**
  - Container: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the modal title.
  - Focus trap: Tab cycles within modal only.
  - Escape closes modal and returns focus to the element that triggered it.

### Tabs
Content section switching (e.g., project details, service pages).
- **ARIA/Keyboard:**
  - Tab list: `role="tablist"`.
  - Each tab: `role="tab"`, `aria-selected="true|false"`, `aria-controls="tabpanel-{id}"`.
  - Each panel: `role="tabpanel"`, `aria-labelledby="tab-{id}"`.
  - Arrow Left/Right moves between tabs. Home/End jumps to first/last tab.

### Accordion
Expandable sections for FAQ and service details. See Service Page FAQ for full ARIA spec.

### Language Switcher
EN / HR / DE toggle. In menu and footer, NOT in the header bar.
- **ARIA/Keyboard:**
  - Container: `role="radiogroup"`, `aria-label="Language"`.
  - Each option: `role="radio"`, `aria-checked="true|false"`.
  - Arrow keys move between options. Enter/Space selects.

### Blog Search
Client-side fuzzy search. Input with dropdown results.
- **ARIA/Keyboard:**
  - Input: `role="combobox"`, `aria-expanded="true|false"` (true when results visible), `aria-autocomplete="list"`, `aria-controls="search-results"`.
  - Results list: `role="listbox"`, `id="search-results"`.
  - Each result: `role="option"`.
  - `aria-activedescendant` on the input tracks the currently highlighted result.
  - Arrow Up/Down navigates results. Enter selects. Escape closes results.

### Custom Cursor
Desktop only. Minimalistic dot/circle. State changes on hover (grows, morphs, shows contextual hint like "View" or "Drag"). Hidden on touch devices (`pointer: coarse` media query).

---

## Removed (vs. old site)

- **Stats/Numbers section** -- brand discovery says no generic stats on homepage.
- **Previous/Next blog navigation** -- not in the new blog post spec.
- **Dropdown nav in header** -- replaced by sidebar menu panel.
- **Services grid with icons** -- replaced by bold statement teasers.
- **Blog tease on homepage** -- blog is SEO/traffic, not homepage content.
- **Tech stack logo grid** -- specific tech mentioned in case studies instead.

## Related Files
- [layout.md](layout.md) — Layout components (Header, Footer, Menu, PageTransition)
- [sections.md](sections.md) — Page section components (Hero, Services Teaser, etc.)
- [features.md](features.md) — Feature components (FAB, AI Chat, Pricing Tool, etc.)
- [registry.md](registry.md) — Complete component registry with file paths and props
- [../pages/_globals.md](../pages/_globals.md) — Detailed visual specs for global components
