const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovies = async (params) => {
  try {
    const url = new URL(`${BASE_URL}/discover/movie`);
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch movies`);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch genres`);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch movie with id ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch movie with id ${id}`);
  }
};

export const getTrailersById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch video with id ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch video with id ${id}`);
  }
};