import type { Metadata } from "next";
import { achievements } from "@/config/achievements";
import PageTransition from "@/components/PageTransition";
import { ExternalLink, Trophy, Award, Zap, Star, Medal } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements — Sanyam Aggarwal",
  description: "Awards, certifications, and recognition.",
};

const categoryIcon = {
  award: Trophy,
  certification: Medal,
  hackathon: Zap,
  recognition: Star,
  other: Award,
};

export default function AchievementsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Achievements
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Awards, certifications, and things I'm proud of.
          </p>
        </div>

        <div className="space-y-3">
          {achievements.map((item, i) => {
            const Icon = categoryIcon[item.category ?? "other"] ?? Award;
            return (
              <div
                key={i}
                className="rounded-xl border p-4 flex items-start gap-4"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: "var(--muted)" }}
                >
                  <Icon size={16} style={{ color: "var(--muted-foreground)" }} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sm hover:underline underline-offset-2 inline-flex items-center gap-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.title}
                          <ExternalLink size={11} className="opacity-60" />
                        </a>
                      ) : (
                        <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </p>
                      )}
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.issuer}</p>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>
                      {item.date}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
