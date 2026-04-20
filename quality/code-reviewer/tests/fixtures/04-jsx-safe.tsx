// TEST FIXTURE 04 — safe JSX rendering
// Expected: NO XSS finding (false positive check — React auto-escapes {content})

interface CommentProps {
  content: string
  authorName: string
  postedAt: string
}

export function Comment({ content, authorName, postedAt }: CommentProps) {
  return (
    <article className="comment">
      <header>
        <span className="author">{authorName}</span>
        <time>{postedAt}</time>
      </header>
      <p className="body">{content}</p>
    </article>
  )
}
