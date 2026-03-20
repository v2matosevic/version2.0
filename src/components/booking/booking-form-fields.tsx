'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { BookingLabels } from './booking-labels'

type BookingFormFieldsProps = {
  labels: BookingLabels
  contactMethod: string
  onContactMethodChange: (method: string) => void
  isSending: boolean
}

const CONTACT_METHODS = ['email', 'whatsapp', 'phone'] as const

function BookingFormFields({ labels, contactMethod, onContactMethodChange, isSending }: BookingFormFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <Input name="name" label={labels.name} required minLength={2} maxLength={100} disabled={isSending} />
      <Input name="email" type="email" label={labels.email} required maxLength={254} disabled={isSending} />

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">{labels.contactMethod}</p>
        <div className="flex gap-3">
          {CONTACT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onContactMethodChange(method)}
              className={[
                'rounded-lg border px-4 py-2 text-sm transition-all',
                contactMethod === method
                  ? 'border-brand-red bg-brand-red/10 text-foreground'
                  : 'border-line bg-sunken text-muted hover:border-brand-red/50',
              ].join(' ')}
            >
              {labels.methods[method]}
            </button>
          ))}
        </div>
      </div>

      <Textarea name="description" label={labels.description} rows={3} maxLength={5000} disabled={isSending} />

      <Button type="submit" variant="primary" size="md" loading={isSending} className="w-full sm:w-auto">
        {isSending ? labels.sending : labels.submit}
      </Button>
    </div>
  )
}

export { BookingFormFields }
