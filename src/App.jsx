import { useState } from "react";

import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Generator from "./pages/Generator/Generator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import UserProvider from "./contexts/user/UserProvider";
import { Toaster } from "react-hot-toast";
import Shuffle from "./pages/Shuffle/Shuffle";
import Analyzer from "./pages/Analyzer/Analyzer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Toaster></Toaster>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route key="home" path="/" element={<Home />}></Route>
            <Route
              key="generator"
              path="/generator"
              element={<Generator />}
            ></Route>
            <Route key="shuffle" path="/shuffle" element={<Shuffle />}></Route>
            <Route
              key="playlist-analyzer"
              path="/playlist-analyzer"
              element={<Analyzer />}
            ></Route>
            <Route key="notFound" path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
