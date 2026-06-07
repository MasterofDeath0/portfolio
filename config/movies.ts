export interface Movie {
  title: string;
  year: number;
  type?: "movie" | "show";
}

export const movies: Movie[] = [
  { title: "Interstellar", year: 2014, type: "movie" },
  { title: "The Dark Knight", year: 2008, type: "movie" },
  { title: "Oppenheimer", year: 2023, type: "movie" },
  { title: "Inception", year: 2010, type: "movie" },
  { title: "Dune: Part Two", year: 2024, type: "movie" },
  { title: "The Social Network", year: 2010, type: "movie" },
  { title: "Breaking Bad", year: 2008, type: "show" },
  { title: "Chernobyl", year: 2019, type: "show" },
  { title: "Black Mirror", year: 2011, type: "show" },
  { title: "Succession", year: 2018, type: "show" },
  { title: "Scam 1992", year: 2020, type: "show" },
  { title: "Panchayat", year: 2020, type: "show" },
  { title: "Mirzapur", year: 2018, type: "show" },
  { title: "3 Idiots", year: 2009, type: "movie" },
  { title: "Taare Zameen Par", year: 2007, type: "movie" },
  { title: "Dangal", year: 2016, type: "movie" },
];
