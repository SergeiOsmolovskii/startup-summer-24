import { Group } from "@mantine/core";
import { MovieCard } from "./MovieCard"

export const MoviesPanel = ({movies}) => {
  const allGenres = JSON.parse(localStorage.getItem("genres"));

  return (
  <Group gap={16} fw="wrap" display="flex" align="stretch">
    {movies.results.map(movie => <MovieCard key={movie.id} movie={movie} allGenres={allGenres} />)}
  </Group>
  )
}