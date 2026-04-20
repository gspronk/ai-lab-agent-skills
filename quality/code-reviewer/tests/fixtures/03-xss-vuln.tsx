// TEST FIXTURE 03 — genuine XSS vulnerability
// Expected: XSS finding via dangerouslySetInnerHTML with unsanitized input

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
      {/* XSS: content comes from user input and is rendered as raw HTML */}
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
