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
    institution: "Netaji Subhas University of Technology (erstwhile NSIT), Delhi",
    degree: "Bachelor of Technology",
    field: "Biotechnology",
    period: "2020 – 2024",
    grade: "8.6 CGPA",
    location: "India",
    highlights: [
      "Attained the prestigious Department Rank 1 with an overall CGPA of 8.5, for an impressive streak of 4 consecutive years in college.",
      "Honoured with the prestigious Vice Chancellor's Gold Medal for graduating as Department Rank 1 in college.",
    ],
    institutionUrl: "https://nsut.ac.in/en/home",
  },
  {
    institution: "Hansraj Model School, Delhi (C.B.S.E.)",
    degree: "Class XII",
    field: "PCM",
    period: "2019 – 2020",
    grade: "95.2%",
    location: "India",
    highlights: [
      "Achieved the award for academic excellence for 7 consecutive years in school from class 6th to 12th.",
    ],
    {
    institution: "Hansraj Model School, Delhi (C.B.S.E.)",
    degree: "Class X",
    field: "",
    period: "2017 – 2018",
    grade: "91.4%",
    location: "India",
    highlights: [
      "Achieved the award for academic excellence for 5 consecutive years in school from class 6th to 12th.",
    ]
    institutionUrl: "http://hansrajmodelschool.org/",
  }
];
