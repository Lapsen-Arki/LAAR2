import { createTheme } from "@mui/material/styles";
import { ComponentsOverrides, Theme as MuiTheme } from "@mui/material/styles";
import { myTypography } from "./myTypographyTheme";
import { myPalette } from "./myPaletteTheme";

type Theme = Omit<MuiTheme, "components">;

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    MuiLayoutRoot: "root";
    MuiContentOuter: "outer";
    MuiMainContent: "page";
  }

  interface Components {
    MuiLayoutRoot?: {
      styleOverrides?: ComponentsOverrides<Theme>["MuiLayoutRoot"];
    };
    MuiContentOuter?: {
      styleOverrides?: ComponentsOverrides<Theme>["MuiContentOuter"];
    };
    MuiMainContent?: {
      styleOverrides?: ComponentsOverrides<Theme>["MuiMainContent"];
    };
  }
}

const baseTheme = createTheme({
  ...myPalette,
  components: {
    ...myTypography.components,
    //Vaikuttaa: footerin väri
    MuiLayoutRoot: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          width: "100%",
          overflowX: "hidden",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          paddingTop: 60,
          backgroundColor: "#FFF4EB", //Footerin taustaväri
        },
      },
    },
    //Sisältöalue
    MuiContentOuter: {
      styleOverrides: {
        outer: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          margin: 0,
          padding: 0,
          paddingTop: 50,
          backgroundColor: "#FFDDC2", //Sisältöalueen väri
        },
      },
    },
    MuiMainContent: {
      styleOverrides: {
        page: {
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          paddingTop: 20,
          paddingBottom: 20,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: myPalette.palette.text.primary,
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: "underline",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export { baseTheme };
