"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export default function ThemeImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div
      className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Fallback initials shown until images load */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center text-xl font-bold select-none"
        style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "sans-serif" }}
      >
        SA
      </div>

      {/*
        Both images always in DOM as CSS backgrounds — browser caches them after first load.
        Swapping visibility via opacity avoids ANY src change = zero flash.
      */}
      {/* Dark avatar */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `url('${siteConfig.avatarDark}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.1s ease",
        }}
      />

      {/* Light avatar */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `url('${siteConfig.avatarLight}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDark ? 0 : 1,
          transition: "opacity 0.1s ease",
        }}
      />
    </div>
  );
}
