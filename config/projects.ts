export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "FocusLoop",
    description: "A Gen-Z doomscrolling detox app. Beat social media addiction with a 30-day focus challenge.",
    tech: ["React", "Vite", "Tailwind CSS", "LocalStorage"],
    liveUrl: "https://focusloop.app",
    githubUrl: "https://github.com/MasterofDeath0/focusloop",
    featured: true,
  },
  {
    title: "FRAGR",
    description: "Trust-first perfume resale marketplace for Indian fragrance enthusiasts.",
    tech: ["React Native", "Expo", "Firebase", "Zustand"],
    githubUrl: "https://github.com/MasterofDeath0/fragr",
    featured: true,
  },
  {
    title: "FitVeda",
    description: "AI-powered Indian meal planning app with personalized diet recommendations.",
    tech: ["React", "Hono", "Tailwind CSS", "Claude AI"],
    featured: true,
  },
  {
    title: "Portfolio",
    description: "This website — built with Next.js 15, MDX blog, Framer Motion and the iconic oneko cat.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    githubUrl: "https://github.com/MasterofDeath0/portfolio",
    featured: false,
  },
];
