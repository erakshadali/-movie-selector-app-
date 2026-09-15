// src/pages/Home.jsx
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";
import { fetchGenreMap, fetchPopularMovies, formatMovie } from "../api/tmdb";

export default function Home() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const genreMap = await fetchGenreMap();
        const rawMovies = await fetchPopularMovies();
        const formatted = rawMovies.map((m) => formatMovie(m, genreMap));
        setMovies(formatted);
      } catch (err) {
        setError(
          "Failed to load movies. Please check your connection or API key.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const genreList = ["all", ...new Set(movies.flatMap((movie) => movie.genre))];

  let moviesToShow =
    selectedGenre === "all"
      ? movies
      : movies.filter((movie) => movie.genre.includes(selectedGenre));

  let finalMovies = moviesToShow.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortOrder === "high") {
    finalMovies = [...finalMovies].sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === "low") {
    finalMovies = [...finalMovies].sort((a, b) => a.rating - b.rating);
  }

  if (loading) {
    return <p className="no-results">Loading movies... 🎬</p>;
  }

  if (error) {
    return <p className="no-results">{error}</p>;
  }

  return (
    <>
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="genre-bar">
        {genreList.map((genre) => (
          <button
            key={genre}
            className={
              selectedGenre === genre ? "genre-btn active" : "genre-btn"
            }
            onClick={() => setSelectedGenre(genre)}
          >
            {genre[0].toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      <div className="sort-bar">
        <span>Sort by rating:</span>
        <button
          className={sortOrder === "high" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortOrder("high")}
        >
          High → Low
        </button>
        <button
          className={sortOrder === "low" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortOrder("low")}
        >
          Low → High
        </button>
        <button
          className={sortOrder === "none" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortOrder("none")}
        >
          Reset
        </button>
      </div>

      {finalMovies.length === 0 ? (
        <p className="no-results">No movies found 😕</p>
      ) : (
        <div className="movie-grid">
          {finalMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
