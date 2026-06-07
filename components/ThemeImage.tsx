"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export default function ThemeImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const src = mounted && theme === "light" ? siteConfig.avatarLight : siteConfig.avatarDark;

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: "var(--border)" }}>
      <div
        className="absolute inset-0 rounded-full bg-[--muted] flex items-center justify-center text-2xl select-none"
        style={{ fontFamily: "sans-serif" }}
      >
        SA
      </div>
      {mounted && (
        <Image
          src={src}
          alt={siteConfig.name}
          fill
          className="object-cover rounded-full transition-opacity duration-300"
          priority
          onError={() => {}}
          style={{ opacity: 1 }}
        />
      )}
    </div>
  );
}
