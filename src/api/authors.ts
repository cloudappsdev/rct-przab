import type { AuthorGetPayload } from "@models/Author";

type Author = AuthorGetPayload<{ include: { books: true } }>;
type SafeResult<T> = { data: T; error: null } | { data: null; error: string };

export async function getAuthors(): Promise<SafeResult<Author[]>> {
  try {
    const res = await fetch("/api/authors");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Author[];
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Failed to fetch authors" };
  }
}

export async function getAuthorById(id: number): Promise<SafeResult<Author>> {
  try {
    const res = await fetch(`/api/authors/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Author;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Failed to fetch author" };
  }
}
