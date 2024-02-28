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
  },
});

export const formTheme = createTheme(deepmerge(formThemeStyles, globalTheme));
