import type { Metadata } from "next";
import { experiences } from "@/config/experience";
import ExperienceItem from "@/components/ExperienceItem";

export const metadata: Metadata = {
  title: "Work — Sanyam Aggarwal",
  description: "My professional experience and work history.",
};

export default function WorkPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Work
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Places I've worked at, roles I've held.
        </p>
      </div>

      <div className="space-y-2">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} exp={exp} defaultOpen />
        ))}
      </div>
    </div>
  );
}
