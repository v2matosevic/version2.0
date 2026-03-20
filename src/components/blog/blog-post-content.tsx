type BlogPostContentProps = {
  html: string
}

function BlogPostContent({ html }: BlogPostContentProps) {
  return (
    <div
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export { BlogPostContent }
export type { BlogPostContentProps }
