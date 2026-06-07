export interface Book {
  title: string;
  author: string;
  year?: number;
}

export interface BookCategory {
  category: string;
  items: Book[];
}

export const books: BookCategory[] = [
  {
    category: "Tech & Building",
    items: [
      { title: "Zero to One", author: "Peter Thiel", year: 2024 },
      { title: "The Lean Startup", author: "Eric Ries", year: 2023 },
      { title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt", year: 2024 },
      { title: "Clean Code", author: "Robert C. Martin", year: 2023 },
    ],
  },
  {
    category: "Mindset & Growth",
    items: [
      { title: "Atomic Habits", author: "James Clear", year: 2024 },
      { title: "Deep Work", author: "Cal Newport", year: 2024 },
      { title: "The Psychology of Money", author: "Morgan Housel", year: 2023 },
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: 2023 },
    ],
  },
  {
    category: "Philosophy",
    items: [
      { title: "Meditations", author: "Marcus Aurelius", year: 2024 },
      { title: "Bhagavad Gita", author: "Eknath Easwaran (trans.)", year: 2024 },
      { title: "Man's Search for Meaning", author: "Viktor E. Frankl", year: 2023 },
    ],
  },
];
