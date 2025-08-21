import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { CreatePage } from "./pages/CreatePage";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  const bg = useColorModeValue("orange.50", "cyan.950");
  const color = useColorModeValue("gray.900", "teal.50");
  return (
    <Box minH={"100vh"} bg={bg} color={color}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
