import { createTheme } from "@mui/material/styles";
import { ComponentsOverrides, Theme as MuiTheme } from "@mui/material/styles";

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
  palette: {
    background: {
      default: "#FFF4EB",
      paper: "#FFF4EB",
    },
    primary: {
      main: "#fff4eb",
      light: "",
      dark: "",
      contrastText: "#fff",
    },
    text: {
      primary: "#0d0908",
      secondary: "#000000",
    },
  },
  components: {
    //footerin väri
    MuiLayoutRoot: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          width: "100%",
          overflowX: "hidden",
          minHeight: "100vh",
          //minHeight: 'calc(100vh - 80px)',
          margin: 0,
          padding: 0,
          paddingTop: 60,
          backgroundColor: "#ffe9d7",
        },
      },
    },
    //Sivun pohjaväri
    MuiContentOuter: {
      styleOverrides: {
        outer: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          margin: 0,
          padding: 0,
          paddingTop: 50,
          backgroundColor: "#ffe9d7",
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
          backgroundColor: "#ffe9d7",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: "underline",
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "2.5rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        h2: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "2rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        h3: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "1.75rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        h4: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "1.5rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        h5: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "1.25rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        h6: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "1rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
        subtitle1: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "1rem",
          letterSpacing: 0.1,
          textAlign: "center",
          marginBottom: "10px",
        },
        subtitle2: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: "0.875",
          letterSpacing: 0.1,
          textAlign: "center",
          marginBottom: "10px",
        },
        body1: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          color: "#000000",
          fontSize: "1rem",
          marginBottom: "10px",
          "& span": {
            fontWeight: "bold",
          },
        },
        body2: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: "0.875rem",
          marginBottom: "10px",
          "& span": {
            fontWeight: "bold",
          },
        },
        overline: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: "0.875rem",
          marginBottom: "10px",
          textDecoration: "none",
        },
      },
    },
  },
});

export { baseTheme };
