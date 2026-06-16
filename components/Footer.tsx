"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import {
  IconTwitter,
  IconLinkedin,
  IconInstagram,
  IconMedium,
  IconSubstack,
  IconTopmate,
  IconPen,
  IconCamera,
} from "@/components/SocialIcons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/gears", label: "Gears" },
  { href: "/books", label: "Books" },
  { href: "/movies", label: "Movies" },
];

const statusMessages = [
  "Exploring & Experimenting",
  "Following Curiosity",
  "Learning Something New",
  "Connecting Dots",
  "Reading, Writing, Repeating",
];

export default function Footer() {
  const s = siteConfig.socials;

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const connectLinks = [
    { label: "X / Twitter", href: s.twitter, Icon: IconTwitter },
    { label: "LinkedIn", href: s.linkedin, Icon: IconLinkedin },
    { label: "Instagram", href: s.instagram, Icon: IconInstagram },
    { label: "Medium", href: s.medium, Icon: IconMedium },
    { label: "Substack", href: s.substack, Icon: IconSubstack },
    { label: "Topmate", href: s.topmate, Icon: IconTopmate },
    { label: "Writing", href: s.instagram2, Icon: IconPen },
  ].filter((l) => l.href);

  return (
    <footer
      className="border-t mt-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Navigate
            </p>

            <nav className="grid grid-cols-4 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[--text-primary]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Connect
            </p>

            <div className="flex flex-wrap gap-2">
              {connectLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}

              {s.email && (
                <a
                  href={s.email}
                  aria-label="Email"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <Mail size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </span>

          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span key={statusIndex}>
              {statusMessages[statusIndex]}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
