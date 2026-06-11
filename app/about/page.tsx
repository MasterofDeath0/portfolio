import { siteConfig } from "@/config/site";

import QuoteBlock from "@/components/QuoteBlock";
import ThemeImage from "@/components/ThemeImage";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  IconTwitter, IconLinkedin, IconInstagram,
  IconMedium, IconSubstack, IconTopmate
} from "@/components/SocialIcons";

const socialLinks = [
  { label: "X", href: siteConfig.socials.twitter, Icon: IconTwitter },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: IconLinkedin },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram },
  { label: "Medium", href: siteConfig.socials.medium, Icon: IconMedium },
  { label: "Substack", href: siteConfig.socials.substack, Icon: IconSubstack },
  { label: "Topmate", href: siteConfig.socials.topmate, Icon: IconTopmate },
].filter((l) => l.href);

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-14">

      {/* About */}
      <section className="space-y-5">
        <ThemeImage />
        <div className="space-y-1">
          <h1 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
            {siteConfig.name}
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {siteConfig.tagline}
          </p>
        </div>

        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            Hey, I&apos;m Sanyam — an engineer, builder, and creator based in India. I love working on products that sit at the intersection of design and engineering.
          </p>
          <p>
            I&apos;ve spent the last few years building software used by real people — from early-stage startups to side projects that scratched my own itch. I believe the best software is invisible: it just works, and it feels right.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m reading, writing, or obsessing over fragrances (yes, really). I document my thinking on my blog and occasionally make videos.
          </p>
        </div>

        {/* Social icons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-[--muted] hover:text-[--text-primary]"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <Icon size={14} />
            </a>
          ))}
          {siteConfig.socials.email && (
            <a
              href={siteConfig.socials.email}
              aria-label="Email"
              className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-[--muted] hover:text-[--text-primary]"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <Mail size={14} />
            </a>
          )}
        </div>
      </section>

      {/* Quote */}
      <QuoteBlock />
    </div>
  );
}
