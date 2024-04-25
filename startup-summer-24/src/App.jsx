import { Box } from "@mantine/core";
import { AsideNavigationPanel } from "./components/AsideNavigationPanel";
import "@mantine/core/styles.css";
import "./App.css";

function App() {

  return (
    <Box w="100%" className="container">
      <AsideNavigationPanel />
      <Box component="aside"></Box>
    </Box>
  )
}

export default App