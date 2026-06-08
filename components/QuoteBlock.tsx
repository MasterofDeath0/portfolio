import { quotes } from "@/config/quotes";

interface Props {
  index: number;
}

export default function QuoteBlock({ index }: Props) {
  const quote = quotes[index % quotes.length];
  return (
    <div
      className="relative rounded-xl border px-8 py-8 my-8 overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Big background quote marks — bottom-left like ramx.in */}
      <span
        className="absolute -bottom-4 left-4 text-[9rem] leading-none select-none pointer-events-none font-serif"
        style={{ color: "var(--border)", opacity: 0.6 }}
        aria-hidden
      >
        "
      </span>

      {/* Quote text — monospace italic, left-aligned */}
      <p
        className="relative z-10 text-sm sm:text-base italic leading-relaxed"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>

      {/* Author — right-aligned, dash prefix */}
      <p
        className="relative z-10 text-sm mt-4 text-right italic"
        style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
      >
        — {quote.author}
      </p>
    </div>
  );
}
