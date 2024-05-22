import { Image, Button, Flex, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/not-found.png";
import "../styles/NotFoundPage.css";

export const NotFoundPage = () => {

  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/movies");
  };

  return (
    <Flex component="main" align="center" justify="center" h="100%">
      <Stack maw={656} align="center">
        <Image src={notFound} />
        <Text fz={50} tt="uppercase" ta="center">Page not found 404</Text>
        <Image src={notFound} />
        <Stack align="center">
          <Text fz={20} fw={600} ta="center">We can’t find the page you are looking for</Text>
          <Button className="go-home" bg="var(--purple-500)" onClick={goHomePage}>Go Home</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};