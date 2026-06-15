"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useCallback } from "react";
import {
  Home, Briefcase, BookOpen, FolderOpen,
  Settings, Book, Film, Moon, Sun, Image, User, Info,
  GraduationCap, Trophy
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

// const navItems = [
//   { label: "Go to Home",     sub: "Navigate to the homepage",             href: "/",        icon: Home,     shortcut: "H" },
//   { label: "Go to About",    sub: "About me",             href: "/about",   icon: Info,     shortcut: "A" },
//   { label: "Go to Work",     sub: "Work experience",      href: "/work",    icon: Briefcase,shortcut: "W" },
//   { label: "Go to Blog",     sub: "Articles & thoughts",  href: "/blog",    icon: BookOpen, shortcut: "B" },
//   { label: "Go to Projects", sub: "Things I've built",    href: "/projects",icon: FolderOpen,shortcut: "P" },
//   { label: "Go to Gears",    sub: "Hardware & software",  href: "/gears",   icon: Settings, shortcut: "G" },
//   { label: "Go to Books",    sub: "Reading list",         href: "/books",   icon: Book,     shortcut: "K" },
//   { label: "Go to Movies",   sub: "Films & shows",        href: "/movies",  icon: Film,     shortcut: "M" },
//   // { label: "View Resume",       sub: "Download / view CV",      href: "/resume",       icon: FileText,     shortcut: "R" },
//   { label: "Go to Academics",  sub: "Education & background",  href: "/academics",    icon: GraduationCap, shortcut: "C" },
//   { label: "Go to Achievements", sub: "Awards & certifications", href: "/achievements", icon: Trophy,       shortcut: "V" },
// ];
const navItems = [
  { label: "Home",         href: "/",             icon: Home,          shortcut: "H" },
  { label: "About",        href: "/about",        icon: Info,          shortcut: "A" },
  { label: "Work",         href: "/work",         icon: Briefcase,     shortcut: "W" },
  { label: "Blog",         href: "/blog",         icon: BookOpen,      shortcut: "B" },
  { label: "Projects",     href: "/projects",     icon: FolderOpen,    shortcut: "P" },
  { label: "Academics",    href: "/academics",    icon: GraduationCap, shortcut: "C" },
  { label: "Achievements", href: "/achievements", icon: Trophy,        shortcut: "V" },
  { label: "Books",        href: "/books",        icon: Book,          shortcut: "K" },
  { label: "Movies",       href: "/movies",       icon: Film,          shortcut: "M" },
  { label: "Gears",        href: "/gears",        icon: Settings,      shortcut: "G" },
];

// Kbd badge component
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="text-[11px] px-1.5 py-0.5 rounded-md border font-mono shrink-0 flex items-center gap-0.5"
      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--muted)" }}
    >
      {children}
    </kbd>
  );
}

export function CommandPalette({ open, setOpen }: Props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const close = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      // ⌘Z — toggle sleep
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("oneko:toggle-sleep"));
        close();
        return;
      }
      // ⌘X — change avatar
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "x") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("oneko:change-variant"));
        close();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Single-letter nav shortcuts
      const item = navItems.find((n) => n.shortcut.toLowerCase() === e.key.toLowerCase());
      if (item) { router.push(item.href); close(); return; }
      // T — toggle theme
      if (e.key.toLowerCase() === "t") {
        setTheme(theme === "dark" ? "light" : "dark");
        close();
        return;
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, router, close, theme, setTheme]);

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
        <Command style={{ background: "transparent", borderRadius: "1.25rem", overflow: "hidden" }}>
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

            {/* Navigation */}
<Command.Group
  heading="navigation"
  style={{
    padding: "0.25rem 0.5rem",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    color: "var(--muted-foreground)",
    textTransform: "none",
    fontWeight: 600,
  }}
>
  {navItems.map((item) => (
    <Command.Item
      key={item.href}
      onSelect={() => {
        router.push(item.href);
        close();
      }}
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
      <item.icon
        size={15}
        style={{ opacity: 0.6, flexShrink: 0 }}
      />

      <span className="flex-1">
        {item.label}
      </span>

      <Kbd>{item.shortcut}</Kbd>
    </Command.Item>
  ))}
</Command.Group>

            <Command.Separator style={{ height: "1px", background: "var(--border)", margin: "0.5rem" }} />

            {/* Oneko */}
            <Command.Group
              heading="Oneko"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)", textTransform: "none", fontWeight: 600 }}
            >
              <Command.Item
                onSelect={() => { window.dispatchEvent(new CustomEvent("oneko:toggle-sleep")); close(); }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", cursor: "pointer", marginTop: "0.125rem" }}
                className="cmdk-item"
              >
                <Moon size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Toggle Oneko Sleep</span>
                  {/* <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Put the neko to sleep or wake it up</span> */}
                </div>
                <Kbd><span>⌘</span><span>Z</span></Kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => { window.dispatchEvent(new CustomEvent("oneko:change-variant")); close(); }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", cursor: "pointer", marginTop: "0.125rem" }}
                className="cmdk-item"
              >
                <Image size={15} style={{ opacity: 0.6, flexShrink: 0 }} />
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>Change Oneko Avatar</span>
                  {/* <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>Cycle to the next neko variant</span> */}
                </div>
                <Kbd><span>⌘</span><span>X</span></Kbd>
              </Command.Item>
            </Command.Group>

            <Command.Separator style={{ height: "1px", background: "var(--border)", margin: "0.5rem" }} />

            {/* Theme */}
            <Command.Group
              heading="Theme"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)", textTransform: "none", fontWeight: 600 }}
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
                <div className="flex flex-col flex-1">
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </span>
                </div>
                <Kbd>T</Kbd>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
