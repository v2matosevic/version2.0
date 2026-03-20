'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { PostEditorForm, type DraftForm } from '@/components/admin/posts/post-editor-form'

export default function AdminEditPostPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const draftId = params.id

  const [form, setForm] = useState<DraftForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDraft(): Promise<void> {
      try {
        const res = await fetch(`/api/admin/posts/${draftId}`)
        if (!res.ok) {
          if (res.status === 401) { router.push(`/admin/login?from=/admin/posts/${draftId}/edit`); return }
          if (res.status === 404) { setError('Post not found'); setLoading(false); return }
          throw new Error('Failed to load post')
        }
        const data = await res.json()
        const draft = data.draft
        setForm({
          title: draft.title || '',
          slug: draft.slug || '',
          language: draft.language || 'en',
          category: draft.category || '',
          tags: draft.tags || '',
          excerpt: draft.excerpt || '',
          content: draft.content || '',
          status: draft.status || 'draft',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    loadDraft()
  }, [draftId, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted">
        <Loader2 size={24} className="animate-spin" />
        <span className="ml-3 text-[var(--text-small)]">Loading post...</span>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <a href="/admin/posts" className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-raised transition-colors" title="Back to posts">
          <ArrowLeft size={18} />
        </a>
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">Edit Post</h1>
          <p className="text-muted text-[var(--text-small)] mt-0.5 truncate max-w-md">{form?.title || 'Untitled'}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">{error}</div>
      )}

      {form && <PostEditorForm draftId={draftId} initial={form} />}
    </div>
  )
}
