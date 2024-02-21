import { createTheme } from "@mui/material/styles";
import { myPalette } from "./myPaletteTheme";

const myTypography = createTheme({
  components: {
    ...myPalette,
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginBottom: "10px",
          textDecoration: "none",
          color: myPalette.palette.text.primary,
        },
        h1: {
          fontSize: "2.5rem",
          display: "block",
        },
        h2: {
          fontSize: "2rem",
          display: "block",
        },
        h3: {
          fontSize: "1.75rem",
        },
        h4: {
          fontSize: "1.5rem",
          display: "block",
        },
        h5: {
          fontSize: "1.25rem",
          display: "block",
        },
        h6: {
          fontSize: "1rem",
          display: "block",
        },
        subtitle1: {
          fontSize: "1rem",
          letterSpacing: 0.1,
          textAlign: "center",
        },
        subtitle2: {
          fontSize: "0.875",
          letterSpacing: 0.1,
          textAlign: "center",
        },
        body1: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: "1rem",
          "& span": {
            fontWeight: "bold",
          },
        },
        body2: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: "0.875rem",
          "& span": {
            fontWeight: "bold",
          },
        },
        overline: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: "0.875rem",
        },
      },
    },
  },
});

export { myTypography };
