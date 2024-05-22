import { Image, Group, Button, Flex, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import notFoundMovies from "../assets/not-found-movies.png";

export const NotFoundMovies = () => {

  const navigate = useNavigate();
  const goMovies = () => {
    navigate("/movies");
  };

  return (
    <Flex component="main" align="center" justify="center">
      <Stack maw={656} align="center">
        <Image src={notFoundMovies} />
        <Stack align="center">
          <Text fz={20} fw={600} ta="center">We don't have such movies, look for another one</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}