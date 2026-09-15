// src/pages/MovieDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { fetchGenreMap, fetchMovieById } from "../api/tmdb";

export default function MovieDetails() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        const genreMap = await fetchGenreMap();
        const data = await fetchMovieById(id, genreMap);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading) {
    return <p className="no-results">Loading... 🎬</p>;
  }

  if (error || !movie) {
    return (
      <div className="details-page">
        <p className="no-results">{error || "Movie not found 😕"}</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-content">
        <img src={movie.image} alt={movie.title} className="details-image" />

        <div className="details-info">
          <h1>{movie.title}</h1>
          <div className="details-meta">
            <span className="rating-badge big">⭐ {movie.rating}</span>
          </div>

          <div className="genre-tags">
            {movie.genre.map((g) => (
              <span key={g} className="tag">
                {g}
              </span>
            ))}
          </div>

          <p className="details-about">{movie.about}</p>

          <button
            className={`fav-toggle big ${favorite ? "active" : ""}`}
            onClick={() => toggleFavorite(movie)}
          >
            {favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
