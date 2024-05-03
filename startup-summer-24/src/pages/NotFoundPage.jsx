import { Image, Group, Button, Flex, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/not-found.png";

/* Need to remove aside bar in 404 page */

export const NotFoundPage = () => {

  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };

  return (
    <Flex component="main" align="center" justify="center" h="100%">
      <Stack maw={656} align="center">
        <Image src={notFound} />
        <Text fz={50} tt="uppercase">Page not found 404</Text>
        <Image src={notFound} />
        <Stack align="center">
          <Text fz={20} fw={600}>We can’t find the page you are looking for</Text>
          <Button bg="var(--purple-500)" onClick={goHomePage}>Go Home</Button>
        </Stack>
      </Stack>
    </Flex>
  )
}