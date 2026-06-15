"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { CommandPalette } from "./CommandPalette";

const moreLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/academics", label: "Academics" },
  { href: "/achievements", label: "Achievements" },
  { href: "/books", label: "Books" },
  { href: "/movies", label: "Movies" },
  { href: "/gears", label: "Gears" },
  // { href: "/achievements", label: "Achievements" },
];

const globalNavShortcuts: Record<string, string> = {
  h: "/", a: "/about", w: "/work", b: "/blog",
  p: "/projects", g: "/gears", k: "/books", m: "/movies",
  // r: "/resume", 
  c: "/academics", v: "/achievements",
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Skip if typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("oneko:toggle-sleep"));
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "x") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("oneko:change-variant"));
        return;
      }

      // Single-key shortcuts — only when palette is closed and no modifiers
      if (!e.metaKey && !e.ctrlKey && !e.altKey && !paletteOpen) {
        const key = e.key.toLowerCase();
        if (key === "t") { setTheme(theme === "dark" ? "light" : "dark"); return; }
        const dest = globalNavShortcuts[key];
        if (dest) { router.push(dest); return; }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paletteOpen, theme, setTheme, router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="container mx-auto max-w-2xl px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Nav links */}
            <nav className="flex items-center gap-5 text-sm font-medium">
              <Link
                href="/"
                className="shrink-0 transition-colors hover:text-[--text-primary]"
                style={{
                  color: pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: pathname === "/" ? 600 : 400,
                }}
              >
                Home
              </Link>

              <Link
                href="/about"
                className="shrink-0 transition-colors hover:text-[--text-primary]"
                style={{
                  color: pathname === "/about" ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: pathname === "/about" ? 600 : 400,
                }}
              >
                About
              </Link>

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((o) => !o)}
                  className="flex items-center gap-1 shrink-0 transition-colors hover:text-[--text-primary]"
                  style={{ color: moreOpen ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  More
                  <ChevronDown
                    size={13}
                    className="transition-transform"
                    style={{ transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {moreOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-40 rounded-xl border shadow-lg py-1 z-50"
                    style={{ background: "var(--background)", borderColor: "var(--border)" }}
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center px-4 py-2 text-sm transition-colors hover:bg-[--muted]"
                        style={{
                          color: pathname === link.href ? "var(--text-primary)" : "var(--text-secondary)",
                          fontWeight: pathname === link.href ? 600 : 400,
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: pill search button + standalone theme icon */}
            <div className="flex items-center gap-3 ml-4 shrink-0">
              {/* Pill-shaped search button — matches ss exactly */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors hover:bg-[--muted]"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                }}
                aria-label="Open command palette"
              >
                <Search size={13} />
                <kbd
                  className="flex items-center gap-1 font-sans text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span
                    className="inline-flex items-center justify-center text-xs px-1 py-0.5 rounded"
                    style={{ background: "var(--border)" }}
                  >
                    ⌘
                  </span>
                  <span
                    className="inline-flex items-center justify-center text-xs px-1 py-0.5 rounded"
                    style={{ background: "var(--border)" }}
                  >
                    K
                  </span>
                </kbd>
              </button>

              {/* Standalone theme icon — no box, just icon */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center transition-colors hover:text-[--text-primary]"
                  style={{ color: "var(--muted-foreground)" }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
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
