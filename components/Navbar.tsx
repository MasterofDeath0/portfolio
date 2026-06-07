"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandPalette } from "./CommandPalette";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "border-b backdrop-blur-md"
            : ""
        }`}
        style={{
          backgroundColor: scrolled ? "color-mix(in srgb, var(--background) 85%, transparent)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="container mx-auto max-w-2xl px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo */}
            <Link
              href="/"
              className="text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--text-primary)" }}
            >
              sanyam.
            </Link>

            {/* Center: Nav links — hidden on mobile */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/blog", label: "Blog" },
                { href: "/resume", label: "Resume" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[--text-primary]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: K button + theme toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors hover:bg-[--muted]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)",
                }}
                aria-label="Open command palette"
              >
                <Search size={12} />
                <span className="hidden sm:inline">
                  <kbd className="font-sans">⌘K</kbd>
                </span>
                <span className="sm:hidden">K</span>
              </button>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-[--muted]"
                  style={{ color: "var(--muted-foreground)" }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
