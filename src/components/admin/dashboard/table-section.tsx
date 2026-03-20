import type { ReactNode } from 'react'

type TableSectionProps = {
  title: string
  children: ReactNode
  emptyMessage: string
  isEmpty: boolean
}

function TableSection({ title, children, emptyMessage, isEmpty }: TableSectionProps) {
  return (
    <div className="bg-raised border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-line">
        <h2 className="font-heading text-[var(--text-body-lg)] font-[700] text-foreground">
          {title}
        </h2>
      </div>
      {isEmpty ? (
        <div className="px-5 py-10 text-center text-muted text-[var(--text-small)]">
          {emptyMessage}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export { TableSection }
export type { TableSectionProps }
