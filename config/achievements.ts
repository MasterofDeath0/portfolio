export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
  category?: "award" | "certification" | "hackathon" | "recognition" | "other" | "leadership";
}

export const achievements: Achievement[] = [
  {
  title: "Founder — Covid Leads",
  issuer: "Community Initiative",
  date: "2021",
  description: "Led a volunteer network of 250+ contributors to provide verified Covid-19 resources and emergency support during the pandemic.",
  category: "leadership",
},
  
  {
  title: "AIR 5 — National Entrepreneurship Challenge",
  issuer: "E-Summit 2023, IIT Bombay",
  date: "2023",
  description: "Secured All India Rank 5 among 800+ teams in one of India's largest entrepreneurship competitions.",
  category: "award",
},
  
{
  title: "Top 10 — The Corporate Duel",
  issuer: "E-Summit 2023, IIT Bombay",
  date: "2023",
  description: "Finished among the top 10 teams out of 5,000+ participants in a national-level business and strategy competition.",
  category: "award",
},

{
  title: "First Runner-Up — Startup Weekend",
  issuer: "eCell DTU",
  date: "2021",
  description: "Secured second place among 50+ teams by developing and pitching a startup idea within a limited timeframe.",
  category: "award",
},

{
  title: "Semi-Finalist — Projectile Case Competition",
  issuer: "Assets DTU",
  date: "2021",
  description: "Reached the Top 20 teams out of 2,000+ participants in a national-level case study competition.",
  category: "award",
},

{
  title: "Semi-Finalist — Tasavvur Poetry Competition",
  issuer: "Tasavvur",
  date: "2021",
  description: "Advanced to the semi-finals among 40+ participants, showcasing original Hindi poetry.",
  category: "award",
  link: "https://youtu.be/GrYQUgfc7J4?si=Q2-9v9lrNHc3t4xh",
},

{
  title: "Gold Medal — Akhil Bhartiya Hindi Olympiad",
  issuer: "Akhil Bhartiya Hindi Olympiad",
  date: "2018",
  description: "Awarded Gold Medal for outstanding performance in a national-level Hindi language competition.",
  category: "award",
},
];
