'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

interface BlogDraft {
  id: string
  slug: string
  language: string
  title: string
  status: string
  category: string | null
  createdAt: string
  updatedAt: string
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-amber-500/15 text-amber-400',
  published: 'bg-emerald-500/15 text-emerald-400',
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'EN',
  hr: 'HR',
  de: 'DE',
}

export default function AdminPostsPage() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<BlogDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchDrafts = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/posts')
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login?from=/admin/posts')
          return
        }
        throw new Error('Failed to fetch posts')
      }
      const data = await res.json()
      setDrafts(data.drafts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchDrafts()
  }, [fetchDrafts])

  async function handleDelete(id: string, title: string): Promise<void> {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setDrafts((prev) => prev.filter((d) => d.id !== id))
    } catch {
      setError('Failed to delete post')
    } finally {
      setDeletingId(null)
    }
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
            Blog Posts
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-1">
            Manage drafts and published posts
          </p>
        </div>
        <a
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors"
        >
          <Plus size={16} />
          New Post
        </a>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span className="ml-3 text-[var(--text-small)]">Loading posts...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && drafts.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-muted text-[var(--text-body)]">No posts yet.</p>
          <a
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light transition-colors"
          >
            <Plus size={16} />
            Create your first post
          </a>
        </div>
      )}

      {/* Table */}
      {!loading && drafts.length > 0 && (
        <div className="border border-line rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-sunken border-b border-line">
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-20">
                  Lang
                </th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-32">
                  Created
                </th>
                <th className="text-right px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((draft) => (
                <tr
                  key={draft.id}
                  className="bg-raised border-b border-line last:border-b-0 hover:bg-raised/80 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[var(--text-body)] font-[500] block truncate max-w-md">
                      {draft.title}
                    </span>
                    {draft.category && (
                      <span className="text-faint text-[var(--text-small)] block mt-0.5">
                        {draft.category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted text-[var(--text-small)] font-mono">
                      {LANGUAGE_LABELS[draft.language] || draft.language}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[var(--text-small)] font-[500] ${
                        STATUS_COLORS[draft.status] || 'bg-white/5 text-muted'
                      }`}
                    >
                      {draft.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted text-[var(--text-small)]">
                      {formatDate(draft.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/admin/posts/${draft.id}/edit`}
                        className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-base transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </a>
                      <button
                        onClick={() => handleDelete(draft.id, draft.title)}
                        disabled={deletingId === draft.id}
                        className="p-2 rounded-lg text-muted hover:text-brand-red hover:bg-brand-red/10 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === draft.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
