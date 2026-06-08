import type { Metadata } from "next";
import { academics } from "@/config/academics";
import PageTransition from "@/components/PageTransition";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Academics — Sanyam Aggarwal",
  description: "My educational background and academic achievements.",
};

export default function AcademicsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Academics
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Education and academic background.
          </p>
        </div>

        <div className="space-y-6">
          {academics.map((entry, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 space-y-3"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {entry.institutionUrl ? (
                      <a
                        href={entry.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base hover:underline underline-offset-2 inline-flex items-center gap-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {entry.institution}
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    ) : (
                      <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
                        {entry.institution}
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {entry.degree} · {entry.field}
                  </p>
                </div>
                <div className="shrink-0 text-right space-y-0.5">
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{entry.period}</p>
                  {entry.location && (
                    <p className="text-xs" style={{ color: "var(--text-dim)" }}>{entry.location}</p>
                  )}
                  {entry.grade && (
                    <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{entry.grade}</p>
                  )}
                </div>
              </div>

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="space-y-1.5 pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm pt-2" style={{ color: "var(--text-secondary)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--text-dim)" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
