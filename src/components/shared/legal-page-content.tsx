import { Container } from '@/components/ui/container'
import '@/styles/blog-prose.css'

type LegalPageContentProps = {
  title: string
  lastUpdated?: string
  html: string
}

function LegalPageContent({ title, lastUpdated, html }: LegalPageContentProps) {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 15%, var(--color-base) 100%)',
      }}
    >
      <Container className="max-w-3xl">
        <div className="mb-12 md:mb-16">
          <h1
            className="font-heading text-foreground"
            style={{
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--font-weight-headline)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-h1)',
            } as React.CSSProperties}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p
              className="mt-4 text-faint font-body"
              style={{ fontSize: 'var(--text-small)' }}
            >
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </section>
  )
}

export { LegalPageContent }
export type { LegalPageContentProps }
