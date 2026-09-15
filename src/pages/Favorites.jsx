// src/pages/Favorites.jsx
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <>
      <Link
        to="/"
        className="back-btn"
        style={{ textDecoration: "none", display: "inline-block" }}
      >
        ← Back to Movies
      </Link>

      <h2 style={{ margin: "10px 0 20px" }}>❤️ Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="no-results">No favorites yet — go add some! 😕</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
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
