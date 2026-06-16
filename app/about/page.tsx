import { siteConfig } from "@/config/site";

import QuoteBlock from "@/components/QuoteBlock";
import ThemeImage from "@/components/ThemeImage";
import Link from "next/link";
import { Mail } from "lucide-react";
// import {
//   IconTwitter, IconLinkedin, IconInstagram,
//   IconMedium, IconSubstack, IconTopmate
// } from "@/components/SocialIcons";

// const socialLinks = [
//   { label: "X", href: siteConfig.socials.twitter, Icon: IconTwitter },
//   { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: IconLinkedin },
//   { label: "Instagram", href: siteConfig.socials.instagram, Icon: IconInstagram },
//   { label: "Medium", href: siteConfig.socials.medium, Icon: IconMedium },
//   { label: "Substack", href: siteConfig.socials.substack, Icon: IconSubstack },
//   { label: "Topmate", href: siteConfig.socials.topmate, Icon: IconTopmate },
// ].filter((l) => l.href);

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

        <div
  className="space-y-4 text-sm leading-relaxed"
  style={{ color: "var(--text-secondary)" }}
>
  <p>
    Hey, I'm Sanyam Aggarwal.
  </p>

  <p>
    <em>
      "A jack of all trades is a master of none, but oftentimes better than a
      master of one."
    </em>
  </p>

  <p>
    It's a quote that has stayed with me for years. I've always been fascinated
    by people who refuse to fit neatly into a single box, the kind of people who
    find beauty in numbers and narratives, logic and literature, data and
    dreams. I suppose that is why I have spent my life wandering across
    disciplines, collecting stories, ideas, and perspectives along the way.
  </p>

  <p>
    At heart, I'm a curious observer of the world. My interests live at the
    intersection of product, data, analytics, finance, and creativity. I'm
    fascinated by how great ideas are built, how people make decisions, and how
    thoughtful products can shape everyday experiences. Guided by the belief
    that <em>"where there's a problem lies a great product,"</em> I enjoy
    breaking down complex problems to first principles and finding simple,
    meaningful solutions. I find myself constantly asking why things work the
    way they do.
  </p>

  <p>
    Beyond that, I'm a reader, writer, and lifelong learner. I read to see the
    world and write to see myself. You'll often find me immersed in novels,
    exploring mythology and psychology, writing stories, poems and reflections,
    painting, playing badminton, or diving into the worlds of fragrances and
    horology.
  </p>

  <p>
    More than achievements, I value curiosity. More than expertise, I value
    learning. I believe every person carries a universe of stories, every
    problem hides an opportunity, and every experience leaves behind a lesson
    waiting to be discovered.
  </p>

  <p>
    This corner of the internet is a reflection of those pursuits, a collection
    of ideas, creations, questions, and observations gathered through a lifelong
    journey of exploration.
  </p>

  <p
    className="italic"
    style={{ color: "var(--text-primary)" }}
  >
    Still learning. Still wondering. Still becoming.
  </p>
</div>

        {/* Social icons */}
        {/* <div className="flex flex-wrap items-center gap-2 pt-1">
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
        </div> */}
      </section>

      {/* Quote */}
      <QuoteBlock />
    </div>
  );
}
