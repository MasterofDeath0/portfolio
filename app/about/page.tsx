import { siteConfig } from "@/config/site";
import { quotes } from "@/config/quotes";
import QuoteBlock from "@/components/QuoteBlock";
import ThemeImage from "@/components/ThemeImage";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  IconTwitter, IconLinkedin, IconInstagram,
  IconMedium, IconSubstack, IconTopmate
} from "@/components/SocialIcons";

const academics = [
  {
    institution: "Your University",
    degree: "B.Tech in Computer Science",
    board: "University of Example",
    period: "2021 – 2025",
    type: "Undergraduate",
    gpa: "8.5 / 10",
  },
  {
    institution: "Your School",
    degree: "Class XII — Science (PCM + CS)",
    board: "CBSE Board",
    period: "2019 – 2021",
    type: "Senior Secondary",
    gpa: "92.4%",
  },
  {
    institution: "Your School",
    degree: "Class X",
    board: "CBSE Board",
    period: "2018 – 2019",
    type: "Secondary",
    gpa: "95.2%",
  },
];

const achievements = [
  {
    title: "Hackathon Winner",
    description: "Won 1st place at [Hackathon Name] — built [Project Name] in 24 hours.",
    year: "2024",
  },
  {
    title: "Open Source Contributor",
    description: "Contributed to multiple open source projects with combined 2K+ GitHub stars.",
    year: "2023",
  },
  {
    title: "Published Writer",
    description: "Articles featured in [Publication] with 10K+ total reads.",
    year: "2024",
  },
  {
    title: "Dean's List",
    description: "Awarded Dean's List recognition for academic excellence.",
    year: "2022",
  },
];

const socialLinks = [
  { label: "X", href: siteConfig.socials.twitter, Icon: IconTwitter },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: IconLinkedin },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram },
  { label: "Medium", href: siteConfig.socials.medium, Icon: IconMedium },
  { label: "Substack", href: siteConfig.socials.substack, Icon: IconSubstack },
  { label: "Topmate", href: siteConfig.socials.topmate, Icon: IconTopmate },
].filter((l) => l.href);

const quoteIndex = 1;

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

      {/* Academics */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Academics
        </h2>
        <div>
          {academics.map((edu, i) => (
            <div key={i} className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {edu.institution}
                    </p>
                    <span
                      className="text-[11px] px-1.5 py-0.5 rounded border"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--muted)" }}
                    >
                      {edu.type}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{edu.degree}</p>
                  <p className="text-xs" style={{ color: "var(--text-dim)" }}>{edu.board}</p>
                </div>
                <div className="text-right shrink-0 space-y-0.5">
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{edu.period}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{edu.gpa}</p>
                </div>
              </div>
              <div className="mt-4 h-px" style={{ background: "var(--border)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Achievements
        </h2>
        <div className="space-y-3">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {ach.title}
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {ach.description}
                </p>
              </div>
              <span
                className="text-xs shrink-0 font-mono"
                style={{ color: "var(--muted-foreground)" }}
              >
                {ach.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <QuoteBlock index={quoteIndex} />
    </div>
  );
}
