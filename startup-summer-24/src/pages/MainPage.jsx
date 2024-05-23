import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Box, Group, Text, Loader, Pagination } from "@mantine/core";
import { MoviesPanel } from "../components/MoviesPanel";
import "../styles/MainPage.css";
import { FiltersPanel } from "../components/FiltersPanel";
import { getMovies } from "../api/api";
import { NotFoundMovies } from "../components/NotFoundMovies";
import useDebounce from "../hooks/useDebounce";

const VITE_PAGINATION_PAGES = import.meta.env.VITE_PAGINATION_PAGES;

export const MainPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersParams, setFiltersParams] = useState(null);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const debouncedFiltersParams = useDebounce(filtersParams, 500);

  const fetchData = async () => {
    const ratings = JSON.parse(localStorage.getItem("rated")) || {};
    const moviesData = await getMovies(`${searchParams.toString()}`);
    moviesData.results.forEach(movie => {
      const savedRating = ratings[movie.id];
      if (savedRating) {
        movie.rating = savedRating.rating;
      }
    });
    setMovies(moviesData);
  };

  useEffect(() => {
    fetchData();
  }, [debouncedFiltersParams, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage)
    setSearchParams(searchParams => {
      searchParams.set("page", newPage);
      return searchParams;
    });
    window.scrollTo(0, 0);
  };

  return (
    <Box component="main">
      <Group display="flex" justify="space-between" mb={33}>
        <Text fz={32} fw="bold" lh="140%">Movies</Text>
      </Group>
      <FiltersPanel setFiltersParams={setFiltersParams} setPage={setPage} />

      {
        ((!!movies?.results.length < 1) && searchParams.size > 1)
          ?
          <NotFoundMovies />
          :
          <>
            <Box align="center" mb={24}>
              {movies ? <MoviesPanel movies={movies.results} /> : <Loader size={50} color="var(--purple-500)" />}
            </Box>
            {movies && (
              <Group justify="flex-end">
                <Pagination className="pagination" value={page} total={movies.total_pages < 500 ? movies.total_pages : VITE_PAGINATION_PAGES} onChange={handlePageChange} />
              </Group>
            )}
          </>
      }
    </Box>
  )
}