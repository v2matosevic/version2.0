# Content Management

## How Content Works

Content is managed through the custom CMS backend (see `brand-discovery.md` Section 16 for full backend spec). The owner writes and edits content in the CMS dashboard. The CMS stores content as markdown with YAML frontmatter -- the same format used by the Next.js data layer.

### CMS to Static Site Workflow

1. Owner writes or edits content in the CMS dashboard
2. CMS saves the content (markdown + frontmatter)
3. Save triggers a rebuild of the static Next.js frontend
4. Updated static files deploy to Hostinger
5. Blog posts and pages are always pre-rendered for performance

The `content/` directory remains the source of truth for the data layer. The CMS writes to this directory, and the Next.js build reads from it.

---

## Adding a Blog Post

New blog posts are created through the CMS interface. The CMS handles:
- Creating the directory structure (`content/blog/your-post-slug/`)
- Generating language files (`hr.md`, `en.md`, `de.md`)
- Managing asset uploads (`content/blog/your-post-slug/assets/`)
- Populating frontmatter fields
- Triggering the rebuild and deploy pipeline

### Frontmatter Schema Reference

The CMS produces markdown files with this frontmatter structure. Kept here as a reference for the data layer:

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
originalUrl: ""
language: "en"
translations:
  hr: "your-post-slug-hr"
  de: "your-post-slug-de"
date: "2026-02-22"
lastModified: "2026-02-22"
author: "Version2"
category: "web-development"
tags: ["Web Development", "Next.js"]
excerpt: "A brief description of the post for cards and meta tags."
featuredImage: "./assets/featured.jpeg"
---

Your markdown content here.
```

---

## Adding a New Page

Pages are also managed through the CMS. The workflow:
1. Create the page in the CMS dashboard
2. CMS generates the directory and language files in `content/pages/page-slug/`
3. Route must exist in the Next.js app router (new routes require a code change)
4. Update `sitemap.md` with the new route
5. Update navigation in `site-config.json` if it should appear in the menu
6. CMS triggers rebuild and deploy

---

## Updating Existing Content

1. Edit the content in the CMS dashboard
2. CMS updates the `lastModified` date in frontmatter automatically
3. Save triggers rebuild and deploy

---

## Image Guidelines

- Blog featured images: 1200x630px (matches OG image ratio)
- Format: WebP preferred, JPEG acceptable
- Max file size: 200KB for blog images, 500KB for hero images
- Naming: lowercase, kebab-case, descriptive (e.g., `nextjs-performance-tips.webp`)

All images provided by the owner. The CMS handles upload, but the owner is responsible for sourcing and preparing images to spec.
