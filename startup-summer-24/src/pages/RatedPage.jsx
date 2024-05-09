import { useEffect, useState } from "react";
import { Group, Box, Text, Loader } from "@mantine/core";
import { SearchPanel } from "../components/SearchPanel";
import { MoviesPanel } from "../components/MoviesPanel";

export const RatedPage = () => {
  const rated = JSON.parse(localStorage.getItem("rated")) || {};
  const [movies, setMovies] = useState(Object.values(rated))

  const removeMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  return (
    <Box component="main" mih="100vh">

      <Group display="flex" justify="space-between" mb={33}>
        <Text fz={32} fw="bold" lh="140%">Rated movies</Text>
        <SearchPanel />
      </Group>

      <Box align="center">
        {movies ? <MoviesPanel movies={movies} removeMovie={removeMovie} /> : <Loader size={50} color="var(--purple-500)" />}
      </Box>
    </Box>
  )
}