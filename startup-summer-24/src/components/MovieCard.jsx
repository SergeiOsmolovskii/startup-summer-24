import { Card, Image, Group, Stack, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Star from "../assets/star.svg?react";
import noPoster from "../assets/no-poster.png";
import { formatPopularity } from "../utils/utils";
import "../styles/MovieCard.css";
import { useState, useEffect } from "react";

const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL;

export const MovieCard = ({ movie, allGenres, setSelectedMovie, rating }) => {
  const [currentRating, setCurrentRating] = useState(null);
  const navigate = useNavigate();
  const poster = movie.poster_path ? `${IMAGES_BASE_URL}${movie.poster_path}` : noPoster;
  const popularity = formatPopularity(movie.vote_count);
  const genres = allGenres.genres
    .filter(item => movie.genre_ids.includes(item.id))
    .map(item => item.name)
    .join(', ');

  useEffect(() => {
    (!currentRating && movie.rating) ? setCurrentRating(movie.rating) : setCurrentRating(rating);
  }, [rating]);

  const goToMovie = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card p={24} radius={12} flex="49%">
      <Group align="stretch" justify="space-between" wrap="no-wrap">

        <Group flex="0 0 auto">
          <Image h={170} w={119} src={poster} />
        </Group>

        <Stack align="flex-start" flex="1 1 auto" justify="space-between">
          <Stack align="flex-start" justify="space-between" gap={5}>
            <Text component="h2" fz={20} ta="left" c="var(--purple-500)" fw={600} onClick={goToMovie}>{movie.original_title}</Text>
            <Text fz={16} c="var(--gray-600)">{(movie.release_date).slice(0, 4)}</Text>
            <Group gap={0}>
              <Star color="var(--yellow)" />
              <Text ml={4} mr={8} fz={16} fw={600}>{+movie.vote_average.toFixed(1)}</Text>
              <Text c="var(--gray-600)">({popularity})</Text>
            </Group>
          </Stack>

          <Group wrap="no-wrap" align="" w="100%" >
            <Text align="left" c="var(--gray-600)">Genres
              <Text component="span" ml={8} c="#000000" >{genres}</Text>
            </Text>
          </Group>
        </Stack>

        <Group align="flex-start" flex="0 0 auto" gap={4}>
          <Button
            className="rating"
            variant="transparent"
            leftSection={<Star color={currentRating ? "var(--purple-500)" : "var(--gray-300)"} />}
            p={0}
            fz={16}
            fw={600}
            color="#000000"
            onClick={() => setSelectedMovie(movie)}
          >
            {currentRating ? currentRating : null}
          </Button>
        </Group>

      </Group>
    </Card>
  )
}