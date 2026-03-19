export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1
          className="font-heading text-foreground"
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-h1)' }}
        >
          Version2
        </h1>
        <p className="mt-4 text-muted" style={{ fontSize: 'var(--text-body-lg)' }}>
          Web Design &amp; Development Studio
        </p>
      </div>
    </main>
  )
}
