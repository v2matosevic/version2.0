# Figma MCP Research

Research conducted 2026-02-27. Evaluation for Version2.hr project.

**Verdict: Skip for now.** Our workflow (brand docs + design system + Claude Code) is more direct than creating Figma files to feed through MCP. Revisit if a designer joins.

---

## Two Products Exist

### Official Figma MCP Server (by Figma)

- **Remote:** `https://mcp.figma.com/mcp` — link-based, OAuth auth
- **Desktop:** `http://127.0.0.1:3845/mcp` — selection-based, requires Figma desktop app

### Framelink (Community)

- Repo: [github.com/GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) (13.3k stars)
- NPM: `figma-developer-mcp`
- Uses personal access token, free, 2 tools: `get_figma_data` + `download_figma_images`

---

## Setup (If Needed Later)

### Official Remote (Recommended)

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Then: `/mcp` -> figma -> Authenticate -> Allow Access in browser.

### Windows/WSL Gotcha

Desktop MCP binds to `127.0.0.1`. If running Claude Code in WSL:

```ini
# %USERPROFILE%\.wslconfig
[wsl2]
networkingMode = mirrored
```

Then `wsl --shutdown` from PowerShell.

### Critical: Transport Type

Must use `http` transport (not `sse`). Endpoint must be `/mcp` (not `/sse`). Old configs fail silently.

---

## What It Can Do

| Tool | What | Plan Required |
|------|------|---------------|
| `get_design_context` | React + Tailwind code from selected layers | All |
| `get_variable_defs` | Design tokens (colors, spacing, typography) | All |
| `get_screenshot` | Visual screenshot of frames | All |
| `get_metadata` | Sparse XML of layer structure | All |
| `create_design_system_rules` | Generate rules file for AI agent | All |
| `get_code_connect_map` | Map Figma nodes to codebase components | Org/Enterprise only |
| `generate_figma_design` | Code -> Figma (reverse flow) | Remote only, NOT in CLI |

## What It Cannot Do

- **No 3D/WebGL** — Figma has zero concept of R3F, Three.js, shaders
- **No animations** — GSAP timelines, scroll triggers, page transitions are outside scope
- **No scroll behavior** — Lenis, custom scroll, parallax
- **No custom cursor, sound** — runtime interactions
- **No dark theme "feel"** — can extract values but misses atmospheric nuance

## Rate Limits

| Plan | Daily Limit |
|------|-------------|
| Starter/Free | **6 calls/month** (unusable) |
| Pro (Dev/Full seat) | 200/day |
| Organization | 200/day |
| Enterprise | 600/day |

## Real-World Quality

- Best case: "nearly pixel-perfect in five minutes" (simple components, well-structured Figma)
- Worst case: "85-90% wrong styling" (complex layouts, unstructured files)
- Consensus: treat like a junior engineer. Good for scaffolding, not for final code.
- Large frames can overflow token limits (350k+ tokens). Use `get_metadata` for large selections.

---

## Why Skip for Version2.hr

1. **No designer handing off Figma files.** We're building from brand docs + design system specs directly in code.
2. **Our interaction stack (R3F, GSAP, Framer Motion, Lenis) is entirely outside MCP's scope.** The most important parts of our site cannot come from Figma.
3. **Design system is already documented.** Colors, typography, spacing all defined in `docs/design/`.
4. **Screenshot + prompt is faster** for the rare Figma reference. Zero setup, immediate results.
5. **Creating polished Figma files just to feed MCP is backwards** when we can design directly in code.

## When to Reconsider

- A designer joins and produces polished Figma components
- Client projects need Figma-to-code workflows (service offering)
- Complete Figma design system exists with variables and auto layout

---

## Alternatives Ranked (For Our Use Case)

| Approach | Setup | Value |
|----------|-------|-------|
| Screenshot + prompt | 0 min | High — immediate, no overhead |
| Design tokens JSON export (Figma plugin) | 10 min | High — exact values |
| Official Remote MCP | 2 min | Medium — only if Figma files exist |
| Chrome DevTools + Figma | 5 min | Low — experimental |
| Framelink | 3 min | Low — fewer tools than official |
