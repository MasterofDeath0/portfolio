"use client";

import Link from "next/link";

export default function ShowAllButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-all duration-200"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--text-primary)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
      }}
    >
      {label}
    </Link>
  );
}
