import Link from "next/link";
import { Mail } from "lucide-react";
import ShowAllButton from "@/components/ShowAllButton";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import ThemeImage from "@/components/ThemeImage";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import HeroEmailCopy from "@/components/HeroEmailCopy";
import ExperienceItem from "@/components/ExperienceItem";
import QuoteBlock from "@/components/QuoteBlock";
import PageTransition from "@/components/PageTransition";
// import { getBlogPosts } from "@/lib/blog";
import {
  IconTwitter, IconLinkedin, IconInstagram,
  IconMedium, IconSubstack, IconTopmate,IconPen,IconCamera,
} from "@/components/SocialIcons";
// import { formatDate } from "@/lib/utils";
import { blogs } from "@/config/blog";

const socialLinks = [
  { label: "X",         href: siteConfig.socials.twitter,   Icon: IconTwitter  },
  { label: "LinkedIn",  href: siteConfig.socials.linkedin,  Icon: IconLinkedin },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram},
  { label: "Medium",    href: siteConfig.socials.medium,    Icon: IconMedium   },
  { label: "Substack",  href: siteConfig.socials.substack,  Icon: IconSubstack },
  { label: "Topmate",   href: siteConfig.socials.topmate,   Icon: IconTopmate  },
  { label: "Writing",   href: siteConfig.socials.instagram2,   Icon: IconPen  },
].filter((l) => l.href);

// export default async function Home() {
//   const posts = await getBlogPosts();
//   const latestPosts = posts.slice(0, 3);
//   const previewExperiences = experiences.slice(0, 3);

export default async function Home() {
  const latestPosts = [...blogs]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);
  const previewExperiences = experiences.slice(0, 3);

  return (
    <PageTransition>
      <div className="space-y-14 pt-8 pb-16">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Hero — avatar LEFT + name/tagline RIGHT */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <ThemeImage />
              <div className="space-y-1">
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {siteConfig.name}
                </h1>
                {/* <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span>{siteConfig.tagline}</span>
                  <span style={{ color: "var(--text-dim)" }}>·</span>
                  <HeroEmailCopy />
                </div> */}
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}>
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {siteConfig.description}
            </p>

            <SpotifyNowPlaying />

            {/* Social icons — raw, no bordered boxes */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-opacity hover:opacity-60"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <Icon size={17} />
                </a>
              ))}
              {siteConfig.socials.email && (
                <a
                  href={siteConfig.socials.email}
                  aria-label="Email"
                  className="transition-opacity hover:opacity-60"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <Mail size={17} />
                </a>
              )}
            </div>
          </section>
        </div>

        {/* Experience */}
        <div className="container mx-auto max-w-2xl px-4">
          <section className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Experience
            </h2>
            <div>
              {previewExperiences.map((exp, i) => (
                <ExperienceItem key={i} exp={exp} />
              ))}
            </div>
            <div className="flex justify-center pt-1">
              <ShowAllButton href="/work" label="Show all work experiences" />
            </div>
          </section>
        </div>

        {/* Blog */}
        {/* <div className="container mx-auto max-w-2xl px-4">
          <section className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Blog
            </h2>
            <div>
              {latestPosts.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No posts yet.</p>
              ) : (
                latestPosts.map((post) => {
                  const href = post.link ?? `/blog/${post.slug}`;
                  const isExternal = !!post.link;
                  return (
                    <a
                      key={post.slug}
                      href={href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block py-3.5 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p
                            className="text-sm font-medium transition-colors group-hover:opacity-70"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {post.title}
                          </p>
                          {post.summary && (
                            <p className="text-xs line-clamp-1" style={{ color: "var(--muted-foreground)" }}>
                              {post.summary}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-dim)" }}>
                            <span>📅</span>
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        <span
                          className="text-xs shrink-0 transition-colors group-hover:text-[--text-primary]"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          Read more →
                        </span>
                      </div>
                    </a>
                  );
                })
              )}
            </div>
            <div className="flex justify-center pt-1">
              <ShowAllButton href="/blog" label="Show all blogs" />
            </div>
          </section>
        </div> */}

        {/* Blog */}
<div className="container mx-auto max-w-2xl px-4">
  <section className="space-y-4">
    <h2
      className="text-xl font-bold"
      style={{ color: "var(--text-primary)" }}
    >
      Blog
    </h2>

    <div>
      {latestPosts.length === 0 ? (
        <p
          className="text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          No posts yet.
        </p>
      ) : (
        latestPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3.5 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5 flex-1 min-w-0">
                <p
                  className="text-sm font-medium transition-opacity group-hover:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </p>

                {post.summary && (
                  <p
                    className="text-xs line-clamp-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {post.summary}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-dim)",
                        background: "var(--muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className="text-xs shrink-0 transition-colors group-hover:text-[--text-primary]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {post.source === "Medium"
                  ? "Read More →"
                  : post.source === "Substack"
                  ? "Read More →"
                  : "Read More →"}
              </span>
            </div>
          </a>
        ))
      )}
    </div>

    <div className="flex justify-center pt-1">
      <ShowAllButton href="/blog" label="Show all blogs" />
    </div>
  </section>
</div>

        {/* Quote — random on every refresh */}
        <div className="container mx-auto max-w-2xl px-4">
          <QuoteBlock />
        </div>
      </div>
    </PageTransition>
  );
}
