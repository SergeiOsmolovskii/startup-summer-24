import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, Image, Group, Button, Stack, Text, Divider, Breadcrumbs, Anchor, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getMovieById, getTrailersById } from "../api/api";
import { formatPopularity, formatTime, formatDate, formatMoney } from "../utils/utils";
import { ProductionCompany } from "./ProductionCompany";
import Star from "../assets/star.svg?react";
import noPoster from "../assets/no-poster.png";
import "../styles/Movie.css";
import { RatingModal } from "./RatingModal";

const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL;

export const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [movie, setMovie] = useState(null);
  const [convertMovie, setConvertMovie] = useState(null);
  const [crumbs, setCrumbs] = useState(null);
  const [rating, setRating] = useState(null);
  const rated = JSON.parse(localStorage.getItem("rated")) || {};

  const updateRating = (movieId, newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, movieTrailer] = await Promise.all([
          getMovieById(params.id),
          getTrailersById(params.id)
        ]);

        const combinedData = {
          ...movieData,
          trailer: movieTrailer.results[0] && movieTrailer.results[0]
        };

        setMovie(combinedData);

        /*  convertMovie required to transfer and save data in the same format for localstorage due of API */

        setConvertMovie(
          {
            adult: combinedData.adult,
            backdrop_path: combinedData.backdrop_path,
            genre_ids: combinedData.genres.map(genre => genre.id),
            id: combinedData.id,
            original_language: combinedData.original_language,
            original_title: combinedData.original_title,
            overview: combinedData.overview,
            popularity: combinedData.popularity,
            poster_path: combinedData.poster_path,
            release_date: combinedData.release_date,
            title: combinedData.title,
            video: combinedData.video,
            vote_average: combinedData.vote_average,
            vote_count: combinedData.vote_count
          }
        );

        setRating(rated[combinedData?.id]?.rating || null);

        setCrumbs([
          { title: 'Movies', href: '/movies' },
          { title: combinedData.original_title, href: combinedData.id }
        ].map((item, index) =>
          <Anchor
            fz={14}
            c="var(--purple-500)"
            href={item.href}
            key={item.href}
            title={item.title}
          >
            {item.title}
          </Anchor>)
        );
      } catch (error) {
        navigate('/404');
      }
    };
    fetchData();
  }, [params.id]);


  if (!movie) {
    return null;
  }

  const popularity = formatPopularity(movie.vote_count);
  const poster = movie.poster_path ? `${IMAGES_BASE_URL}${movie.poster_path}` : noPoster;
  const genres = movie.genres.map(item => item.name).join(', ');

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
        opened={opened}
        onClose={close}
      >
        <RatingModal
          title={movie.original_title}
          movie={convertMovie}
          onClose={close}
          updateRating={updateRating}
        />
      </Modal>

      <Box className="movie-container" gap={20}>
        <Breadcrumbs mb={20}>{crumbs}</Breadcrumbs>
        <Card className="movie" component="section"radius={12} bg="#ffffff">
          <Group className="movie-content-container">

            <Group className="poster-container">
              <Image className="poster-img" src={poster} />
            </Group>

            <Stack align="flex-start" flex="1 1 auto" justify="space-between">
              <Stack align="flex-start" justify="space-between" gap={5}>
                <Text component="h2" fz={20} ta="left" c="var(--purple-500)" fw="bold">{movie.original_title}</Text>
                <Text fz={16} c="var(--gray-600)">{(movie.release_date).slice(0, 4)}</Text>
                <Group gap={0}>
                  <Star color="var(--yellow)" />
                  <Text ml={4} mr={8} fz={16} fw="bold">{+movie.vote_average.toFixed(1)}</Text>
                  <Text c="var(--gray-600)">({popularity})</Text>
                </Group>
              </Stack>

              <Stack className="main-movie-info" gap={0} w="100%" >
                <Group pt={7}>
                  <Text w={130} p={0} c="var(--gray-600)">Duration</Text>
                  <Text p={0}>{formatTime(movie.runtime)}</Text>
                </Group>
                <Group pt={7}>
                  <Text w={130} p={0} c="var(--gray-600)">Premiere</Text>
                  <Text p={0}>{formatDate(movie.release_date)}</Text>
                </Group>
                <Group pt={7}>
                  <Text w={130} p={0} c="var(--gray-600)">Budget</Text>
                  <Text p={0}>{formatMoney(movie.budget)}</Text>
                </Group>
                <Group pt={7}>
                  <Text w={130} p={0} c="var(--gray-600)">Gross worldwide</Text>
                  <Text p={0}>{formatMoney(movie.revenue)}</Text>
                </Group>
                <Group wrap="no-wrap" align="flex-start" pt={7}>
                  <Text w={130} p={0} c="var(--gray-600)">Genres</Text>
                  <Text lineClamp={1} title={genres}>{genres}</Text>
                </Group>
              </Stack>
            </Stack>

            <Group align="flex-start" flex="0 0 auto">
              <Button
                className="rating"
                variant="transparent"
                leftSection={<Star color={rating ? "var(--purple-500)" : "var(--gray-300)"} />}
                p={0}
                fz={16}
                fw={600}
                color="#000000"
                onClick={open}
              >
                {rating && rating}
              </Button>

            </Group>
          </Group>
        </Card>

        <Card component="section" p={24} radius={12} bg="#ffffff">
          {movie.trailer && (
            <>
              <Box>
                <Text component="h3" mb={16} fz={20} fw="bold">Trailer</Text>
                <Group className="video-container" pos="relative" radius={9}>
                  <iframe className="video" width="100%" src={movie.trailer ? `https://www.youtube.com/embed/${movie.trailer.key}` : ""} title={movie.original_title} allowFullScreen></iframe>
                </Group>
              </Box>
              <Divider size="xs" m="20 0" />
            </>
          )}

          {movie.overview && (
            <>
              <Box>
                <Text component="h3" mb={16} fz={20} fw="bold">Description</Text>
                <Text component="p" fz={16}>{movie.overview}</Text>
              </Box>

              <Divider size="xs" m="20 0" />
            </>
          )}

          {movie.production_companies.length > 0 && (
            <Box>
              <Text component="h3" mb={16} fz={20} fw="bold">Production</Text>
              <Stack gap={12}>
                {movie.production_companies.map((company) => (
                  <ProductionCompany key={company.id} company={company} />
                ))}
              </Stack>
            </Box>
          )}
        </Card>
      </Box>
    </>
  )
}