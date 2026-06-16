import type { Metadata } from "next";
import { gadgets, software, extensions } from "@/config/gears";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Gears — Sanyam Aggarwal",
  description: "Gadgets I use to get my work done",
};

interface GearItem {
  name: string;
  link?: string;
}

function GearSection({ title, items }: { title: string; items: GearItem[] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
        {title}
      </h2>
      <div className="space-y-px">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2.5 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-[--text-primary]"
                style={{ color: "var(--text-primary)" }}
              >
                {item.name}
                <ExternalLink size={11} style={{ color: "var(--text-dim)" }} />
              </a>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                {item.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GearsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Gears
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Gadgets I use to get my work done.
        </p>
      </div>
        {gadgets.length > 0 && (
          <GearSection title="Gadgets" items={gadgets} />
        )}
        
        {software.length > 0 && (
          <GearSection title="Software" items={software} />
        )}
        
        {extensions.length > 0 && (
          <GearSection title="VS Code Extensions" items={extensions} />
        )}
    </div>
  );
}
