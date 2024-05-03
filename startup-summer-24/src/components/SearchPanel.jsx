import { useState } from "react";
import { Box, Input, Button } from "@mantine/core";
import Search from "../assets/search.svg?react";

import "../styles/SearchPanel.css";

export const SearchPanel = () => {

  const [search, setSearch] = useState('');

  return (

    <Box className="search-container" w="50%" >
      <Input
        placeholder="Search movie title"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        w="100%"
        radius="md"
        size="48px"
        rightSectionPointerEvents="all"
        leftSection={<Search size="md"/>}
        leftSectionWidth={40}
        rightSectionWidth={110}
        rightSection={
          <Button
            size="32px"
            fz={14}
            p={0}
            w={88}
            radius="md"
            onClick={() => {
              console.log(search);
            }
          }
        >
          Search
        </Button>

      }

      />
    </Box>

  )

}