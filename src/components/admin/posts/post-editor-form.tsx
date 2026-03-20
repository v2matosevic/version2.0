'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hr', label: 'Croatian' },
  { value: 'de', label: 'German' },
] as const

const STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
] as const

const INPUT_CLASS =
  'w-full px-4 py-3 bg-raised border border-line rounded-lg text-foreground placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors text-[var(--text-body)]'
const LABEL_CLASS = 'block text-[var(--text-small)] text-muted mb-1.5 font-[500]'

interface DraftForm {
  title: string
  slug: string
  language: string
  category: string
  tags: string
  excerpt: string
  content: string
  status: string
}

type PostEditorFormProps = {
  draftId: string
  initial: DraftForm
}

function PostEditorForm({ draftId, initial }: PostEditorFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<DraftForm>(initial)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        status: form.status,
        ...(form.excerpt && { excerpt: form.excerpt }),
        ...(form.category && { category: form.category }),
        ...(form.tags && { tags: form.tags }),
      }

      const res = await fetch(`/api/admin/posts/${draftId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        if (res.status === 401) { router.push(`/admin/login?from=/admin/posts/${draftId}/edit`); return }
        const data = await res.json()
        throw new Error(data.error || data.errors?.[0]?.message || 'Failed to update post')
      }
      router.push('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
      setSubmitting(false)
    }
  }

  return (
    <>
      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className={LABEL_CLASS}>Title</label>
          <input id="title" name="title" type="text" value={form.title} onChange={handleChange} className={INPUT_CLASS} placeholder="Post title" required />
        </div>
        <div>
          <label htmlFor="slug" className={LABEL_CLASS}>Slug</label>
          <input id="slug" name="slug" type="text" value={form.slug} onChange={handleChange} className={INPUT_CLASS} placeholder="post-url-slug" required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="language" className={LABEL_CLASS}>Language</label>
            <select id="language" name="language" value={form.language} onChange={handleChange} className={INPUT_CLASS} disabled>
              {LANGUAGES.map((lang) => <option key={lang.value} value={lang.value}>{lang.label}</option>)}
            </select>
            <p className="text-faint text-[var(--text-small)] mt-1">Language cannot be changed after creation.</p>
          </div>
          <div>
            <label htmlFor="status" className={LABEL_CLASS}>Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange} className={INPUT_CLASS}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="category" className={LABEL_CLASS}>Category</label>
            <input id="category" name="category" type="text" value={form.category} onChange={handleChange} className={INPUT_CLASS} placeholder="e.g. Web Development" />
          </div>
        </div>
        <div>
          <label htmlFor="tags" className={LABEL_CLASS}>Tags</label>
          <input id="tags" name="tags" type="text" value={form.tags} onChange={handleChange} className={INPUT_CLASS} placeholder="nextjs, react, typescript" />
          <p className="text-faint text-[var(--text-small)] mt-1">Comma-separated list of tags.</p>
        </div>
        <div>
          <label htmlFor="excerpt" className={LABEL_CLASS}>Excerpt</label>
          <textarea id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} className={`${INPUT_CLASS} resize-y`} rows={3} placeholder="Brief summary for listing pages and SEO" />
        </div>
        <div>
          <label htmlFor="content" className={LABEL_CLASS}>Content</label>
          <textarea id="content" name="content" value={form.content} onChange={handleChange} className={`${INPUT_CLASS} resize-y font-mono text-[var(--text-small)]`} rows={16} placeholder="Write your post content in Markdown..." required />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors disabled:opacity-50">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <a href="/admin/posts" className="px-5 py-2.5 text-muted text-[var(--text-small)] font-[500] rounded-lg hover:text-foreground hover:bg-raised transition-colors">Cancel</a>
        </div>
      </form>
    </>
  )
}

export { PostEditorForm }
export type { DraftForm }
