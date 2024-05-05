import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, Image, Group, Stack, Text, Divider, Breadcrumbs, Anchor } from "@mantine/core";
import { getMovieById, getTrailersById } from "../api/api";
import { formatPopularity, formatTime, formatDate, formatMoney } from "../utils/utils";
import { ProductionCompany } from "./ProductionCompany";
import Star from "../assets/star.svg?react";
import noPoster from "../assets/no-poster.png";
import "../styles/Movie.css";

const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL;

export const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [crumbs, setCrumbs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, movieTrailer] = await Promise.all([
          getMovieById(params.id),
          getTrailersById(params.id)
        ]);

        const combinedData = {
          ...movieData,
          trailer: movieTrailer.results[0] ? movieTrailer.results[0] : null
        };

        setMovie(combinedData);
        setCrumbs([
          { title: 'Movies', href: '/movies' },
          { title: combinedData.original_title, href: combinedData.id }
        ].map((item, index) =>
          <Anchor
            fz={14}
            c="var(--purple-500)"
            href={item.href}
            key={index}>
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
    <Box p={"0 90"} gap={20}>
      <Breadcrumbs mb={20}>{crumbs}</Breadcrumbs>

      <Card component="section" p={24} mb={20} radius={12} bg="#ffffff">
        <Group align="stretch" justify="space-between" wrap="no-wrap">
          <Group flex="0 0 auto">
            <Image w={250} src={poster}/>
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

            <Stack gap={0} w="100%" >
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
                <Text>{genres}</Text>
              </Group>
            </Stack>
          </Stack>

          <Group align="flex-start" flex="0 0 auto">
            <Star color="var(--gray-300)" />
          </Group>
        </Group>
      </Card>

      <Card component="section" p={24} radius={12} bg="#ffffff">
        <Box>
          <Text component="h3" mb={16} fz={20} fw="bold">Trailer</Text>
          <Group className="video-container" pos="relative" radius={9}>
            <iframe className="video" width="100%" src={movie.trailer ? `https://www.youtube.com/embed/${movie.trailer.key}` : ''} title={movie.original_title} allowFullScreen></iframe>
          </Group>
        </Box>

        <Divider size="xs" m="20 0" />

        <Box>
          <Text component="h3" mb={16} fz={20} fw="bold">Description</Text>
          <Text component="p" fz={16}>{movie.overview}</Text>
        </Box>

        <Divider size="xs" m="20 0" />

        <Box>
          <Text component="h3" mb={16} fz={20} fw="bold">Production</Text>
          <Stack gap={12}>
            {movie.production_companies.map((company) => (
              <ProductionCompany key={company.id} company={company} />
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  )
}