import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Group, Box, Text, Loader, Pagination } from "@mantine/core";
import { SearchPanel } from "../components/SearchPanel";
import { MoviesPanel } from "../components/MoviesPanel";
import { EmptyRated } from "../components/EmptyRated";

const MOVIES_PER_RATED_PAGE = import.meta.env.VITE_MOVIES_PER_RATED_PAGE;

export const RatedPage = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const rated = JSON.parse(localStorage.getItem("rated")) || {};
  const [movies, setMovies] = useState(Object.values(rated));
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  const [totalPages, setTotalPages] = useState(Math.ceil(movies.length / Number(MOVIES_PER_RATED_PAGE)));
  const [startIndex, setStartIndex] = useState((page - 1) * Number(MOVIES_PER_RATED_PAGE));
  const [endIndex, setEndIndex] = useState(startIndex + Number(MOVIES_PER_RATED_PAGE));
  const [moviesOnPage, setMoviesOnPage] = useState(movies.slice(startIndex, endIndex));

  useEffect(() => {
    const totalPages = Math.ceil(movies.length / Number(MOVIES_PER_RATED_PAGE));
    const newStartIndex = (page - 1) * Number(MOVIES_PER_RATED_PAGE);
    const newEndIndex = Math.min(newStartIndex + Number(MOVIES_PER_RATED_PAGE), movies.length);
    const newMoviesOnPage = movies.slice(newStartIndex, newEndIndex);

    setTotalPages(totalPages);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setMoviesOnPage(newMoviesOnPage);

    if (page > totalPages) {
      setPage(1);
      navigate(`/rated/?page=1`);
    }
  }, [movies, page]);


  const removeMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`/rated/?page=${newPage}`);
  };

  return (
    <Box component="main" h="100%">

      {
        (movies.length < 1)
          ?
          <EmptyRated />
          :
          <>
            <Group display="flex" justify="space-between" mb={33}>
              <Text fz={32} fw="bold" lh="140%">Rated movies</Text>
              <SearchPanel />
            </Group>

            <Box align="center" mb={24}  >
              {movies ? <MoviesPanel movies={moviesOnPage} removeMovie={removeMovie} /> : <Loader size={50} color="var(--purple-500)" />}
            </Box>
            {movies && (
              <Group justify="center">
                <Pagination className="pagination" value={page} total={totalPages} onChange={handlePageChange} />
              </Group>
            )}
          </>
      }
    </Box>
  )
}