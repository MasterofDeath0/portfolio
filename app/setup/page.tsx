import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Setup — Sanyam Aggarwal",
  description: "My desk setup and workspace.",
};

const setupItems = [
  {
    category: "Desk",
    items: [
      "Ikea BEKANT 160×80 — sit/stand desk",
      "Herman Miller Aeron Chair",
      "Elgato Key Light — ambient lighting",
      "Blue Yeti X — for calls and recordings",
    ],
  },
  {
    category: "Displays",
    items: [
      "27\" Dell 4K monitor — primary",
      "MacBook Pro 14\" M3 — secondary",
    ],
  },
  {
    category: "Audio",
    items: [
      "Sony WH-1000XM5 — daily driver headphones",
      "AirPods Pro 2nd gen — on the go",
      "Sonos Era 100 — desk speakers",
    ],
  },
  {
    category: "Accessories",
    items: [
      "Logitech MX Master 3S",
      "Keychron Q3 — mechanical keyboard",
      "Elgato Stream Deck MK.2",
      "Anker USB-C hub",
    ],
  },
];

export default function SetupPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Setup
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          My desk, my workspace. Everything I sit in front of daily.
        </p>
      </div>

      {setupItems.map((section) => (
        <div key={section.category} className="space-y-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            {section.category}
          </h2>
          <div className="space-y-px">
            {section.items.map((item) => (
              <div
                key={item}
                className="py-2.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-2">
        <Link
          href="/gears"
          className="inline-flex items-center gap-1 text-sm transition-colors hover:text-[--text-primary]"
          style={{ color: "var(--text-secondary)" }}
        >
          View all tools & software
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
