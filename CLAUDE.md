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

**Status: All functionality built. Design phase next. Still on localhost — not deployed yet.**

### Phases 1-5 — COMPLETE (2026-03-20)
- **Sprint 1.1-1.3:** Project scaffold, design system, data layer
- **Sprint 2.1-2.5:** Layout shell, all content pages, blog system, legal pages, error pages
- **Sprint 3.1:** SEO infrastructure (meta, JSON-LD, canonical, hreflang, OG)
- **Sprint 4.1-4.3:** Animations (GSAP ScrollTrigger, R3F 3D hero, pricing wizard, FAB)
- **Sprint 5.1-5.7:** Backend (SQLite + Drizzle, forms, booking, CMS, AI chat, analytics, parcel tracking)

### Admin Dashboard — COMPLETE
10-page admin dashboard with authentication. CMS, analytics, orders, bookings, chat conversations, build management.

### Security Hardening — COMPLETE
Timing-safe token comparison, rate limiting on all endpoints, consolidated auth middleware, no dev key fallback in production.

### Feature Quality Pass — COMPLETE
- Z.AI GLM-4.5 with function calling for AI chat
- RAG pipeline for website knowledge (3,342 chunks)
- Carrier scrapers for parcel tracking (HP, GLS, DPD)
- Professional branded email templates via Zoho SMTP
- Blog post redirects (old WordPress slugs)
- 103 blog posts rewritten in HR and DE (206 files)
- 8 real Google Maps testimonials replacing placeholders
- 6 portfolio case studies documented with screenshots
- 7 missing page translations created

### Current Task — Design Phase
Go page by page to make each section visually premium, following `docs/design/` specs and `tasks/design-prompts.md`. Screenshot self-correction workflow.

### Key Architecture Facts
- **Standalone mode** (`output: 'standalone'`), NOT static export
- **No /en/ in URLs** — English is default at root, /hr/ and /de/ for others
- **Middleware** handles i18n routing + Accept-Language detection
- **43+ API routes** at `src/app/api/` — no separate backend
- **428+ static pages** generated at build time
- **next/image** optimization works natively
- **ISR** available for CMS-managed content
- **Server Actions** available for form mutations
- **730 redirects** in `next.config.ts` `redirects()` — data in `tasks/redirect-map.md`
- **Email:** Zoho SMTP via nodemailer
- **AI Chat:** Z.AI GLM-4.5 with function calling, RAG context
- **Database:** SQLite + Drizzle ORM (WAL mode)
- **Specs:** `docs/backend/api-contracts.md`, `docs/features/form-validation.md`, `docs/features/parcel-tracking.md`, `docs/backend/cron-jobs.md`
