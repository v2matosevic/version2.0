# Portfolio Case Study Research Process

> Reusable workflow for documenting new portfolio projects. Established 2026-03-19.

## Overview

Each portfolio project gets: screenshots, a 3-language case study (en/hr/de), and entries in the portfolio data system. The process takes ~15-20 minutes per project.

## Folder Structure

```
content/portfolio/
  [project-slug]/
    en.md          # English case study
    hr.md          # Croatian case study
    de.md          # German case study
  screenshots/
    [project-slug]/
      homepage-full.png
      [page-name]-full.png
      ...
```

## Step 1: Create Folders

```
mkdir -p content/portfolio/screenshots/[project-slug]
mkdir -p content/portfolio/[project-slug]
```

## Step 2: Analyze the Website

Two parallel approaches:

### A. WebFetch (content extraction)
Fetch the homepage URL and ask for:
- Full page structure (every section)
- Navigation links and site map
- Design details (colors, fonts, layout)
- All text content (headlines, descriptions, CTAs)
- Footer content
- Languages available
- Special features
- Tech stack hints
- Overall aesthetic

### B. Playwright (visual capture + tech detection)
1. Navigate to the site with `networkidle`
2. Set viewport to 1440x900
3. Accept cookie banners if present
4. Detect tech stack via JavaScript evaluation:
   - Check for `__NEXT_DATA__` (Next.js)
   - Check for `script[src*="_next"]` (Next.js)
   - Check for Tailwind classes
   - Check `meta[name="generator"]`
   - List script sources

## Step 3: Capture Screenshots

**Critical: Always scroll the full page first to trigger lazy-loaded images.**

```javascript
async (page) => {
  page.setDefaultTimeout(30000);

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2500);

    // MUST scroll to trigger lazy images
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < pageHeight; y += 400) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(350);
    }

    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);

    await page.screenshot({
      fullPage: true,
      path: `${screenshotDir}/${p.name}`,
      scale: 'css',
      type: 'png',
      timeout: 20000
    });
  }
}
```

### Which pages to capture:
- **Always:** Homepage
- **If exists:** Key feature pages (models, services, portfolio, blog listing)
- **If exists:** A detail page (single product, single article, single listing)
- **Bonus:** Dark mode variant, different language version
- **For simple sites:** Just the one page + any secondary pages (attractions, etc.)

### Common gotchas:
- Villa/detail page URLs may differ from what you expect — extract actual links from the homepage first
- Cookie banners block content — accept them before capturing
- Full-page screenshots can timeout on heavy pages — set `timeout: 20000`
- Some sites need `page.setDefaultTimeout(30000)` for Playwright operations
- Check file sizes after capture — tiny files (< 50KB) usually mean a 404 or failed load

## Step 4: Ask the Owner

After analyzing, ask about:
1. **Year completed**
2. **Tech stack** (if not detectable)
3. **Services provided** — design, dev, content, photography, etc.
4. **Backend/CMS details** — what can the admin do?
5. **Any metrics** — traffic, conversions, speed scores
6. **Client testimonial** — direct quote if available
7. **Special features** worth highlighting

## Step 5: Write Case Studies

### Frontmatter schema:
```yaml
---
slug: project-slug
title: "Project Name — One-Line Description"
client: "Client Name"
industry: "Industry Category"
year: 2026
services:
  - "Web Design"
  - "Frontend Development"
  - "Backend Development"
  # ... as applicable
tech:
  - "Next.js"
  - "React"
  # ... actual stack
url: "https://example.com"
featured: true/false
grid_size: "large" or "standard"
hero_image: "/portfolio/screenshots/[slug]/homepage-full.png"
summary: "One-sentence project summary."
testimonial:  # optional
  quote: "Client quote here."
  author: "Name"
  role: "Title, Company"
translations:
  hr: "project-slug"
  de: "project-slug"
---
```

### Body structure:
```markdown
## The Challenge
What the client needed and why. 2-3 paragraphs.

## The Approach
What we built and how. Multiple subsections (### headings) for each major feature.

## The Outcome
Results, impact, what it means for the client. 1-2 paragraphs.
```

### Writing guidelines:
- Lead with the client's problem, not our solution
- Be specific: mention actual colors, actual tech, actual features
- Highlight what makes this project unique vs generic
- Include pricing/capacity details where public (e.g. "dresses at €280")
- Keep the tone confident but not boastful
- Write EN first, then HR and DE versions (not machine-translated — adapt naturally)

## Step 6: Verify

```bash
# Check screenshots exist and aren't tiny
ls -la content/portfolio/screenshots/[slug]/

# Check case study files
ls -la content/portfolio/[slug]/
```

Spot-check at least one screenshot visually to confirm images loaded.

## Step 7: Update Portfolio Index

After all projects are documented, update `content/portfolio/portfolio-homepage.json` with the featured projects for the homepage grid.

---

## Portfolio Presentation Plans (for build phase)

When building the portfolio section of Version2.hr:
- **3D scroll elements** — Screenshots displayed in R3F-driven 3D frames that animate on scroll
- **Embedded live preview** — iframe-based website browser embedded in our site so visitors explore the project without leaving Version2.hr
- **Feature highlights** — Tech stack badges, language count, service scope displayed per project
- **Case study pages** — Full `/portfolio/[slug]/` pages with the markdown content rendered
