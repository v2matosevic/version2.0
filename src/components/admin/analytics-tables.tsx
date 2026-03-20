type TopPage = {
  page: string
  count: number
}

type Conversion = {
  type: string | null
  count: number
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function TopPagesTable({ pages }: { pages: TopPage[] }) {
  return (
    <section className="bg-raised border border-line rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-sunken border-b border-line">
        <h3 className="text-[var(--text-small)] font-[600] text-foreground">Top Pages</h3>
      </div>
      {pages.length === 0 ? (
        <p className="text-muted text-[var(--text-small)] py-8 text-center">No data.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted">Page</th>
              <th className="text-right px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted w-20">Views</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p, i) => (
              <tr key={i} className="border-b border-line last:border-b-0 hover:bg-base/50 transition-colors">
                <td className="px-4 py-2.5 text-foreground text-[var(--text-small)] font-mono truncate max-w-xs">{p.page}</td>
                <td className="px-4 py-2.5 text-muted text-[var(--text-small)] text-right tabular-nums">{formatNumber(p.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

function ConversionsTable({ conversions }: { conversions: Conversion[] }) {
  return (
    <section className="bg-raised border border-line rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-sunken border-b border-line">
        <h3 className="text-[var(--text-small)] font-[600] text-foreground">Conversions</h3>
      </div>
      {conversions.length === 0 ? (
        <p className="text-muted text-[var(--text-small)] py-8 text-center">No conversions yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted">Type</th>
              <th className="text-right px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted w-20">Count</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((c, i) => (
              <tr key={i} className="border-b border-line last:border-b-0 hover:bg-base/50 transition-colors">
                <td className="px-4 py-2.5 text-foreground text-[var(--text-small)] capitalize">{c.type || 'unknown'}</td>
                <td className="px-4 py-2.5 text-muted text-[var(--text-small)] text-right tabular-nums">{formatNumber(c.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export { TopPagesTable, ConversionsTable }
export type { TopPage, Conversion }
