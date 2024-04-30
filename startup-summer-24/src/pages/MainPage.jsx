import { Box, Group, Text } from "@mantine/core";
import { SearchPanel } from "../components/SearchPanel";
import "../styles/MainPage.css";
import { FiltersPanel } from "../components/FiltersPanel";

export const MainPage = () => {

  return (
    <Box component="main" mih="100vh">
      <Group display="flex" justify="space-between" mb={33}>
        <Text fz={32} fw="bold" lh="140%">Movies</Text>
        <SearchPanel/>
      </Group>
      <FiltersPanel/>
    </Box>
  )
}