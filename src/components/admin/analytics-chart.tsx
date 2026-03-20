import { BarChart3 } from 'lucide-react'

type DayView = {
  period: string
  count: number
}

type AnalyticsChartProps = {
  viewsByDay: DayView[]
}

function formatShortDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function AnalyticsChart({ viewsByDay }: AnalyticsChartProps) {
  const maxDayViews = viewsByDay.reduce((max, d) => Math.max(max, d.count), 0) || 1

  return (
    <section className="bg-raised border border-line rounded-lg p-6">
      <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-6 flex items-center gap-2">
        <BarChart3 size={18} className="text-brand-red" />
        Views per Day
        <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">(last 30 days)</span>
      </h2>

      {viewsByDay.length === 0 ? (
        <p className="text-muted text-[var(--text-small)] py-8 text-center">No page view data yet.</p>
      ) : (
        <div className="flex items-end gap-[3px] h-48 overflow-x-auto">
          {viewsByDay.map((day) => {
            const heightPercent = maxDayViews > 0 ? Math.max((day.count / maxDayViews) * 100, 2) : 2
            return (
              <div key={day.period} className="flex flex-col items-center flex-1 min-w-[18px] group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-foreground bg-sunken border border-line rounded px-1.5 py-0.5 mb-1 whitespace-nowrap pointer-events-none">
                  {day.count}
                </div>
                <div className="w-full bg-brand-red/80 hover:bg-brand-red rounded-t transition-colors" style={{ height: `${heightPercent}%` }} />
                <span className="text-[9px] text-faint mt-1.5 rotate-[-45deg] origin-top-left whitespace-nowrap">
                  {formatShortDate(day.period)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export { AnalyticsChart }
export type { DayView }
