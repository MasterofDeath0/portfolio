import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { quotes } from "@/config/quotes";
import ThemeImage from "@/components/ThemeImage";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import HeroEmailCopy from "@/components/HeroEmailCopy";
import ExperienceItem from "@/components/ExperienceItem";
import QuoteBlock from "@/components/QuoteBlock";
import { getBlogPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import { IconGithub, IconTwitter, IconLinkedin, IconYoutube, IconInstagram } from "@/components/SocialIcons";

// Random quote server-side
const quoteIndex = Math.floor(Math.random() * quotes.length);

const socialLinks = [
  { label: "X", href: siteConfig.socials.twitter, Icon: IconTwitter },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: IconLinkedin },
  { label: "GitHub", href: siteConfig.socials.github, Icon: IconGithub },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: IconYoutube },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram },
  { label: "Email", href: siteConfig.socials.email, Icon: null },
];

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="space-y-10 pt-8 pb-16">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Hero */}
        <section className="space-y-4">
          <ThemeImage />
          <div className="space-y-1">
            <h1 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
              {siteConfig.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span>{siteConfig.tagline}</span>
              <span style={{ color: "var(--text-dim)" }}>·</span>
              <HeroEmailCopy />
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {siteConfig.description}
          </p>
          <SpotifyNowPlaying />

          {/* Social icons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {socialLinks.map(({ label, href, Icon }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-[--muted] hover:text-[--text-primary]"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                >
                  {Icon ? <Icon size={14} /> : <Mail size={14} />}
                </a>
              ) : null
            )}
          </div>
        </section>
      </div>

      {/* Experience */}
      <div className="container mx-auto max-w-2xl px-4">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
            Experience
          </h2>
          <div className="space-y-2">
            {experiences.slice(0, 3).map((exp, i) => (
              <ExperienceItem key={i} exp={exp} />
            ))}
          </div>
          {experiences.length > 3 && (
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm transition-colors hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Show all work experiences
              <ArrowRight size={13} />
            </Link>
          )}
        </section>
      </div>

      {/* Blog */}
      <div className="container mx-auto max-w-2xl px-4">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
            Blog
          </h2>
          <BlogList posts={latestPosts} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm transition-colors hover:text-[--text-primary]"
            style={{ color: "var(--text-secondary)" }}
          >
            View all posts
            <ArrowRight size={13} />
          </Link>
        </section>
      </div>

      {/* Quote */}
      <div className="container mx-auto max-w-2xl px-4">
        <QuoteBlock index={quoteIndex} />
      </div>
    </div>
  );
}
