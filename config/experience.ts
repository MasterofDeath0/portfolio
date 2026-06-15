export interface Experience {
  id: number,
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  isCurrent?: boolean;
  companyUrl?: string;
  tech?: string[];
  points: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "noon",
    role: "Analyst",
    period: "May 2025 – Present",
    location: "Gurugram, Haryana",
    type: "Full-time",
    isCurrent: true,
    companyUrl: "https://www.noon.com/uae-en/",
    // tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    points: [
      'Optimising everything between "I need this" and "It\'s already here."',
      // "Architected core frontend systems improving performance by 40%.",
      // "Led a team of 3 engineers on a critical product initiative.",
    ],
  },
  {
    company: "Tata 1mg",
    role: "Analyst",
    period: "Jul 2024 – May 2025",
    location: "Gurugram, Haryana",
    type: "Full-time",
    companyUrl: "https://www.1mg.com/",
    // tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "Making sure medicines show up where they should, when they should, and in the right quantities.",
      // "Improved web vitals scores across key landing pages.",
    ],
  },
   {
    company: "Tata 1mg",
    role: "Analyst Intern",
    period: "Jan 2024 – Jun 2024",
    location: "Gurugram, Haryana",
    type: "Internship",
    companyUrl: "https://www.1mg.com/",
    // tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "Understanding not just what users did, but why they did it.",
      // "Improved web vitals scores across key landing pages.",
    ],
  },
  {
    company: "The Product Folks",
    role: "Growth & Product Intern",
    period: "Jul 2022 – Apr 2023",
    location: "Remote",
    type: "Internship",
    companyUrl: "https://www.1mg.com/",
    // tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "Spent a year helping product enthusiasts grow. Ended up becoming one myself.",
      // "Improved web vitals scores across key landing pages.",
    ],
  },
  {
    company: "Loop Subscriptions",
    role: "Research Analyst Intern",
    period: "Sep 2022 – Dec 2022",
    location: "Gurugram, Haryana",
    type: "Internship",
    companyUrl: "https://www.loopwork.co/",
    // tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "Exploring what separates growing brands from forgotten ones",
      // "Improved web vitals scores across key landing pages.",
    ],
  },
  {
    company: "SelectricGo",
    role: "Founding Member & Product Manager",
    period: "Sep 2021 – Jun 2022",
    location: "Gurugram, Haryana",
    type: "Startup",
    companyUrl: "https://www.1mg.com/",
    // tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "My first taste of building from 0 to 1, long before I knew I'd end up in product.",
      // "Improved web vitals scores across key landing pages.",
    ],
  },
];
