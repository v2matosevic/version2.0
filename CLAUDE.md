# CLAUDE.md

## Project Context

Next.js 16 + TypeScript (strict) + Tailwind CSS v4 — Next.js standalone mode deployed to Hostinger VPS.
Content sourced from `content/` directory. Multi-language (hr/en/de). 103 curated blog posts (of 190 total).
Interaction stack: R3F v9 (3D/WebGL), GSAP + @gsap/react (animation), Lenis (scroll), Motion v12 (transitions, import from `motion/react`).
Backend consolidated into Next.js API routes and Server Actions (CMS, forms, AI chat, booking, analytics, parcel tracking).
Subdomain folders (`app/`, `qr/`, `web/`) on the VPS must never be touched. Each runs as a separate service behind Nginx.

## Code Like a Senior Engineer

Prioritize readability over cleverness. Write code a new team member could understand on day one.

## Frontend Aesthetics

Every component must feel intentionally designed for a premium web development studio. The site IS the portfolio.

**Aesthetic direction: Dark Cinematic Premium.** Enforced on every component.

- Dark-first. Warm charcoal backgrounds (not pure black). Breathing lighter sections for rhythm.
- Typography carries the design. Albert Sans Light 300 headlines — editorial, large, commanding. Manrope 400 body — crisp, readable.
- Red (#991717) is the only accent. Surgical, not splashed. Shades: #cc2323 hover, #7a1212 pressed.
- Motion is narrative. One orchestrated entrance per section via GSAP ScrollTrigger. Per-character SplitText for headlines. Motion page transitions. Not scattered micro-interactions.
- Depth and atmosphere. Backgrounds are never flat — subtle gradients, grain, layered transparencies.

**NEVER:** Inter/Roboto/system fonts. Purple gradients. Generic card grids. Centered-text-on-gradient heroes. Uniform rounded-2xl everywhere. Drop shadows without purpose. Pure white backgrounds. Placeholder copy. Components that could belong to any brand.

**INSTEAD:** Albert Sans 300 vs 700 extremes. 3x+ size jumps between hierarchy levels. Asymmetric layouts. Grid-breaking elements. Generous negative space. Warm charcoal dark / warm cream light. CSS gradient + noise/grain atmospheres. Staggered animation-delay (100ms between elements, 30ms per character).

See `tasks/design-prompts.md` for section-specific build prompts and the screenshot self-correction workflow.

## Commands

- Dev: `npm run dev`
- Build: `npm run build` (outputs to `.next/standalone/`)
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`

## Code Architecture

- **Small, focused files.** No file should exceed ~150 lines. If it does, refactor immediately.
- **Single Responsibility.** Every file, function, and class does one thing well.
- **Extract early.** When a function grows beyond ~30 lines, break it into helpers.
- **Flat over nested.** Prefer early returns and guard clauses over deep nesting.
- **Collocate related code.** Group by feature/domain, not by type.

## File & Folder Structure

- Use index files only for public API re-exports, never for logic.
- Name files descriptively: `parse-config.ts` not `utils.ts`, `validate-email.ts` not `helpers.ts`.
- Keep shared utilities in a `lib/` directory — but only if used by 3+ consumers.
- Constants, types, and config live in dedicated files, never inline in business logic.
- Use `@/` path aliases for all imports. Never use relative imports above 2 levels.

## Code Quality Standards

- **No `any` types** — use `unknown` + type narrowing if the type is truly unknown.
- **Named exports only** — no default exports (improves refactoring and auto-imports).
- **Explicit return types** on public functions.
- **No magic numbers/strings** — extract to named constants.
- **Error handling at boundaries** — validate inputs at entry points, trust data internally.
- **No dead code.** Delete it; git remembers.
- **No commented-out code.** Same reason.

## Before You Act

IMPORTANT: Follow these checks to prevent common mistakes:

- **Before editing a file** — read it first. Never assume contents.
- **Before adding a dependency** — check `package.json` for something that already serves the purpose.
- **Before creating a component/utility** — search the codebase for existing ones.
- **Before using a library API** — verify it exists via Context7 or `--help`. Do not guess from training data.
- **Before creating a file** — follow the patterns of existing similar files in the project.

## Autonomy

- When the task is clear, proceed. Only ask clarifying questions for genuine ambiguity.
- If a linter or type error appears after your change, fix it immediately without asking.
- If a test fails after your change, investigate and fix the root cause before reporting.
- Follow existing patterns in the codebase — don't ask which pattern to use if examples exist.
- Run verification (type check + lint) after every meaningful change without being asked.

## MCP Tooling

Use the right tool for the job:

- **Context7** — Look up framework/library docs before guessing APIs.
- **Sequential Thinking** — Use for architectural decisions or multi-step planning before writing code.
- **Fetch** — Pull live pages to compare, verify deployed output, parse HTML.
- **Playwright / Chrome** — Screenshots, visual regression, DOM inspection, responsive testing.
- **Memory** — Store cross-session decisions, patterns, and project knowledge.
- **Figma** — Design-to-code when mockups are provided.
- **Hostinger** — Server management and deployment operations.

### Session Startup

1. Check `tasks/todo.md` for current progress.
2. Check `tasks/lessons.md` for known pitfalls.
3. Query Memory MCP for cross-session decisions.
4. For UI work: review `tasks/design-prompts.md` for section-specific build prompts.

### Documentation Maintenance

- When a decision is made, update `docs/decisions.md` (move from Open to Resolved).
- When implementation differs from a doc's spec, update that doc.
- When new constraints or edge cases are discovered, add them to the relevant doc.
- Reference `docs/README.md` for the full doc index.

## Workflow

### 1. Plan Before Building

- For any task with 3+ steps or architectural decisions, write a plan to `tasks/todo.md`.
- Use Sequential Thinking for complex decisions before writing any code.
- If something goes sideways, STOP and re-plan. Don't push through a bad approach.

### 2. Implementation

- Make the smallest possible change that solves the problem.
- Touch only what's necessary. Unrelated refactors go in separate commits.
- Build foundations first: types → data layer → logic → UI (bottom-up).
- Commit after each meaningful unit of work.

### 3. Verification Before Done

- IMPORTANT: Never mark a task complete without proving it works.
- Run `npx tsc --noEmit` and `npm run lint` after every implementation.
- For standalone build: `npm run build` must succeed — verify `.next/standalone/` is generated and the server starts cleanly.
- When fixing a bug, write a failing test first, then fix, then verify.

### 4. Self-Improvement

- After ANY correction: update `tasks/lessons.md` with the pattern.
- Write rules that prevent the same mistake twice.

## Git Conventions

- Commit messages follow Conventional Commits: `type(scope): description`
- Types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`
- Never commit `.env` files, secrets, or API keys.
- Only commit when explicitly asked.

## Bug Fixing

- Given a bug report: just fix it. Don't ask for hand-holding.
- Read logs, find the error, trace the root cause, resolve it.
- No band-aids. Find and fix the actual root cause.

## What NOT to Do

- **No god files.** Break apart any file doing multiple unrelated things.
- **No premature abstraction.** Don't DRY code until you see the pattern 3 times.
- **No over-engineering.** Simple, obvious fixes don't need design patterns.
- **No sloppy naming.** Names are documentation. `data`, `info`, `temp`, `stuff` are banned.
- **No ignoring linter/type errors.** Fix them, don't suppress them.
- **No hallucinating APIs.** Verify via Context7 or docs when uncertain.
- **No new dependencies without checking** if an existing one covers the need.

## Current Build Phase

**Status: Ready to build. All planning complete. 39/39 decisions resolved.**

### Sprint 1.1 — Project Scaffold
Create Next.js 16 project with all dependencies, configs, and directory structure.
- Spec: `tasks/todo.md` Sprint 1.1 section
- Config details: `docs/setup/config.md`
- Dependencies: `docs/setup/dependencies.md`
- Verify: `npm run dev` starts, `npm run build` succeeds, `npx tsc --noEmit` clean

### Sprint 1.2 — Design System
Tailwind v4 tokens, fonts (Albert Sans + Manrope via next/font), dark/light mode, UI primitives.
- Color tokens: `docs/design/colors-tokens.md`
- Typography: `docs/design/typography.md`
- Layout/spacing: `docs/design/layout-spacing.md`
- Animation: `docs/design/animation.md`
- Components: `docs/components/ui-primitives.md`
- Verify: `/dev/` kitchen-sink page renders all tokens and primitives in both modes

### Sprint 1.3 — Data Layer + i18n
Markdown parser, content loaders, i18n middleware, build-time generators.
- i18n: `docs/i18n.md` (English = no prefix, /hr/, /de/)
- Blog system: `docs/blog-content-strategy.md`
- Build generators: sitemap, robots, search index
- ISR strategy: `docs/setup/isr-strategy.md`
- Verify: All 103 posts + 17 pages load. Build produces sitemap.xml, robots.txt

### Key Architecture Facts
- **Standalone mode** (`output: 'standalone'`), NOT static export
- **No /en/ in URLs** — English is default at root, /hr/ and /de/ for others
- **Middleware** handles i18n routing + Accept-Language detection
- **API routes** at `src/app/api/` — no separate backend
- **next/image** optimization works natively
- **ISR** available for CMS-managed content
- **Server Actions** available for form mutations
- **730 redirects** in `next.config.ts` `redirects()` — data in `tasks/redirect-map.md`
