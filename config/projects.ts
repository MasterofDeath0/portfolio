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
    id: 10,
    title: "FocusLoop",
    description: "A dopamine detox tool that helps users reclaim attention through structured focus challenges and habit-building.",
    // tech: ["Product", "Behavior Design", "Productivity"],
    liveUrl: "https://focusloop.runable.site/",
    // featured: true,
    },
    {
    id: 9,
    title: "BrainBrew",
    description: "Drop any concept and get a crystal-clear explanation, then instantly transform it into a shareable content thread.",
    // tech: ["AI", "Content Creation", "Education"],
    liveUrl: "https://brainbrew.runable.site/",
    // featured: true,
    },
    {
    id: 8,
    title: "Karwaan",
    description: "Travel-tech platform focused on simplifying group travel planning, coordination, and bookings.",
    // tech: ["Travel Tech", "Product Strategy", "Marketplace"],
    liveUrl: "https://sanyamaggarwal.notion.site/Karwaan-Travel-Tech-Company-1bdb2915b87b8004b51ee474bcea1505?pvs=4",
    // featured: true,
    },
    {
    id: 7,
    title: "Product Analysis — Uber Shuttle",
    description: "Comprehensive product teardown with feature recommendations, user experience improvements, and growth opportunities.",
    // tech: ["Product Management", "Growth", "User Research"],
    liveUrl: "https://drive.google.com/file/d/1ndIX2RDMhNp5Ckzh8TUYZ5SEx7kFR0As/view?usp=drivesdk",
    // featured: true,
    },
    {
    id: 6,
    title: "Product Analysis — AstroTalk",
    description: "Detailed product analysis identifying feature enhancements and opportunities to improve engagement and retention.",
    // tech: ["Product Analysis", "Consumer Apps", "Growth"],
    liveUrl: "https://drive.google.com/file/d/1sNyTNbzGMs_hFm-f6Lteow2S8AX7CzwN/view?usp=drivesdk",
    // featured: true,
    },
    {
    id: 5,
    title: "Product Analysis — Housing.com (Pay on Credit)",
    description: "Explored credit-based payment solutions aimed at improving repeat user conversions and customer retention.",
    // tech: ["Fintech", "Product Strategy", "Conversion"],
    liveUrl: "https://drive.google.com/file/d/1cTp2n6MnV7yjj_tVKSh8XXJw_2reMx0y/view?usp=drivesdk",
    // featured: true,
    },
    {
    id: 4,
    title: "SilentBell",
    description: "A product design solution for hearing-impaired individuals, reimagining the traditional doorbell experience.",
    // tech: ["Product Design", "Accessibility", "UX"],
    liveUrl: "https://supersanyam.medium.com/tackling-a-product-design-question-262b1429917d",
    // featured: false,
    },
    {
    id: 3,
    title: "LearnLink",
    description: "A platform designed to connect learners, mentors, and communities to make learning more collaborative.",
    // tech: ["EdTech", "Community", "Product Design"],
    liveUrl: "https://sanyamaggarwal.notion.site/LearnLink-Connecting-Learners-Everywhere-d00f821dfa1c4245965cdf8dc8a27bae?pvs=4",
    // featured: false,
    },
    {
    id: 2,
    title: "AppFlow",
    description: "A user-centric product optimization framework focused on improving onboarding, activation, and retention.",
    // tech: ["Product Optimization", "Analytics", "UX"],
    liveUrl: "https://sanyamaggarwal.notion.site/AppFlow-User-Centric-Product-Optimization-0caa705540784eb2932f2265db7af608?pvs=4",
    // featured: false,
    },
    {
    id: 1,
    title: "Rollin' Data",
    description: "A business and product analysis of Rolls Company exploring operational, growth, and strategic insights.",
    // tech: ["Business Analysis", "Strategy", "Data"],
    liveUrl: "https://supersanyam.medium.com/rollin-data-an-analysis-of-roll-company-9a5de961747a",
    // featured: false,
    },
  // {
  //   title: "FocusLoop",
  //   description: "A Gen-Z doomscrolling detox app. Beat social media addiction with a 30-day focus challenge.",
  //   tech: ["React", "Vite", "Tailwind CSS", "LocalStorage"],
  //   liveUrl: "https://focusloop.app",
  //   githubUrl: "https://github.com/MasterofDeath0/focusloop",
  //   featured: true,
  // },
  // {
  //   title: "FRAGR",
  //   description: "Trust-first perfume resale marketplace for Indian fragrance enthusiasts.",
  //   tech: ["React Native", "Expo", "Firebase", "Zustand"],
  //   githubUrl: "https://github.com/MasterofDeath0/fragr",
  //   featured: true,
  // },
  // {
  //   title: "FitVeda",
  //   description: "AI-powered Indian meal planning app with personalized diet recommendations.",
  //   tech: ["React", "Hono", "Tailwind CSS", "Claude AI"],
  //   featured: true,
  // },
  // {
  //   title: "Portfolio",
  //   description: "This website — built with Next.js 15, MDX blog, Framer Motion and the iconic oneko cat.",
  //   tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
  //   githubUrl: "https://github.com/MasterofDeath0/portfolio",
  //   featured: false,
  // },
];
