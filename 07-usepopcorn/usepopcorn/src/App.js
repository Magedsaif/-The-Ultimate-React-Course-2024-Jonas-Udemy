import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { NavBar } from "./NavBar";
import { NumResults } from "./NumResults";
import { Search } from "./Search";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
// Side effect is any "interactio between a react component and the world outside the component". also think of it as "code that actually does sthg".

// Examples: Data fetching, setting up subscriptions, setting up timers, manually accessing the DOM, etc.

// Effects allow us to write code that will run at differnent moments of the component instance life cycle: mount, re-render, or unmount
// event handlers and use effects could produce the same result but at different moments
// the real reason why effects exist is not to run code at different points of the life cycle
// but to keep a component synchronized with some externel system, on the other hand we use handlers to react to certain events that happend in user interface, and its the prefferd way of creating side effects

/*   // Effects only run after the browser paint
  useEffect(function () {
    console.log("After the initial render");
  }, []);

  // has no DA, so this affext is synchronized with every thing, so it needs to eun with every render
  useEffect(function () {
    console.log("After every render");
  });

  useEffect(
    function () {
      console.log("D");
    },
    [query]
  );
  // this a render logic, so it runs during render
  console.log("During render"); */
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery}></Search>
        {<NumResults movies={movies}></NumResults>}
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? (
            <Loader></Loader>
          ) : (
            <MovieList movies={movies}></MovieList>
          )} */}
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMoviesList watched={watched}></WatchedMoviesList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
