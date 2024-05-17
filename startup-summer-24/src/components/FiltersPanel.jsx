import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { NumberInput, Button, Group, Box, Select, MultiSelect, Flex } from "@mantine/core";
import DropdownDownIcon from "../assets/dropdown down.svg?react";
import DropdownUpIcon from "../assets/dropdown up.svg?react";
import DropdownDownIconSmall from "../assets/dropdown down-small.svg?react";
import DropdownUpIconSmall from "../assets/dropdown up-small.svg?react";
import { getGenres } from "../api/api";
import { SORT_PARAMS } from "../utils/variables";
import "../styles/FiltersPanel.css";

export const FiltersPanel = ({ setFiltersParams, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (params) => {
    setSearchParams(new URLSearchParams(params));
  };

  const [activeGenreIds, setActiveGenreIds] = useState(searchParams.get("with_genres")?.split(',') || []);
  const [genres, setGenres] = useState(null);
  const [activeYear, setActiveYear] = useState(searchParams.get("primary_release_year"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1880 + 1 }, (_, index) => (currentYear - index).toString());

  const [minRating, setMinRating] = useState(searchParams.get("vote_average.gte"));
  const [maxRating, setMaxRating] = useState(searchParams.get("vote_average.lte"));
  const [sort, setSort] = useState(searchParams.get("sort_by"));

  const [isGenreDropdownClosed, setIsGenreDropdownClosed] = useState(false);
  const [isYearsDropdownClosed, setIsYearsDropdownClosed] = useState(false);
  const [isSortDropdownClosed, setIsSortDropdownClosed] = useState(false);

  const ratingFromRef = useRef(null);
  const ratingToRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const allGenres = await getGenres();
      const formattedGenres = allGenres.genres.map(genre => ({
        value: genre.id.toString(),
        label: genre.name
      }));
      setGenres(formattedGenres);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filters = {
      page: 1,
      with_genres: activeGenreIds.join(',') || null,
      primary_release_year: activeYear,
      "vote_average.gte": minRating,
      "vote_average.lte": maxRating,
      sort_by: sort
    }
    setPage(1);
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null)
    );

    setFiltersParams(filteredFilters);
    updateSearchParams(filteredFilters);
  }, [activeGenreIds, activeYear, sort, minRating, maxRating]);

  const resetFilters = () => {
    setActiveGenreIds([]);
    setActiveYear(null);
    setMinRating(null);
    setMaxRating(null);
    setSort(null);
    setPage(1);
    setFiltersParams("");
    updateSearchParams("");
  };

  return (

    <Box className="filters-container" mb={24}>
      <Group className="main-filters-container" mb={14} wrap="no-wrap">
        <MultiSelect
          flex={1}
          fz={22}
          className="genres-select"
          label="Genres"
          placeholder={activeGenreIds.length > 0 ? "" : "Select genre"}
          data={genres}
          value={activeGenreIds}
          onChange={setActiveGenreIds}
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
          data={years}
          value={activeYear}
          onChange={setActiveYear}
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
          <Group className="ratings-container" wrap="no-wrap" align="flex-end">
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
        <Group className="reset-filters-container" mt={40}>
          <Button
            className="reset-filters"
            variant="transparent"
            fz={14}
            p={0}
            mb={5}
            color="var(--gray-600)"
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        </Group>

      </Group>

      <Group justify="flex-end">
        <Select
          fz={22}
          className="year-select"
          label="Sort by"
          placeholder="Most popular"
          data={SORT_PARAMS}
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