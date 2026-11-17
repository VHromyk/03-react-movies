import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.tsx";
import movieService from "../../services/movieService.ts";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type { Movie } from "../../types/movie.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onSubmitHandler = async (query: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);
      const movies = await movieService.search(query);

      if (movies.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(movies.results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectMovieHandler = (movie: Movie) => {
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const onCloseModalHandler = () => {
    setSelectedMovie(null)

  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmitHandler} />

      {isError && <ErrorMessage />}

      {isLoading && <Loader />}

      {movies.length > 0 && (
        <MovieGrid onSelect={onSelectMovieHandler} movies={movies} />
      )}

      {selectedMovie && (
        <MovieModal
          selectedMovie={selectedMovie}
          onClose={onCloseModalHandler}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
