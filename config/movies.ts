export interface Movie {
  title: string;
  year: number;
  type?: "movie" | "show";
}

export const movies: Movie[] = [
  { title: "Interstellar", year: 2014, type: "movie" },
  { title: "Harry Potter: All Parts", year: 2001, type: "movie" },
  { title: "The Founder", year: 2016, type: "movie" },
  { title: "Inception", year: 2010, type: "movie" },
  { title: "The Intern", year: 2015, type: "movie" },
  { title: "The Social Network", year: 2010, type: "movie" },
  { title: "How I Met Your Mother", year: 2005, type: "show" },
  { title: "The Playlist", year: 2022, type: "show" },
  { title: "The Billion Dollar Code", year: 2021, type: "show" },
  { title: "Sherlock", year: 2010, type: "show" },
  { title: "Scam 1992", year: 2020, type: "show" },
  { title: "Made In India: A Titan Story", year: 2020, type: "show" },
  // { title: "Mirzapur", year: 2018, type: "show" },
  { title: "3 Idiots", year: 2009, type: "movie" },
  // { title: "Taare Zameen Par", year: 2007, type: "movie" },
  // { title: "Dangal", year: 2016, type: "movie" },
];
