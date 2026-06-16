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
    category: "Contemporary Romance",
    items: [
      { title: "I Too Had a Love Story", author: "Ravinder Singh" },
      { title: "Can Love Happen Twice?", author: "Ravinder Singh" },
      { title: "The Boy Who Loved", author: "Durjoy Datta" },
      { title: "The Boy with a Broken Heart", author: "Durjoy Datta" },
      { title: "A Second Chance", author: "Sudeep Nagarkar" },
      { title: "The Secrets We Keep", author: "Sudeep Nagarkar" },
      { title: "The Girl of My Dreams", author: "Durjoy Datta" },
      { title: "Of Course I Love You... Till I Find Someone Better", author: "Durjoy Datta" },
      { title: "Wish I Could Tell You", author: "Durjoy Datta" },
      { title: "When Love Came Calling", author: "Preeti Shenoy" },
      { title: "It Started with a Friend Request", author: "Sudeep Nagarkar" },
      { title: "You Only Live Once", author: "Stuti Changle" },
      { title: "This Is Not Your Story", author: "Savi Sharma" },
      { title: "Everyone Has a Story (All Parts)", author: "Savi Sharma" },
      { title: "Stories We Never Tell", author: "Savi Sharma" },
      { title: "Something I Never Told You", author: "Shravya Bhinder" },
      { title: "Something I'm Waiting to Tell You", author: "Shravya Bhinder" },
    ],
  },

  {
    category: "Contemporary Fiction",
    items: [
      // { title: "You Only Live Once", author: "Stuti Changle" },
      // { title: "This Is Not Your Story", author: "Savi Sharma" },
      { title: "The Answer Is No", author: "Fredrik Backman" },
    ],
  },

  {
    category: "Philosophy & Self Discovery",
    items: [
      { title: "The Alchemist", author: "Paulo Coelho" },
    ],
  },

  {
    category: "Mythology & Spiritual Fiction",
    items: [
      { title: "The Immortals of Meluha", author: "Amish Tripathi" },
      { title: "The Hidden Hindu (All Parts)", author: "Akshat Gupta" },
      { title: "Aghori: An Untold Story", author: "Mayur Kalbag" },
    ],
  },

  {
    category: "Contemporary Hindi Fiction",
    items: [
      { title: "October Junction", author: "Divya Prakash Dubey" },
      { title: "Musafir Cafe", author: "Divya Prakash Dubey" },
    ],
  },
];
