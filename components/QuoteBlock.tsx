import { quotes } from "@/config/quotes";

interface Props {
  index: number;
}

export default function QuoteBlock({ index }: Props) {
  const quote = quotes[index % quotes.length];
  return (
    <div
      className="rounded-lg border p-5 my-8"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <p
        className="text-sm italic leading-relaxed"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      <p
        className="text-xs mt-3 text-right"
        style={{ color: "var(--muted-foreground)" }}
      >
        — {quote.author}
      </p>
    </div>
  );
}
