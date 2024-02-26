import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        //Primary
        contained: {
          backgroundColor: "#63c8cc",
          color: "white",
          "&:hover": {
            backgroundColor: "#63c8cc",
            color: "white",
          },
        },
        //Secondary
        outlined: {
          color: "#A68477",
          fontWeight: "bold",
          borderColor: "#A68477",

          "&:hover": {
            backgroundColor: "#fff",
            borderColor: "transparent",
          },
        },
        //Tertiary
        text: {
          color: "#A68477",
          fontWeight: "bold",

          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "black",
          "&.Mui-checked": {
            color: "#63c8cc",
          },
        },
      },
    },
  },
});
