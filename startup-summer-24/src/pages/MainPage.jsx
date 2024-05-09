import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Group, Text, Loader, Pagination } from "@mantine/core";
import { SearchPanel } from "../components/SearchPanel";
import { MoviesPanel } from "../components/MoviesPanel";
import "../styles/MainPage.css";
import { FiltersPanel } from "../components/FiltersPanel";
import { getMovies } from "../api/api";

const VITE_PAGINATION_PAGES = import.meta.env.VITE_MOVIES_PER_RATED_PAGE;

export const MainPage = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  useEffect(() => {
    const fetchData = async () => {
      const ratings = JSON.parse(localStorage.getItem("rated")) || {};
      const moviesData = await getMovies(`page=${page}`);
      moviesData.results.forEach(movie => {
        const savedRating = ratings[movie.id];
        if (savedRating) {
          movie.rating = savedRating.rating;
        }
      });
      setMovies(moviesData);
    };
    fetchData();

    if (page > 500) {
      setPage(1);
      navigate(`/movies/?page=1`);
    } else {
      navigate(`/movies/?page=${page}`);
    }
  }, [page, navigate]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`/movies/?page=${newPage}`);
  };

  return (
    <Box component="main" mih="100vh">
      <Group display="flex" justify="space-between" mb={33}>
        <Text fz={32} fw="bold" lh="140%">Movies</Text>
        <SearchPanel />
      </Group>
      <FiltersPanel />
      <Box align="center" mb={24}>
        {movies ? <MoviesPanel movies={movies.results} /> : <Loader size={50} color="var(--purple-500)" />}
      </Box>
      {
        movies
          ?
          <Group justify="flex-end">
            <Pagination className="pagination" value={page} total={VITE_PAGINATION_PAGES} onChange={handlePageChange} />
          </Group>
          : null
      }
    </Box>
  )
}