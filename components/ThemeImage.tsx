"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export default function ThemeImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Render BOTH images always — toggle opacity via CSS, no src swap = no flash
  return (
    <div
      className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Fallback initials */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center text-xl font-bold select-none"
        style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "sans-serif" }}
      >
        SA
      </div>

      {/* Dark avatar — visible in dark mode */}
      <Image
        src={siteConfig.avatarDark}
        alt={siteConfig.name}
        fill
        className="object-cover rounded-full"
        priority
        style={{
          opacity: mounted && resolvedTheme === "light" ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      />

      {/* Light avatar — visible in light mode */}
      <Image
        src={siteConfig.avatarLight}
        alt={siteConfig.name}
        fill
        className="object-cover rounded-full"
        priority
        style={{
          opacity: mounted && resolvedTheme === "light" ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      />
    </div>
  );
}
