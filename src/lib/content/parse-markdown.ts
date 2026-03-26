import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

const WORDS_PER_MINUTE = 200

export type ParsedMarkdown<T> = {
  frontmatter: T
  content: string
  html: string
  wordCount: number
  readingTime: number
}

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeStringify)

export async function parseMarkdown<T>(raw: string): Promise<ParsedMarkdown<T>> {
  const { data, content } = matter(raw)
  const result = await processor.process(content)
  const html = String(result)
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return {
    frontmatter: data as T,
    content,
    html,
    wordCount,
    readingTime,
  }
}
