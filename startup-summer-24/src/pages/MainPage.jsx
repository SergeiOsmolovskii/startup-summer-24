import { useEffect, useState } from "react";
import { Box, Group, Text, Loader } from "@mantine/core";
import { SearchPanel } from "../components/SearchPanel";
import { MoviesPanel } from "../components/MoviesPanel";
import "../styles/MainPage.css";
import { FiltersPanel } from "../components/FiltersPanel";
import { getMovies } from "../api/api";

export const MainPage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const ratings = JSON.parse(localStorage.getItem("rated")) || {};
      const moviesData = await getMovies();
      moviesData.results.forEach(movie => {
        const savedRating = ratings[movie.id];
        if (savedRating) {
          movie.rating = savedRating.rating;
        }
      });
      setMovies(moviesData);
    };
    fetchData();
  }, []);

  return (
    <Box component="main" mih="100vh">
      <Group display="flex" justify="space-between" mb={33}>
        <Text fz={32} fw="bold" lh="140%">Movies</Text>
        <SearchPanel />
      </Group>
      <FiltersPanel />
      <Box align="center">
        {movies ? <MoviesPanel movies={movies.results} /> : <Loader size={50} color="var(--purple-500)" />}
      </Box>
    </Box>
  )
}