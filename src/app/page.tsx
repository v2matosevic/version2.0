import { loadSiteConfig } from '@/lib/content/load-site-config'
import { loadTestimonials } from '@/lib/content/load-testimonials'
import { getAllPosts } from '@/lib/content/get-all-posts'

export default async function HomePage() {
  const siteConfig = loadSiteConfig()
  const testimonials = loadTestimonials()
  const posts = await getAllPosts('en')

  return (
    <main id="main-content" className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1
          className="font-heading text-foreground"
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-h1)' }}
        >
          {siteConfig.site.name}
        </h1>
        <p className="mt-4 text-muted" style={{ fontSize: 'var(--text-body-lg)' }}>
          {siteConfig.site.tagline}
        </p>
        <div className="mt-8 flex flex-col gap-2 text-muted text-sm">
          <p>{posts.length} blog posts loaded</p>
          <p>{testimonials.testimonials.length} testimonials loaded</p>
          <p>{siteConfig.site.languages.length} languages configured</p>
        </div>
      </div>
    </main>
  )
}
