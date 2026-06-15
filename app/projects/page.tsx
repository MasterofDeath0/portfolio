



// import type { Metadata } from "next";
// import { ExternalLink } from "lucide-react";
// import { IconGithub } from "@/components/SocialIcons";
// import { projects } from "@/config/projects";

// export const metadata: Metadata = {
//   title: "Projects — Sanyam Aggarwal",
//   description: "Things I've built.",
// };

// export default function ProjectsPage() {
//   return (
//     <div className="container mx-auto max-w-2xl px-4 py-10 space-y-6">
//       <div className="space-y-1">
//         <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
//           Projects
//         </h1>
//         <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
//           Things I've built — some shipped, some in progress.
//         </p>
//       </div>

//       <div className="space-y-3">
//         {projects.map((project) => (
//           <div
//             key={project.title}
//             className="p-4 rounded-xl border space-y-2 transition-colors hover:border-[--text-dim]"
//             style={{ borderColor: "var(--border)", background: "var(--surface)" }}
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
//                     {project.title}
//                   </h2>
//                   {project.featured && (
//                     <span
//                       className="text-xs px-1.5 py-0.5 rounded border"
//                       style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
//                     >
//                       featured
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
//                   {project.description}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="transition-colors hover:text-[--text-primary]"
//                     style={{ color: "var(--muted-foreground)" }}
//                   >
//                     <IconGithub size={14} />
//                   </a>
//                 )}
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="transition-colors hover:text-[--text-primary]"
//                     style={{ color: "var(--muted-foreground)" }}
//                   >
//                     <ExternalLink size={14} />
//                   </a>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-1.5">
//               {project.tech.map((t) => (
//                 <span
//                   key={t}
//                   className="text-xs px-2 py-0.5 rounded font-mono"
//                   style={{ background: "var(--muted)", color: "var(--text-dim)" }}
//                 >
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { projects } from "@/config/projects";

export const metadata: Metadata = {
title: "Projects — Sanyam Aggarwal",
description: "Things I've built.",
};

export default function ProjectsPage() {
const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

return ( <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
{/* Header */} <div className="space-y-1">
<h1
className="text-lg font-semibold"
style={{ color: "var(--text-primary)" }}
>
Projects </h1>

```
    <p
      className="text-sm"
      style={{ color: "var(--muted-foreground)" }}
    >
      Things I've built — some shipped, some in progress.
    </p>
  </div>

  {/* Projects */}
  <div>
    {sortedProjects.map((project) => (
      <a
        key={project.id}
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-5 group"
      >
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-4">
            <p
              className="text-sm font-semibold leading-snug flex-1 transition-opacity group-hover:opacity-70"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </p>

            <ExternalLink
              size={14}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--muted-foreground)" }}
            />
          </div>

          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            {project.description}
          </p>
        </div>
      </a>
    ))}
  </div>
</div>
```

);
}

