// "use client";

// import { useState, useEffect } from "react";
// import { formatDate } from "@/lib/utils";

// interface Post {
//   slug: string;
//   title: string;
//   summary: string;
//   date: string;
//   tags: string[];
//   link?: string;
//   readingTime: number;
// }

// export default function BlogPage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [activeTag, setActiveTag] = useState("All");

//   useEffect(() => {
//     fetch("/api/blog")
//       .then((r) => r.json())
//       .then((data) => setPosts(Array.isArray(data) ? data : (data.posts ?? [])));
//   }, []);

//   // Build tag counts
//   const tagCounts: Record<string, number> = { All: posts.length };
//   for (const post of posts) {
//     for (const tag of post.tags) {
//       tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
//     }
//   }
//   const allTags = ["All", ...Object.keys(tagCounts).filter((t) => t !== "All")];

//   const filtered =
//     activeTag === "All"
//       ? posts
//       : posts.filter((p) => p.tags.includes(activeTag));

//   return (
//     <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
//       {/* Header */}
//       <div className="space-y-1">
//         <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
//           Blog
//         </h1>
//         <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
//           Thoughts on building, tech, and life.
//         </p>
//       </div>

//       {/* Category filter pills */}
//       {posts.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {allTags.map((tag) => {
//             const count = tagCounts[tag] ?? 0;
//             const isActive = activeTag === tag;
//             return (
//               <button
//                 key={tag}
//                 onClick={() => setActiveTag(tag)}
//                 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors"
//                 style={
//                   isActive
//                     ? {
//                         background: "var(--text-primary)",
//                         color: "var(--background)",
//                         border: "1px solid transparent",
//                       }
//                     : {
//                         background: "transparent",
//                         color: "var(--text-secondary)",
//                         border: "1px solid var(--border)",
//                       }
//                 }
//               >
//                 {tag}
//                 <span
//                   className="text-[10px]"
//                   style={{ opacity: isActive ? 0.7 : 0.5 }}
//                 >
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       )}

//       {/* Post list */}
//       {filtered.length === 0 ? (
//         <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
//           No posts yet. Check back soon.
//         </p>
//       ) : (
//         <div>
//           {filtered.map((post) => {
//             const href = post.link ?? `/blog/${post.slug}`;
//             const isExternal = !!post.link;
//             return (
//               <a
//                 key={post.slug}
//                 href={href}
//                 {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
//                 className="block py-5 group"
//               >
//                 <div className="space-y-1.5">
//                   {/* Title + Read more row */}
//                   <div className="flex items-start justify-between gap-4">
//                     <p
//                       className="text-sm font-semibold leading-snug transition-opacity group-hover:opacity-70 flex-1 min-w-0"
//                       style={{ color: "var(--text-primary)" }}
//                     >
//                       {post.title}
//                     </p>
//                     <span
//                       className="text-xs shrink-0 transition-colors group-hover:text-[--text-primary] mt-0.5"
//                       style={{ color: "var(--muted-foreground)" }}
//                     >
//                       Read more →
//                     </span>
//                   </div>

//                   {/* Summary */}
//                   {post.summary && (
//                     <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
//                       {post.summary}
//                     </p>
//                   )}

//                   {/* Meta row: tags + date */}
//                   <div className="flex flex-wrap items-center gap-2 pt-0.5">
//                     {post.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="text-[10px] px-2 py-0.5 rounded-full border"
//                         style={{
//                           borderColor: "var(--border)",
//                           color: "var(--text-dim)",
//                           background: "var(--muted)",
//                         }}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                     <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-dim)" }}>
//                       📅 {formatDate(post.date)}
//                     </span>
//                     {post.readingTime && (
//                       <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>
//                         · {post.readingTime} min read
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { blogs } from "@/config/blog";

const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const tagCounts: Record<string, number> = {
    All: sortedBlogs.length,
  };

  sortedBlogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    });
  });

  const allTags = [
    "All",
    ...Object.keys(tagCounts).filter((t) => t !== "All"),
  ];

  const filtered =
    activeTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.tags.includes(activeTag));

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Blog
        </h1>

        <p
          className="text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Thoughts on building, tech, and life.
        </p>
      </div>

      {/* Scrollable Tags */}
      {sortedBlogs.length > 0 && (
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-2 min-w-max pb-1">
            {allTags.map((tag) => {
              const count = tagCounts[tag] ?? 0;
              const isActive = activeTag === tag;

              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                  style={
                    isActive
                      ? {
                          background: "var(--text-primary)",
                          color: "var(--background)",
                        }
                      : {
                          background: "transparent",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border)",
                        }
                  }
                >
                  {tag}

                  <span
                    className="text-[10px]"
                    style={{ opacity: isActive ? 0.7 : 0.5 }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Blog List */}
      {filtered.length === 0 ? (
        <p
          className="text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          No posts yet. Check back soon.
        </p>
      ) : (
        <div>
          {filtered.map((blog) => (
            <a
              key={blog.id}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-5 group"
            >
              <div className="space-y-1.5">
                {/* Title + CTA */}
                <div className="flex items-start justify-between gap-4">
                  <p
                    className="text-sm font-semibold leading-snug transition-opacity group-hover:opacity-70 flex-1 min-w-0"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {blog.title}
                  </p>

                  <span
                    className="text-xs shrink-0 transition-colors group-hover:text-[--text-primary] mt-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {blog.source === "Medium"
                      ? "Read on Medium →"
                      : blog.source === "Substack"
                      ? "Read on Substack →"
                      : "Read more →"}
                  </span>
                </div>

                {/* Summary */}
                {blog.summary && (
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {blog.summary}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full border"
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
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
