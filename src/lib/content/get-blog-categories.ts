import type { BlogPostMeta, BlogCategory } from '@/types/blog'

export function getBlogCategories(posts: BlogPostMeta[]): BlogCategory[] {
  const countMap = new Map<string, number>()

  for (const post of posts) {
    const category = post.frontmatter.category
    countMap.set(category, (countMap.get(category) ?? 0) + 1)
  }

  const categories: BlogCategory[] = Array.from(countMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => b.count - a.count)

  return categories
}
