import { Image, Group, Button, Flex, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import emptyRated from "../assets/empty-rated.png";
import "../styles/EmptyRated.css";

export const EmptyRated = () => {

  const navigate = useNavigate();
  const goMovies = () => {
    navigate("/movies");
  };

  return (
    <Flex component="main" align="center" justify="center" h="100%">
      <Stack maw={656} align="center">
        <Image src={emptyRated} />
        <Stack align="center">
          <Text fz={20} fw={600}>You haven't rated any films yet</Text>
          <Button className="go-movies" bg="var(--purple-500)" onClick={goMovies}>Find movies</Button>
        </Stack>
      </Stack>
    </Flex>
  )
}