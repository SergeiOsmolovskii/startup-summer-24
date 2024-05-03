import { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { AsideNavigationPanel } from "./components/AsideNavigationPanel";
import { MainPage } from "./pages/MainPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RatedPage } from "./pages/RatedPage";
import { getGenres } from "./api/api";

import "@mantine/core/styles.css";
import "./App.css";

function App() {

  const [genres, setGenres] = useState(null);

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

  return (
    <Box w="100%" className="container">
      <AsideNavigationPanel />
      <Box component="aside" mih="100vh" p={"40 90"} bg="var(--gray-100)" flex={1}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rated" element={<RatedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App