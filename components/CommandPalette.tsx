"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useCallback } from "react";
import {
  Home, Briefcase, BookOpen, FileText, FolderOpen,
  Settings, Terminal, Book, Film, Moon, Sun, Shuffle, Cat
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const navItems = [
  { label: "Go to Home", sub: "Homepage", href: "/", icon: Home, shortcut: "H" },
  { label: "Go to Work", sub: "Work experience", href: "/work", icon: Briefcase, shortcut: "W" },
  { label: "Go to Blog", sub: "Articles & thoughts", href: "/blog", icon: BookOpen, shortcut: "B" },
  { label: "Go to Resume", sub: "Download / view", href: "/resume", icon: FileText, shortcut: "R" },
  { label: "Go to Projects", sub: "Things I've built", href: "/projects", icon: FolderOpen, shortcut: "P" },
  { label: "Go to Gears", sub: "Hardware & software", href: "/gears", icon: Settings, shortcut: "G" },
  { label: "Go to Terminal", sub: "Shell setup", href: "/terminal", icon: Terminal, shortcut: "T" },
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
      <div className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden">
        <Command>
          <Command.Input placeholder="Search or jump to..." autoFocus />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Navigation">
              {navItems.map((item) => (
                <Command.Item
                  key={item.href}
                  onSelect={() => { router.push(item.href); close(); }}
                >
                  <item.icon size={15} style={{ opacity: 0.6 }} />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>{item.label}</span>
                    <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{item.sub}</span>
                  </div>
                  <kbd
                    className="text-[11px] px-1.5 py-0.5 rounded border font-mono"
                    style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    {item.shortcut}
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator />

            <Command.Group heading="Oneko">
              <Command.Item
                onSelect={() => {
                  window.dispatchEvent(new CustomEvent("oneko:toggle-sleep"));
                  close();
                }}
              >
                <Moon size={15} style={{ opacity: 0.6 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Toggle Sleep</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Make the cat sleep or wake up</span>
                </div>
                <kbd className="text-[11px] px-1.5 py-0.5 rounded border font-mono" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>⌘Z</kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.dispatchEvent(new CustomEvent("oneko:change-variant"));
                  close();
                }}
              >
                <Shuffle size={15} style={{ opacity: 0.6 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Change Avatar</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Cycle through skins</span>
                </div>
                <kbd className="text-[11px] px-1.5 py-0.5 rounded border font-mono" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>⌘X</kbd>
              </Command.Item>
            </Command.Group>

            <Command.Separator />

            <Command.Group heading="Theme">
              <Command.Item onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); close(); }}>
                {theme === "dark"
                  ? <Sun size={15} style={{ opacity: 0.6 }} />
                  : <Moon size={15} style={{ opacity: 0.6 }} />
                }
                <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>
                  Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                </span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
