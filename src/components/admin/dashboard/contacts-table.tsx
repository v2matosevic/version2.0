import { formatAdminDate } from '@/components/admin/format-date'

type ContactRow = {
  id: string
  name: string
  email: string
  type: string
  createdAt: string
}

function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  return (
    <table className="w-full text-[var(--text-small)]">
      <thead>
        <tr className="border-b border-line-subtle text-left text-muted">
          <th className="px-5 py-3 font-[600]">Name</th>
          <th className="px-5 py-3 font-[600]">Type</th>
          <th className="px-5 py-3 font-[600] text-right">Date</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr
            key={contact.id}
            className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
          >
            <td className="px-5 py-3">
              <p className="text-foreground font-[500]">{contact.name}</p>
              <p className="text-faint text-[var(--text-overline)] mt-0.5">
                {contact.email}
              </p>
            </td>
            <td className="px-5 py-3 text-muted capitalize">
              {contact.type}
            </td>
            <td className="px-5 py-3 text-muted text-right">
              {formatAdminDate(contact.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { ContactsTable }
export type { ContactRow }
