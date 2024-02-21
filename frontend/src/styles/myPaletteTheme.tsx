import { createTheme } from "@mui/material/styles";

const myPalette = createTheme({
  palette: {
    background: {
      default: "#FFDDC2", //Lomakkeen pohjaväri, Avatar-elementin hahmo
      paper: "#FFF4EB", ///Melkein valkoinen, sama sävy kuin Textfield-kentäsä
    },
    primary: {
      main: "#FFF4EB", //Header
      light: "#fff4eb", //Textfield-kentän taustaväri
      dark: "", //Buttonin hover-tila
      contrastText: "#fff",
    },
    secondary: {
      main: "#69C7C1", // Turkoosi
      light: "#F5BE3F", // Keltainen
      dark: "#A68477", // Ruskea
      contrastText: "#fff",
    },
    text: {
      primary: "#0D0908", //Mustanruskea
      secondary: "#fff", //Tummanruskea
    },
  },
  components: {
    //Container-elementin tyylimääreet
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#8338EC",
        },
      },
    },
  },
});

export { myPalette };
