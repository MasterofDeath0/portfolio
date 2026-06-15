// import type { Metadata } from "next";
// import { experiences } from "@/config/experience";
// import { projects } from "@/config/projects";
// import { ExternalLink, Download } from "lucide-react";
// import { siteConfig } from "@/config/site";

// export const metadata: Metadata = {
//   title: "Resume — Sanyam Aggarwal",
//   description: "My resume — experience, skills, and projects.",
// };

// export default function ResumePage() {
//   return (
//     <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
//             {siteConfig.name}
//           </h1>
//           <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
//             {siteConfig.tagline}
//           </p>
//           <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-dim)" }}>
//             <span>{siteConfig.email}</span>
//             <span>github.com/MasterofDeath0</span>
//             <span>x.com/MasterofDeath0</span>
//           </div>
//         </div>
//         <a
//           href="#"
//           className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors hover:border-[--text-dim]"
//           style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
//         >
//           <Download size={12} />
//           PDF
//         </a>
//       </div>

//       <hr style={{ borderColor: "var(--border)" }} />

//       {/* Experience */}
//       <section className="space-y-4">
//         <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
//           Experience
//         </h2>
//         <div className="space-y-5">
//           {experiences.map((exp, i) => (
//             <div key={i} className="space-y-2">
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
//                     {exp.role}{" "}
//                     {exp.companyUrl ? (
//                       <a
//                         href={exp.companyUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-0.5 hover:underline"
//                         style={{ color: "var(--text-secondary)" }}
//                       >
//                         @ {exp.company}
//                         <ExternalLink size={10} />
//                       </a>
//                     ) : (
//                       <span style={{ color: "var(--text-secondary)" }}>@ {exp.company}</span>
//                     )}
//                   </p>
//                   <p className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
//                     {exp.location} · {exp.type}
//                   </p>
//                 </div>
//                 <span className="text-xs whitespace-nowrap flex-shrink-0" style={{ color: "var(--text-dim)" }}>
//                   {exp.period}
//                 </span>
//               </div>
//               <ul className="space-y-1">
//                 {exp.points.map((pt, j) => (
//                   <li key={j} className="text-xs flex gap-2" style={{ color: "var(--text-secondary)" }}>
//                     <span style={{ color: "var(--text-dim)" }}>–</span>
//                     {pt}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex flex-wrap gap-1.5">
//                 {exp.tech.map((t) => (
//                   <span
//                     key={t}
//                     className="text-xs px-1.5 py-0.5 rounded font-mono"
//                     style={{ background: "var(--muted)", color: "var(--text-dim)" }}
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <hr style={{ borderColor: "var(--border)" }} />

//       {/* Projects */}
//       <section className="space-y-4">
//         <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
//           Projects
//         </h2>
//         <div className="space-y-4">
//           {projects.filter((p) => p.featured).map((project) => (
//             <div key={project.title} className="space-y-1.5">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
//                   {project.title}
//                 </p>
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ color: "var(--text-dim)" }}
//                   >
//                     <ExternalLink size={11} />
//                   </a>
//                 )}
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs hover:underline"
//                     style={{ color: "var(--text-dim)" }}
//                   >
//                     GitHub
//                   </a>
//                 )}
//               </div>
//               <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
//                 {project.description}
//               </p>
//               <div className="flex flex-wrap gap-1.5">
//                 {project.tech.map((t) => (
//                   <span
//                     key={t}
//                     className="text-xs px-1.5 py-0.5 rounded font-mono"
//                     style={{ background: "var(--muted)", color: "var(--text-dim)" }}
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <hr style={{ borderColor: "var(--border)" }} />

//       {/* Skills */}
//       <section className="space-y-3">
//         <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
//           Skills
//         </h2>
//         <div className="space-y-2">
//           {[
//             { label: "Frontend", skills: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion" },
//             { label: "Backend", skills: "Node.js, Hono, PostgreSQL, Firebase, REST APIs" },
//             { label: "Mobile", skills: "React Native, Expo Router, Zustand, React Query" },
//             { label: "Tools", skills: "Git, Figma, Linear, Vercel, VS Code, Cursor" },
//           ].map((row) => (
//             <div key={row.label} className="flex gap-4 text-xs">
//               <span className="w-20 flex-shrink-0" style={{ color: "var(--muted-foreground)" }}>
//                 {row.label}
//               </span>
//               <span style={{ color: "var(--text-secondary)" }}>{row.skills}</span>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
