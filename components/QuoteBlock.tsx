"use client";

import { useState, useEffect } from "react";
import { quotes } from "@/config/quotes";

export default function QuoteBlock() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // Pick a new random quote on every page load (client-side = truly random per visit)
    setIdx(Math.floor(Math.random() * quotes.length));
  }, []);

  const quote = quotes[idx];

  return (
    <div
      className="relative rounded-xl border px-8 py-8 my-8 overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Big background quote mark — bottom-left */}
      <span
        className="absolute -bottom-4 left-4 text-[9rem] leading-none select-none pointer-events-none font-serif"
        style={{ color: "var(--border)", opacity: 0.6 }}
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        className="relative z-10 text-sm sm:text-base italic leading-relaxed"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>

      {/* Author */}
      <p
        className="relative z-10 text-sm mt-4 text-right italic"
        style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
      >
        — {quote.author}
      </p>
    </div>
  );
}
