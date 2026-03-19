# AI Design Prompts Research

Raw research findings from community sources. See `tasks/design-prompts.md` for the refined, project-specific versions.

---

## Sources Index

| # | Source | Tool | Key Technique |
|---|--------|------|---------------|
| 1 | [Anthropic Cookbook - Frontend Aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) | Claude | The "distilled aesthetics prompt" — system prompt block that eliminates AI slop |
| 2 | [Anthropic Frontend Design Skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) | Claude Code | Official plugin: forces aesthetic direction selection before code |
| 3 | [Claude Code Frontend Design Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit) | Claude Code | Master catalog of CLAUDE.md theme presets, community skills |
| 4 | [5 Claude Code Hacks (Mejba Ahmed)](https://www.mejba.me/blog/claude-code-professional-website-hacks) | Claude Code | Screenshot loop, real-site blueprints, component library pulls |
| 5 | [300-Line README Approach (Raduan)](https://raduan.xyz/blog/claude-code-for-landing) | Claude Code | Persistent design system doc + section-by-section building |
| 6 | [Vercel v0 Prompting Guide](https://vercel.com/blog/how-to-prompt-v0) | v0 | Three-part framework: surface + user + moment |
| 7 | [Bolt.new Prompt Keywords](https://bolt.new/blog/10-prompt-keywords-to-make-your-app-look-fire) | Bolt | 10 vibe keywords, 5-step prompt structure |
| 8 | [Lovable Prompting Bible](https://docs.lovable.dev/prompting/prompting-one) | Lovable | Section-based prompts, three-word aesthetic directions |
| 9 | [GSD Framework for Designers](https://nervegna.substack.com/p/claude-code-for-designers-a-practical) | Claude Code | Designer-first questions, XML-structured context files |
| 10 | [Awesome Cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | Cursor | .cursorrules for Next.js + Tailwind + Framer Motion stack |
| 11 | [Design System Generator](https://github.com/mustafakendiguzel/claude-code-ui-agents) | Claude Code | Fill-in-the-blanks template for complete design systems |
| 12 | [Two-File System (Ottmann)](https://marioottmann.com/articles/how-to-make-claude-code-lovable) | Claude Code | CLAUDE.md + design_brief.md separation |
| 13 | [Builder.io 11 Tips](https://www.builder.io/blog/prompting-tips) | Any | Screenshots for self-correction, Figma MCP, build in real stack |
| 14 | [Justin Wetch Improvements](https://www.justinwetch.com/blog/improvingclaudefrontend) | Claude | 75% win rate over Anthropic's default by restructuring prompts |

---

## The 5 Meta-Principles (Across All Sources)

1. **Constrain the design system before coding** — Config files (CLAUDE.md, .cursorrules, design_brief.md) outperform conversational prompts. Specify exact hex colors, font names, weight ranges, spacing scales, and theme upfront.

2. **Name the aesthetic explicitly** — "Dark OLED Luxury," "Brutalist," "Editorial," "Retro-Futuristic." AI agents perform dramatically better with a committed direction vs "make it look good."

3. **Ban the defaults explicitly** — Every high-performing system says "NEVER use Inter, Roboto, Arial" and "NEVER use purple gradients on white." Without bans, agents converge on the same generic output.

4. **Use visual references over verbal descriptions** — Screenshots of admired sites, Figma extractions, pasted reference code, and screenshot-loop self-correction all outperform describing what you want in words.

5. **Build section-by-section, not page-at-once** — Every tool produces better results when building individual sections with specific constraints than when generating an entire page.

---

## Key Prompts (Raw)

### Anthropic's Distilled Aesthetics Prompt

```
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,
this creates what users call the "AI slop" aesthetic. Avoid this: make creative,
distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic
fonts like Arial and Inter; opt instead for distinctive choices that elevate the
frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency.
Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only
solutions for HTML. Use Motion library for React when available. Focus on high-impact
moments: one well-orchestrated page load with staggered reveals (animation-delay)
creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer
CSS gradients, use geometric patterns, or add contextual effects that match the
overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
</frontend_aesthetics>
```

### Anthropic's Official Skill (Full)

```
Before coding, understand the context and commit to a BOLD aesthetic direction:
- Purpose: What problem does this interface solve? Who uses it?
- Tone: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic,
  organic/natural, luxury/refined, playful/toy-like, editorial/magazine,
  brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
- Constraints: Technical requirements (framework, performance, accessibility)
- Differentiation: What makes this UNFORGETTABLE?
```

### Mejba's Screenshot Loop

Take screenshots during development. Feed them back to the AI. It self-corrects visual issues. Adds 15-30 seconds per cycle, eliminates 10+ minutes of manual revision.

### Mejba's Reference Blueprint

```
Build the hero section for our site. Match the visual style and spacing philosophy
of the reference screenshot in brand_assets/inspiration/reference-hero.png.
Use our brand colors from CLAUDE.md instead of their colors.
```

### v0 Three-Part Framework

```
Build [product surface: components, data, actions].
Used by [who],
in [what moment],
to [what decision or outcome].
Constraints:
- platform / device
- visual tone
- layout assumptions
```

### Lovable's Section-Based Approach

```
Design a landing page hero that feels premium and cinematic. Use layered depth,
translucent surfaces, soft motion blur, and dramatic contrast between headline
and background.
```

### Wetch's Key Improvements

- Replace "pick an extreme" with "commit to a distinct direction"
- Add NEVER/INSTEAD pairing (don't just ban, provide the alternative)
- Restructure from subjective ("beautiful") to actionable ("Display type must be expressive; body text legible")
- Remove cross-conversation assumptions ("No design should be the same")

---

## Community Skills Worth Evaluating

| Skill | Install | What It Does |
|-------|---------|-------------|
| `anthropic/frontend-design` | `claude plugin add anthropic/frontend-design` | Official: aesthetic direction before code |
| `freshtechbro/claudedesignskills` | `claude plugin add freshtechbro/claudedesignskills` | 23 skills: GSAP, Framer Motion, React Spring, Three.js, R3F |
| `jezweb/motion` | `claude plugin add jezweb/motion` | Framer Motion with bundle optimization |
| `phrazzld/design-tokens` | `claude plugin add phrazzld/design-tokens` | Single `--brand-hue` controls entire palette via OKLCH |
| `Leonxlnx/taste-skill` | `claude plugin add Leonxlnx/taste-skill` | Adjustable variance/motion/density knobs |
