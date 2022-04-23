import "./App.css";
import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=487a5a78";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTitle);
    searchMovies(searchTitle);

    setSearchTerm("");
  };

  const handleChange = () => {
    searchMovies(searchTitle);
    setSearchTerm("");
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search for movies"
            value={searchTitle}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <img src={SearchIcon} alt="search" onClick={handleChange} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, id) => (
            <MovieCard key={id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
