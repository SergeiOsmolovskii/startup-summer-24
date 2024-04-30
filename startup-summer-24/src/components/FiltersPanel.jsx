import { useState, useRef } from "react";
import { NumberInput, /* NumberInputHandlers, */ Button, Group, Box, Select, Flex } from "@mantine/core";
import DropdownDownIcon from "../assets/dropdown down.svg?react";
import DropdownUpIcon from "../assets/dropdown up.svg?react";
import DropdownDownIconSmall from "../assets/dropdown down-small.svg?react";
import DropdownUpIconSmall from "../assets/dropdown up-small.svg?react";
import "../styles/FiltersPanel.css"


export const FiltersPanel = () => {

  const [genres, setGenres] = useState(null);
  const [years, setYears] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);
  const [sort, setSort] = useState("Most popular");

  const [isGenreDropdownClosed, setIsGenreDropdownClosed] = useState(false);
  const [isYearsDropdownClosed, setIsYearsDropdownClosed] = useState(false);
  const [isSortDropdownClosed, setIsSortDropdownClosed] = useState(false);

  const ratingFromRef = useRef(null);
  const ratingToRef = useRef(null);


  const tempGenresData = ["Drama", "Comedy", "Animation", "Thriller", "Fantasy",];
  const tempGenresYears = ["2000", "1998", "1985", "2015", "2022", "2005"];
  const tempSortData = ["Most Popular", "Least Popular", "Most Rated", "Least Rated", "Most Voted", "Least Voted"];


  return (

    <Box className="filters-container">
      <Group mb={14} wrap="no-wrap" align="flex-end">
        <Select
          flex={1}
          fz={22}
          className="genres-select"
          label="Genres"
          placeholder="Select genre"
          data={tempGenresData}
          value={genres}
          onChange={setGenres}
          maxDropdownHeight={275}
          w="100%"
          radius="md"
          withCheckIcon={false}
          rightSectionWidth={45}
          rightSection={isGenreDropdownClosed ? <DropdownUpIcon /> : <DropdownDownIcon />}
          onDropdownClose={() => setIsGenreDropdownClosed(false)}
          onDropdownOpen={() => setIsGenreDropdownClosed(true)}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        />

        <Select
          flex={1}
          fz={22}
          className="year-select"
          label="Release year"
          placeholder="Select release year"
          data={tempGenresYears}
          value={years}
          onChange={setYears}
          maxDropdownHeight={275}
          w="100%"
          radius="md"
          withCheckIcon={false}
          rightSectionWidth={45}
          rightSection={isYearsDropdownClosed ? <DropdownUpIcon /> : <DropdownDownIcon />}
          onDropdownClose={() => setIsYearsDropdownClosed(false)}
          onDropdownOpen={() => setIsYearsDropdownClosed(true)}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        />
        {/* To fix */}
        <Group gap={15} flex={1}>
          <Group wrap="no-wrap" align="flex-end">
            <NumberInput
              label="Ratings"
              className="rating-input"
              placeholder="From"
              w="100%"
              size="md"
              radius="md"
              min={0}
              max={10}
              value={minRating}
              onChange={setMinRating}
              handlersRef={ratingFromRef}
              step={1}
              rightSection={
                <Flex direction="column" display="flex" justify="center" align="center" h="100%" w="100%">
                  <DropdownUpIconSmall className="dropdown-up-icon-small" onClick={() => ratingFromRef.current?.increment()} />
                  <DropdownDownIconSmall className="dropdown-up-icon-small" onClick={() => ratingFromRef.current?.decrement()} />
                </Flex>
              }
            />
            <NumberInput
              className="rating-input"
              placeholder="To"
              w="100%"
              size="md"
              radius="md"
              min={0}
              max={10}
              value={maxRating}
              onChange={setMaxRating}
              handlersRef={ratingToRef}
              step={1}
              rightSection={
                <Flex direction="column" display="flex" justify="center" align="center" h="100%" w="100%">
                  <DropdownUpIconSmall className="dropdown-up-icon-small" onClick={() => ratingToRef.current?.increment()} />
                  <DropdownDownIconSmall className="dropdown-up-icon-small" onClick={() => ratingToRef.current?.decrement()} />
                </Flex>
              }
            />
          </Group>
        </Group>
        <Button
          className="reset-filters"
          variant="transparent"
          fz={14}
          p={0}
          mb={5}
          color="var(--gray-600)"
          onClick={() => console.log("Потом обработать")}
        >
          Reset filters
        </Button>
      </Group>

      <Group justify="flex-end">
        <Select
          fz={22}
          className="year-select"
          label="Sort by"
          placeholder="Most popular"
          data={tempSortData}
          value={sort}
          onChange={setSort}
          maxDropdownHeight={275}
          w={284}
          radius="md"
          withCheckIcon={false}
          rightSectionWidth={45}
          rightSection={isSortDropdownClosed ? <DropdownUpIcon /> : <DropdownDownIcon />}
          onDropdownClose={() => setIsSortDropdownClosed(false)}
          onDropdownOpen={() => setIsSortDropdownClosed(true)}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        />
      </Group>
    </Box>
  )
}