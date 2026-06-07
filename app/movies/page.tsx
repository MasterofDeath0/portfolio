import type { Metadata } from "next";
import { movies } from "@/config/movies";

export const metadata: Metadata = {
  title: "Movies & Shows — Sanyam Aggarwal",
  description: "Films and shows I love.",
};

export default function MoviesPage() {
  const films = movies.filter((m) => m.type === "movie" || !m.type);
  const shows = movies.filter((m) => m.type === "show");

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Movies & Shows
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Things I've watched and keep coming back to.
        </p>
      </div>

      {/* Movies */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Movies
        </h2>
        <div className="space-y-px">
          {films.map((m) => (
            <div
              key={m.title}
              className="flex items-center justify-between py-2.5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                {m.title}
              </p>
              <span className="text-xs tabular-nums" style={{ color: "var(--text-dim)" }}>
                {m.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shows */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Shows
        </h2>
        <div className="space-y-px">
          {shows.map((m) => (
            <div
              key={m.title}
              className="flex items-center justify-between py-2.5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                {m.title}
              </p>
              <span className="text-xs tabular-nums" style={{ color: "var(--text-dim)" }}>
                {m.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
