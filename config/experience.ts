export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  isCurrent?: boolean;
  companyUrl?: string;
  tech: string[];
  points: string[];
}

export const experiences: Experience[] = [
  {
    company: "Your Company",
    role: "Software Engineer",
    period: "Jan 2025 – Present",
    location: "India (Remote)",
    type: "Full-time",
    isCurrent: true,
    companyUrl: "https://example.com",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    points: [
      "Building and shipping features used by thousands of users daily.",
      "Architected core frontend systems improving performance by 40%.",
      "Led a team of 3 engineers on a critical product initiative.",
    ],
  },
  {
    company: "Previous Company",
    role: "Frontend Developer Intern",
    period: "Jun 2024 – Dec 2024",
    location: "India (On-Site)",
    type: "Internship",
    companyUrl: "https://example.com",
    tech: ["React", "Tailwind CSS", "Next.js"],
    points: [
      "Developed reusable component library used across 5+ projects.",
      "Improved web vitals scores across key landing pages.",
    ],
  },
];
