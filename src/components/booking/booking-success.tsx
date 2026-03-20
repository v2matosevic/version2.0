import type { BookingLabels } from './booking-labels'

type BookingSuccessProps = {
  labels: BookingLabels
  icsUrl: string | null
}

function BookingSuccess({ labels, icsUrl }: BookingSuccessProps) {
  return (
    <div className="rounded-xl border border-green-800/30 bg-green-900/10 p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold text-foreground">{labels.successTitle}</h3>
      <p className="mb-6 text-muted">{labels.successText}</p>
      {icsUrl && (
        <a
          href={icsUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-light"
        >
          {labels.downloadIcs}
        </a>
      )}
    </div>
  )
}

export { BookingSuccess }
