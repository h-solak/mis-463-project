import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
// import theme from "../theme";
import UserProvider from "./contexts/user/UserProvider";
import { Toaster } from "react-hot-toast";
//Pages
import Home from "./pages/Home/Home";
import Generator from "./pages/Generator";
import Shuffle from "./pages/Shuffle/Shuffle";
import Analyzer from "./pages/Analyzer/Analyzer";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import getTheme from "../theme";
import ThemeModeProvider from "./contexts/theme/ThemeModeProvider";
import useThemeModeContext from "./contexts/theme/useThemeModeContext";

function App() {
  const { themeMode } = useThemeModeContext();

  return (
    <>
      <Toaster></Toaster>
      <ThemeModeProvider>
        <ThemeProvider theme={() => getTheme("light")}>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  key="generator"
                  path="/generator"
                  element={<Generator />}
                ></Route>
                <Route key="home" path="/" element={<Home />}></Route>

                <Route
                  key="shuffle"
                  path="/shuffle"
                  element={<Shuffle />}
                ></Route>
                <Route
                  key="playlist-analyzer"
                  path="/playlist-analyzer"
                  element={<Analyzer />}
                ></Route>
                <Route
                  key="about-us"
                  path="/about-us"
                  element={<AboutUs />}
                ></Route>
                <Route key="notFound" path="*" element={<NotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ThemeProvider>
      </ThemeModeProvider>
    </>
  );
}

export default App;
