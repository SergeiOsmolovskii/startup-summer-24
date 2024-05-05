const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch movies`);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch genres`);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

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
    const response = await fetch(`${BASE_URL}/movie/${id}/videos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video with id ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch video with id ${id}`);
  }
};