// src/api/tmdb.js

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: "application/json",
};

// Genre id -> name mapping (TMDB movies ko sirf genre IDs deta hai)
export async function fetchGenreMap() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
    headers,
  });
  const data = await res.json();
  const map = {};
  data.genres.forEach((g) => {
    map[g.id] = g.name.toLowerCase();
  });
  return map;
}

// Popular movies fetch karna
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
    { headers },
  );
  const data = await res.json();
  return data.results;
}

// Search movies by title
export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
    { headers },
  );
  const data = await res.json();
  return data.results;
}

// TMDB raw movie object ko humare app ke format mein convert karna
// formatMovie function ko is se replace karo:
export function formatMovie(movie, genreMap) {
  return {
    id: movie.id,
    title: movie.title,
    genre: (movie.genre_ids || movie.genres?.map((g) => g.id) || [])
      .map((id) => genreMap[id])
      .filter(Boolean),
    rating: Math.round(movie.vote_average * 10) / 10,
    about: movie.overview || "No description available.",
    image: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image",
  };
}

// Ye naya function file ke end mein add karo:
export async function fetchMovieById(id, genreMap) {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
    headers,
  });
  const data = await res.json();
  return formatMovie(data, genreMap);
}
