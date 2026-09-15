// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="movie-card">
      <div className="image-wrap">
        <Link to={`/movie/${movie.id}`}>
          <img src={movie.image} alt={movie.title} className="movie-image" />
        </Link>
        <button
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <span className="rating-badge">⭐ {movie.rating}</span>
      </div>
      <div className="card-body">
        <Link to={`/movie/${movie.id}`} className="title-link">
          <h4>{movie.title}</h4>
        </Link>
        <p className="about">{movie.about}</p>
        <div className="genre-tags">
          {movie.genre.map((g) => (
            <span key={g} className="tag">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
