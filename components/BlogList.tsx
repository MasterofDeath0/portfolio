"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  if (posts.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        No posts yet. Coming soon.
      </p>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX + 20, y: e.clientY - 80 });
  };

  return (
    <div className="space-y-0 relative">
      {posts.map((post) => {
        const isHovered = hoveredSlug === post.slug;
        const otherHovered = hoveredSlug !== null && !isHovered;

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block py-3 border-b transition-all duration-150"
            style={{
              borderColor: "var(--border)",
              opacity: otherHovered ? 0.4 : 1,
              filter: otherHovered ? "blur(1px)" : "none",
            }}
            onMouseEnter={() => setHoveredSlug(post.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </p>
                {post.summary && (
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {post.summary}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-1.5 py-0.5 rounded border"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
              <span className="text-xs shrink-0 mt-0.5 transition-colors" style={{ color: "var(--muted-foreground)" }}>
                Read more →
              </span>
            </div>
          </Link>
        );
      })}

      {/* Cursor preview — desktop only */}
      {hoveredSlug && (() => {
        const post = posts.find((p) => p.slug === hoveredSlug);
        return post?.image ? (
          <div
            className="fixed pointer-events-none hidden md:block z-[9999] rounded-lg overflow-hidden shadow-xl"
            style={{ left: previewPos.x, top: previewPos.y, width: 280 }}
          >
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
          </div>
        ) : null;
      })()}
    </div>
  );
}
