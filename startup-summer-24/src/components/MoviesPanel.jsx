import { useState } from "react";
import { Group, Modal } from "@mantine/core";
import { MovieCard } from "./MovieCard"
import { RatingModal } from "./RatingModal";

export const MoviesPanel = ({ movies, removeMovie }) => {
  const allGenres = JSON.parse(localStorage.getItem("genres"));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieRatings, setMovieRatings] = useState({});

  const updateRating = (movieId, newRating) => {
    const updatedRatings = { ...movieRatings, [movieId]: newRating };
    setMovieRatings(updatedRatings);
    if (!newRating && removeMovie) {
      removeMovie(movieId);
    }
  };

  return (
    <>
      <Modal
        className="rating-modal"
        w={380}
        radius={8}
        fz={16}
        fw="bold"
        title="Your rating"
        centered
        opened={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
      >
        <RatingModal
          title={selectedMovie ? selectedMovie.original_title : ''}
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          updateRating={updateRating}
        />
      </Modal>
      <Group gap={16} fw="wrap" display="flex" align="stretch">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            allGenres={allGenres}
            setSelectedMovie={setSelectedMovie}
            rating={movieRatings[movie.id]}
          />
        ))}
      </Group>
    </>
  )
}