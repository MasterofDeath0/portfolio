"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useCallback } from "react";
import {
  Home, Briefcase, BookOpen, FolderOpen,
  Settings, Book, Film, Moon, Sun, Shuffle, User, Info
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const navItems = [
  { label: "Go to Home", sub: "Homepage", href: "/", icon: Home, shortcut: "H" },
  { label: "Go to About", sub: "About me", href: "/about", icon: Info, shortcut: "A" },
  { label: "Go to Work", sub: "Work experience", href: "/work", icon: Briefcase, shortcut: "W" },
  { label: "Go to Blog", sub: "Articles & thoughts", href: "/blog", icon: BookOpen, shortcut: "B" },
  { label: "Go to Projects", sub: "Things I've built", href: "/projects", icon: FolderOpen, shortcut: "P" },
  { label: "Go to Gears", sub: "Hardware & software", href: "/gears", icon: Settings, shortcut: "G" },
  { label: "Go to Books", sub: "Reading list", href: "/books", icon: Book, shortcut: "K" },
  { label: "Go to Movies", sub: "Films & shows", href: "/movies", icon: Film, shortcut: "M" },
];

export function CommandPalette({ open, setOpen }: Props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Single-letter shortcuts
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const item = navItems.find((n) => n.shortcut.toLowerCase() === e.key.toLowerCase());
      if (item) { router.push(item.href); close(); }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, router, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99998] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="w-full max-w-lg shadow-2xl overflow-hidden"
        style={{
          borderRadius: "1.25rem",
          border: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <Command
          style={{
            background: "transparent",
            borderRadius: "1.25rem",
            overflow: "hidden",
          }}
        >
          <Command.Input
            placeholder="Search or jump to..."
            autoFocus
            style={{
              borderRadius: "1.25rem 1.25rem 0 0",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--border)",
              padding: "0.875rem 1.25rem",
              fontSize: "0.875rem",
              color: "var(--text-primary)",
              outline: "none",
              width: "100%",
            }}
          />
          <Command.List style={{ maxHeight: "60vh", overflowY: "auto", padding: "0.5rem" }}>
            <Command.Empty
              style={{ padding: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}
            >
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}
            >
              {navItems.map((item) => (
                <Command.Item
                  key={item.href}
                  onSelect={() => { router.push(item.href); close(); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    marginTop: "0.125rem",
                  }}
                  className="cmdk-item"
                >
                  <item.icon size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span>{item.label}</span>
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{item.sub}</span>
                  </div>
                  <kbd
                    className="text-[11px] px-1.5 py-0.5 rounded-md border font-mono shrink-0"
                    style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--muted)" }}
                  >
                    {item.shortcut}
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0.5rem" }} />

            <Command.Group
              heading="Oneko"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}
            >
              <Command.Item
                onSelect={() => { window.dispatchEvent(new CustomEvent("oneko:toggle-sleep")); close(); }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", cursor: "pointer", marginTop: "0.125rem" }}
                className="cmdk-item"
              >
                <Moon size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Toggle Sleep</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Make the cat sleep or wake up</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => { window.dispatchEvent(new CustomEvent("oneko:change-variant")); close(); }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", cursor: "pointer", marginTop: "0.125rem" }}
                className="cmdk-item"
              >
                <Shuffle size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Change Cat Skin</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Cycle through variants</span>
                </div>
              </Command.Item>
            </Command.Group>

            <Command.Separator style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0.5rem" }} />

            <Command.Group
              heading="Theme"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)", textTransform: "uppercase", fontWeight: 600 }}
            >
              <Command.Item
                onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); close(); }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", cursor: "pointer", marginTop: "0.125rem" }}
                className="cmdk-item"
              >
                {theme === "dark"
                  ? <Sun size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                  : <Moon size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                }
                <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>
                  Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                </span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
