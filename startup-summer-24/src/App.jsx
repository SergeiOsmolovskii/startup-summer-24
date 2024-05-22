import { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AsideNavigationPanel } from "./components/AsideNavigationPanel";
import { MainPage } from "./pages/MainPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RatedPage } from "./pages/RatedPage";
import { getGenres } from "./api/api";
import { Movie } from "./components/Movie";
import "@mantine/core/styles.css";
import "./App.css";

function App() {

  const [genres, setGenres] = useState(null);
  const [showAside, setShowAside] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("genres")) {
      const fetchData = async () => {
        const genresData = await getGenres();
        setGenres(genresData);
        localStorage.setItem("genres", JSON.stringify(genresData));
      };
      fetchData();
    } else {
      const genresData = JSON.parse(localStorage.getItem("genres"));
      setGenres(genresData);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("rated")) {
      localStorage.setItem("rated", "{}");
    };
  }, []);

  useEffect(() => {
    const validPaths = ["/", "/movies", "/rated"];
    const pathWithId = location.pathname.match(/^\/movies\/\d+$/);
    (validPaths.includes(location.pathname) || pathWithId) ? setShowAside(true) : setShowAside(false);
  }, [location.pathname]);

  return (
    genres !== null && (
      <Box w="100%" className="container">
        {showAside && <AsideNavigationPanel />}
        <Box className="main-content" component="aside" bg="var(--gray-100)" flex={1}>
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies" element={<MainPage />} />
            <Route path="/rated" element={<RatedPage />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Box>
    )
  );
};

export default App