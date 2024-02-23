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
import { useMovies } from "./useMovies";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  // whenever the initial value of the useState hook depends on some sort of computation we should always pass a function like this(a function that react can execute on its initial render)
  // Lazy evaluation
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
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
              watched={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedMoviesList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// Side effect is any "interaction between a react component and the world outside the component". also think of it as "code that actually does sthg".

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

// the cleanup function
// USEEFFECT cleanup function
// function that we can return from an effect (optional)
// runs on 2 diff occassions:
// 1- Before the effect is executed again
// 2- After a component has unmounted
// we need a cleanup function whenever the side effect keeps happening after the component rerendered or un mounted
// each effect should only do one thing

// custom hooks allow us to reuse non-visual logic in multiple components, and should only have one purpose
// Custom hooks, needs to start with use, needs to use one or more hooks, unlike components can recieve and return any relevant data (usually [] or {})
