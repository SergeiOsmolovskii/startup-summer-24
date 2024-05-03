import { useEffect, useState } from "react";
import {  Box, Group, Text } from "@mantine/core";
import { getGenres } from "../api/api";

import { Movie } from "./Movie"

export const MoviesPanel = ({movies}) => {

  const allGenres = JSON.parse(localStorage.getItem("genres"));

  return (
  <Group gap={16} fw="wrap" display="flex" align="stretch">
    {movies.results.map(movie => <Movie key={movie.id} movie={movie} allGenres={allGenres} />)}
  </Group>
  )
}