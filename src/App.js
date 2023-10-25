import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./searchIcon.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=2790824c";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Joker");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => searchMovies(searchTerm)}
          placeholder="Search for movies"
        ></input>
        <img
          onClick={() => searchMovies(searchTerm)}
          src={searchIcon}
          alt="Search"
        ></img>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
