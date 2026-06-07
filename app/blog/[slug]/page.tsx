import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Sanyam Aggarwal`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-[--text-primary]"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={13} />
        All posts
      </Link>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded border"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {post.summary}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-dim)" }}>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      <hr style={{ borderColor: "var(--border)" }} className="mb-8" />

      {/* Content */}
      <article className="prose prose-sm max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </div>
  );
}
