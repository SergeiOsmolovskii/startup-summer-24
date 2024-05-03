const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getMovies = async () => {
  const response = await fetch(`${BASE_URL}/discover/movie`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  const data = await response.json();
  return data;
}

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  const data = await response.json();
  return data;
}
