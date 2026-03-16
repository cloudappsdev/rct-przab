import { useState } from "react";
import AuthorList from "./components/AuthorList";
import AuthorDetail from "./components/AuthorDetail";
import type { AuthorGetPayload } from "@models/Author";

type Author = AuthorGetPayload<{ include: { books: true } }>;

export default function App() {
  // const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  return selectedAuthor ? (
    <AuthorDetail
      author={selectedAuthor}
      onBack={() => setSelectedAuthor(null)}
    />
  ) : (
    <AuthorList onSelectAuthor={setSelectedAuthor} />
  );
}
