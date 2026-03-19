# Blog Metadata Cleanup — HR/DE Files

**Created:** 2026-03-06
**Status:** Pending (required before or during Layer 2 build)
**Scope:** 103 hr.md files + 103 de.md files = 206 files

## The Problem

English blog posts went through 4 rewrite passes. Croatian and German files are WordPress originals with stale metadata that will break the build or produce incorrect output.

## Issues by Severity

### Critical (will break build or produce wrong data)

**1. Old category values**

HR files use Croatian WordPress categories. DE files use German WordPress categories. The build expects kebab-case canonical values.

| Old Value (HR) | Old Value (DE) | Correct Value |
|---|---|---|
| `Web Dizajn` | `Web-Design` | Match the EN file's category |
| `Digitalni Marketing` | `Digitales Marketing` | Match the EN file's category |
| `Drustvene Mreze` | `Soziale Netzwerke` | N/A (dropped posts only) |
| `Blog` | `Blog` | Match the EN file's category |
| `Referenca` | `Referenz` | N/A (dropped posts only) |

**Fix:** For each hr.md/de.md in the 103 KEEP list, copy the `category` value from the corresponding en.md file.

**2. Legacy tag values**

HR/DE files have WordPress-era tags in their respective languages. The build expects the canonical 17 English Title Case tags.

Common legacy tags found:
- HR: `Blog`, `Web Dizajn`, `Responzivnost`, `Analitika`, `Internet Prisutnost`, `ChatGPT`, `Web Shop`, `Brending`, `Version2 Produkcija`, `SEO`
- DE: `Blog`, `Web-Design`, `Empfänglichkeit`, `Analytik`, `Internetpräsenz`, `Optimierung`, `Branding`, `SEO`, `Version2-Produktion`

**Fix:** For each hr.md/de.md in the 103 KEEP list, copy the `tags` array from the corresponding en.md file.

### Important (affects quality but doesn't break build)

**3. Stale `lastModified` dates**

~93% of HR files and ~88% of DE files have `lastModified` dates from 2023. The EN files were updated to `2026-02-25`.

**Fix:** For each hr.md/de.md, set `lastModified` to `2026-02-25` (matching EN, since the metadata is being standardized even though the body content hasn't been rewritten yet).

**4. German formal address ("Sie" instead of "du")**

Per the resolved decision in `docs/decisions.md`, German copy uses informal "du" address. All DE blog posts use formal "Sie" from the WordPress era. This is a body content issue, not a metadata issue — documented here for completeness but NOT fixed by the metadata script.

### Low Priority (cosmetic)

**5. Old `shared.tags` in products.json**

Was `["Gotovi Dizajni", "NFC"]`, now fixed to `["NFC", "Digital Business Card"]` in the products.json update (2026-03-06).

## Cleanup Script Specification

A Node.js script to run ONCE before or during the Layer 2 build.

### Input
- `tasks/blog-curation-manifest.md` → parse KEEP list (103 slugs)
- `content/blog/[slug]/en.md` → source of truth for category + tags
- `content/blog/[slug]/hr.md` → target for metadata sync
- `content/blog/[slug]/de.md` → target for metadata sync

### Logic (per slug in KEEP list)

```
1. Read en.md frontmatter → extract: category, tags
2. Read hr.md frontmatter → replace: category, tags, lastModified
3. Read de.md frontmatter → replace: category, tags, lastModified
4. Write updated hr.md (preserve body content unchanged)
5. Write updated de.md (preserve body content unchanged)
```

### Fields to sync from EN → HR/DE

| Field | Source | Notes |
|---|---|---|
| `category` | en.md | Exact copy (kebab-case) |
| `tags` | en.md | Exact copy (English Title Case array) |
| `lastModified` | Set to `"2026-02-25"` | Standardize across all languages |

### Fields to NOT touch

| Field | Reason |
|---|---|
| `title` | Language-specific |
| `slug` | Language-specific |
| `originalUrl` | Historical reference |
| `language` | Must remain `"hr"` / `"de"` |
| `translations` | Already correct per audit |
| `date` | Original publication date, must not change |
| `author` | Always "Version2" |
| `excerpt` | Language-specific |
| `featuredImage` | Same across languages |
| Body content | Not touched by this script |

### Validation

After running, verify:
- All 103 hr.md files have kebab-case categories from the canonical 6
- All 103 de.md files have kebab-case categories from the canonical 6
- All 103 hr.md + de.md files have `lastModified: "2026-02-25"`
- All tags are from the canonical 17 set
- No file has `category: "Web Dizajn"` or any non-canonical value
- Body content is unchanged (hash check)

### Expected Output

```
Processed 103 hr.md files:
  - 95 categories updated
  - 100 tag arrays updated
  - 95 lastModified dates updated
  - 8 files already correct (no changes)

Processed 103 de.md files:
  - 97 categories updated
  - 100 tag arrays updated
  - 97 lastModified dates updated
  - 6 files already correct (no changes)
```

## When to Run

- **Option A (recommended):** Run as part of Sprint 1.3 (Layer 2: Data Layer) when the markdown pipeline is being built. The script can be a one-time migration in `scripts/migrate-blog-metadata.ts`.
- **Option B:** Run manually before any build that reads blog content.

## Relationship to HR/DE Content Rewrite

This script fixes METADATA only. The actual HR/DE body content rewrite (matching EN quality, adding internal links, fixing voice/tone) is a separate, larger effort tracked in `docs/blog-content-strategy.md` Section 11.

The metadata cleanup must happen first because:
1. The build pipeline needs correct categories to generate filter pills and counts
2. The search index needs canonical tags for search weighting
3. Incorrect categories would produce wrong Related Posts suggestions
