import { formatAdminDate } from '@/components/admin/format-date'
import { statusColor } from '@/components/admin/status-badge'

type BookingRow = {
  id: string
  name: string
  date: string
  time: string
  status: string
}

function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  return (
    <table className="w-full text-[var(--text-small)]">
      <thead>
        <tr className="border-b border-line-subtle text-left text-muted">
          <th className="px-5 py-3 font-[600]">Name</th>
          <th className="px-5 py-3 font-[600]">Date</th>
          <th className="px-5 py-3 font-[600] text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr
            key={booking.id}
            className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
          >
            <td className="px-5 py-3 text-foreground font-[500]">
              {booking.name}
            </td>
            <td className="px-5 py-3 text-muted">
              {formatAdminDate(booking.date)}{' '}
              <span className="text-faint">{booking.time}</span>
            </td>
            <td className="px-5 py-3 text-right">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[var(--text-overline)] font-[600] capitalize ${statusColor(booking.status)}`}
              >
                {booking.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { BookingsTable }
export type { BookingRow }
