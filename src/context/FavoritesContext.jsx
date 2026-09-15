// src/context/FavoritesContext.jsx
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favMovies");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(movie) {
    const exists = favorites.some((m) => m.id === movie.id);
    const updatedFavorites = exists
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favMovies", JSON.stringify(updatedFavorites));
  }

  function isFavorite(id) {
    return favorites.some((m) => m.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
