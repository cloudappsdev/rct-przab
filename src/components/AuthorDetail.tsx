// import type { Author } from "@prisma-client";

import type { AuthorGetPayload } from "@models/Author";

type Author = AuthorGetPayload<{ include: { books: true } }>;

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9" />
  </svg>
);

// AuthorDetail.tsx
interface AuthorDetailProps {
  author: Author;
  onBack?: () => void;
}

export default function AuthorDetail({ author, onBack }: AuthorDetailProps) {
  const olAuthorUrl = `https://openlibrary.org/authors/${author.ol_key}`;

  return (
    <>
      <div className="ad-root">
        {/* Hero */}
        <div className="ad-hero">
          <div className="ad-hero-grain" />
          <div className="ad-hero-deco" />
          <div className="ad-hero-inner">
            <button className="ad-back" onClick={onBack}>
              ← All Authors
            </button>
            <div className="ad-author-row">
              <div>
                <div className="ad-eyebrow">Author Profile</div>
                <h1 className="ad-author-name">
                  {author.firstName} <em>{author.lastName}</em>
                </h1>
              </div>
              <a
                href={olAuthorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ad-ol-link"
              >
                <ExternalLinkIcon />
                View on Open Library
              </a>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="ad-body">
          {/* Stats */}
          <div className="ad-stats-row">
            <div className="ad-stat-card">
              <div className="ad-stat-label">Total Works</div>
              <div className="ad-stat-value gold">{author.books.length}</div>
            </div>
            <div className="ad-stat-card">
              <div className="ad-stat-label">OL Key</div>
              <div
                className="ad-stat-value"
                style={{ fontSize: 16, paddingTop: 6 }}
              >
                {author.ol_key}
              </div>
            </div>
            {author.email && (
              <div className="ad-stat-card">
                <div className="ad-stat-label">Email</div>
                <div
                  className="ad-stat-value"
                  style={{
                    fontSize: 13,
                    paddingTop: 6,
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {author.email}
                </div>
              </div>
            )}
          </div>

          {/* Works */}
          <div className="ad-section-header">
            <h2 className="ad-section-title">Works</h2>
            <span className="ad-section-count">
              {author.books.length} titles
            </span>
          </div>

          <div className="ad-works-grid">
            {author.books.map((book, i) => (
              <div
                key={book.id}
                className="ad-work-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="ad-work-left">
                  <span className="ad-work-num">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <div className="ad-work-info">
                    <div className="ad-work-title">{book.title}</div>
                    <div className="ad-work-meta">
                      {book.isbn && (
                        <span className="ad-work-isbn">ISBN {book.isbn}</span>
                      )}
                      {book.language && (
                        <span className="ad-work-lang">{book.language}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ad-work-actions">
                  <a
                    href={`https://openlibrary.org/works/${book.ol_key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ad-ol-work-link"
                  >
                    Open Library <ExternalLinkIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
