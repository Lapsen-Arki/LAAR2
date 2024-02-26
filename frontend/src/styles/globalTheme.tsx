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
            backgroundColor: "#5bbec2",
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
          color: "black",
          fontWeight: "bold",

          "&:hover": {
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
    //select-elementin focus-tilan reunan väri + ym.
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#63c8cc", // Color on focus
            borderWidth: "2px",
          },
        },
        notchedOutline: {
          borderColor: "gray", // Default border color
        },
      },
    },
  },
});
