"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTime: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Blog
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Thoughts on building, tech, and life.
        </p>
      </div>

      {/* Tag filters */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-colors border"
              style={{
                borderColor: activeTag === tag ? "var(--text-primary)" : "var(--border)",
                background: activeTag === tag ? "var(--text-primary)" : "transparent",
                color: activeTag === tag ? "var(--background)" : "var(--muted-foreground)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg animate-pulse" style={{ background: "var(--muted)" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          No posts yet. Check back soon.
        </p>
      ) : (
        <div className="space-y-px">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block py-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate transition-colors group-hover:text-[--text-primary]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </p>
                  {post.summary && (
                    <p className="text-xs line-clamp-1" style={{ color: "var(--muted-foreground)" }}>
                      {post.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs"
                        style={{ color: "var(--text-dim)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 space-y-0.5">
                  <p className="text-xs tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                    {formatDate(post.date)}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                    {post.readingTime} min read
                  </p>
                </div>
              </div>
              <div className="mt-3 h-px" style={{ background: "var(--border)" }} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
