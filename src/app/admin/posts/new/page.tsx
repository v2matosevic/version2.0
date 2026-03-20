'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hr', label: 'Croatian' },
  { value: 'de', label: 'German' },
] as const

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čćžšđ]/g, (ch) => {
      const map: Record<string, string> = { č: 'c', ć: 'c', ž: 'z', š: 's', đ: 'd' }
      return map[ch] || ch
    })
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200)
}

const INPUT_CLASS =
  'w-full px-4 py-3 bg-raised border border-line rounded-lg text-foreground placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors text-[var(--text-body)]'

const LABEL_CLASS = 'block text-[var(--text-small)] text-muted mb-1.5 font-[500]'

export default function AdminNewPostPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    language: 'en',
    category: '',
    tags: '',
    excerpt: '',
    content: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'title' && !slugTouched) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>): void {
    setSlugTouched(true)
    setForm((prev) => ({ ...prev, slug: e.target.value }))
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        language: form.language,
        content: form.content,
        ...(form.excerpt && { excerpt: form.excerpt }),
        ...(form.category && { category: form.category }),
        ...(form.tags && { tags: form.tags }),
      }

      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login?from=/admin/posts/new')
          return
        }
        const data = await res.json()
        throw new Error(data.error || data.errors?.[0]?.message || 'Failed to create post')
      }

      router.push('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <a
          href="/admin/posts"
          className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-raised transition-colors"
          title="Back to posts"
        >
          <ArrowLeft size={18} />
        </a>
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
            New Post
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-0.5">
            Create a new blog draft
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className={LABEL_CLASS}>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="Post title"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className={LABEL_CLASS}>Slug</label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={form.slug}
            onChange={handleSlugChange}
            className={INPUT_CLASS}
            placeholder="post-url-slug"
            required
          />
          <p className="text-faint text-[var(--text-small)] mt-1">
            Auto-generated from title. Edit to customize.
          </p>
        </div>

        {/* Language & Category row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className={LABEL_CLASS}>Language</label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className={LABEL_CLASS}>Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              className={INPUT_CLASS}
              placeholder="e.g. Web Development"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className={LABEL_CLASS}>Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="nextjs, react, typescript"
          />
          <p className="text-faint text-[var(--text-small)] mt-1">
            Comma-separated list of tags.
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className={LABEL_CLASS}>Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className={`${INPUT_CLASS} resize-y`}
            rows={3}
            placeholder="Brief summary for listing pages and SEO"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className={LABEL_CLASS}>Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            className={`${INPUT_CLASS} resize-y font-mono text-[var(--text-small)]`}
            rows={16}
            placeholder="Write your post content in Markdown..."
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {submitting ? 'Creating...' : 'Create Post'}
          </button>
          <a
            href="/admin/posts"
            className="px-5 py-2.5 text-muted text-[var(--text-small)] font-[500] rounded-lg hover:text-foreground hover:bg-raised transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
