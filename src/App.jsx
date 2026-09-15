// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";

function Header({ isDark, setIsDark }) {
  const { favorites } = useFavorites();

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${showNav ? "" : "header-hidden"}`}>
      <Link to="/" className="logo">
        🎬 MovieSelector
      </Link>

      <div className="header-actions">
        <Link to="/favorites">
          <button className="fav-toggle">
            ❤️ Favorites ({favorites.length})
          </button>
        </Link>
        <button className="mode-btn" onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className={isDark ? "app dark" : "app"}>
          <Header isDark={isDark} setIsDark={setIsDark} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
