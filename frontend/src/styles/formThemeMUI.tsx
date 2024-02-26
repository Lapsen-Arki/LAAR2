import { createTheme } from "@mui/material/styles";
import { globalTheme } from "./globalTheme";
import deepmerge from "deepmerge";

const formThemeStyles = createTheme({
  components: {
    //Alertin tyylimääreet
    MuiAlert: {
      styleOverrides: {
        root: {
          marginTop: 2,
          textDecoration: "none",
        },
      },
    },
    //Checkboxin tyylimääreet

    //Container-elementin tyylimääreet
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 300,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          "@media (min-width:400px)": {
            width: 400,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri + ym.
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "solid",
          borderWidth: 1,
          backgroundColor: "white",
          color: "black",
          textDecoration: "none",
          "&:hover fieldset": {
            borderColor: "black !important",
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black !important",
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "1px !important",
          borderColor: "white !important",
          "&:hover fieldset": {
            borderColor: "black !important",
          },
        },
      },
    },
  },
});

export const formTheme = createTheme(deepmerge(formThemeStyles, globalTheme));
