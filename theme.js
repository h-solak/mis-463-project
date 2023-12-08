import { createTheme } from "@mui/material/styles";

/*
Theme:

https://colorhunt.co/palette/4a55a27895cba0bfe0c5dff8

*/
const theme = createTheme({
  palette: {
    primary: {
      main: "#15A649",
    },
    secondary: {
      //grey(ish)
      main: "#C3C2C2",
      light: "#f2f2f2",
    },
    highlight: {
      //accent color - call to action (cta)
      main: "#1ED760",
    },
    dark: {
      main: "#000",
    },
    light: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif", "Tsukimi Rounded"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export default theme;
