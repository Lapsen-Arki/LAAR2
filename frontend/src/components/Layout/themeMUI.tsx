import { createTheme } from "@mui/material/styles";

const headingTheme = createTheme({
  typography: {
    fontFamily: ["Righteous", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#000000",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: "bold",
          color: "#000000",
        },
      },
    },
  },
});

const paragraphTheme = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export { headingTheme, paragraphTheme };
