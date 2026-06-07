"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function HeroEmailCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-sm group transition-colors hover:text-[--text-primary]"
      style={{ color: "var(--text-secondary)" }}
    >
      <span>{siteConfig.email}</span>
      <span className="transition-colors" style={{ color: "var(--muted-foreground)" }}>
        {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
      </span>
      {copied && (
        <span className="text-xs text-green-500 ml-1">Copied!</span>
      )}
    </button>
  );
}
