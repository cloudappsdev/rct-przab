import type { AuthorGetPayload } from "@models/Author";
import { prisma } from "../lib/prisma";
import "./AuthorList.scss";

type Author = AuthorGetPayload<{ include: { books: true } }>;

interface AuthorListProps {
  onSelectAuthor?: (author: Author) => void;
}

export default async function AuthorList({ onSelectAuthor }: AuthorListProps) {
  const authors = await prisma.author.findMany({ include: { books: true } });

  return (
    <>
      <div className="al-root">
        <div className="al-grain" />
        <div className="al-inner">
          <div className="al-header">
            <div className="al-eyebrow">Open Library Collection</div>
            <h1 className="al-heading">
              The <em>Authors</em>
            </h1>
            <p className="al-subheading">
              A curated index of literary voices and their works.
            </p>
          </div>

          <div className="al-divider" />

          <div className="al-count">{authors.length} authors indexed</div>

          <div className="al-list">
            {authors.map((author, i) => (
              <div
                key={author.id}
                className="al-item"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => onSelectAuthor?.(author)}
              >
                <div className="al-item-left">
                  <span className="al-index">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <div className="al-avatar">
                    {author.firstName?.[0] ?? "?"}
                  </div>
                  <div className="al-name-block">
                    <span className="al-name">
                      {author.authorName ??
                        `${author.firstName} ${author.lastName}`}
                    </span>
                    <span className="al-meta">ol/{author.ol_key}</span>
                  </div>
                </div>
                <div className="al-item-right">
                  <span className="al-badge">
                    {author.books.length}{" "}
                    {author.books.length === 1 ? "work" : "works"}
                  </span>
                  <span className="al-arrow">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="al-footer">End of index</div>
        </div>
      </div>
    </>
  );
}
