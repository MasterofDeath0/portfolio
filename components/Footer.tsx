"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { IconGithub, IconTwitter, IconLinkedin, IconYoutube, IconInstagram } from "@/components/SocialIcons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/gears", label: "Gears" },
  { href: "/setup", label: "Setup" },
  { href: "/terminal", label: "Terminal" },
  { href: "/books", label: "Books" },
  { href: "/movies", label: "Movies" },
];

const socialLinks = [
  { label: "X / Twitter", href: siteConfig.socials.twitter, Icon: IconTwitter },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: IconLinkedin },
  { label: "GitHub", href: siteConfig.socials.github, Icon: IconGithub },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: IconYoutube },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--muted) 30%, transparent)" }}
    >
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
              Navigate
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-1.5">
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
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors hover:bg-[--muted] hover:text-[--text-primary]"
                    style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    <Icon size={15} />
                  </a>
                ) : null
              )}
              {siteConfig.socials.email && (
                <a
                  href={siteConfig.socials.email}
                  aria-label="Email"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors hover:bg-[--muted] hover:text-[--text-primary]"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
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
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Built with Next.js &amp; ☕</span>
        </div>
      </div>
    </footer>
  );
}
