export interface AcademicEntry {
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  location?: string;
  highlights?: string[];
  institutionUrl?: string;
}

export const academics: AcademicEntry[] = [
  {
    institution: "Your University",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    period: "2021 – 2025",
    grade: "8.5 CGPA",
    location: "India",
    highlights: [
      "Focused on distributed systems and full-stack development",
      "Led the tech team at the entrepreneurship cell",
      "Represented university at national hackathons",
    ],
    institutionUrl: "https://example.edu",
  },
];
