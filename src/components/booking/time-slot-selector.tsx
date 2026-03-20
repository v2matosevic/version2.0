'use client'

type TimeSlot = { time: string; available: boolean }

type TimeSlotSelectorProps = {
  slots: TimeSlot[]
  selectedTime: string | null
  onSelectTime: (time: string) => void
  lang: string
}

const LABELS: Record<string, string> = {
  en: 'Select a time',
  hr: 'Odaberite vrijeme',
  de: 'Wählen Sie eine Zeit',
}

function TimeSlotSelector({ slots, selectedTime, onSelectTime, lang }: TimeSlotSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-muted">{LABELS[lang] ?? LABELS.en}</p>
      <div className="flex flex-wrap gap-3">
        {slots.map(({ time, available }) => {
          const isSelected = selectedTime === time
          return (
            <button
              key={time}
              type="button"
              onClick={() => available && onSelectTime(time)}
              disabled={!available}
              className={[
                'rounded-lg border px-5 py-2.5 text-sm font-medium transition-all',
                available ? 'cursor-pointer hover:border-brand-red/50' : 'cursor-not-allowed opacity-40 line-through',
                isSelected
                  ? 'border-brand-red bg-brand-red/10 text-foreground'
                  : 'border-line bg-sunken text-muted',
              ].join(' ')}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { TimeSlotSelector }
