export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
  category?: "award" | "certification" | "hackathon" | "recognition" | "other";
}

export const achievements: Achievement[] = [
  {
    title: "Winner — National Hackathon",
    issuer: "HackIndia 2024",
    date: "2024",
    description: "Built an AI-powered fintech solution, won among 500+ teams.",
    category: "hackathon",
  },
  {
    title: "Top 10 — XYZ Startup Competition",
    issuer: "IIT Delhi E-Cell",
    date: "2023",
    description: "Pitched a SaaS product to a panel of investors and VCs.",
    category: "award",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    category: "certification",
    link: "https://aws.amazon.com/certification/",
  },
];
