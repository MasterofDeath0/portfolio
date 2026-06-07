import type { Metadata } from "next";
import { books } from "@/config/books";

export const metadata: Metadata = {
  title: "Books — Sanyam Aggarwal",
  description: "Books I've read and recommend.",
};

export default function BooksPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Books
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          What I've been reading. Always updating.
        </p>
      </div>

      {books.map((cat) => (
        <div key={cat.category} className="space-y-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            {cat.category}
          </h2>
          <div className="space-y-px">
            {cat.items.map((book) => (
              <div
                key={book.title}
                className="flex items-center justify-between py-2.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {book.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    {book.author}
                  </p>
                </div>
                {book.year && (
                  <span className="text-xs tabular-nums" style={{ color: "var(--text-dim)" }}>
                    {book.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
