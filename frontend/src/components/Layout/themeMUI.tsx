import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'red',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: 'underline',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          textDecoration: 'none',
        },
        h1: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h2: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h3: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h4: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h5: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h6: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        //success
        subtitle1: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: 14,
          fontWeight: 'bold',
          letterSpacing: 0.1,
          textAlign: 'center',
          margin: 10,
          display: 'inline-flex'
        },
        //error
        subtitle2: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: 14,
          fontWeight: 'bold',
          letterSpacing: 0.1,
          textAlign: 'center',
          margin: 10,
          display: 'inline-flex'
        },
        body1: {
          color: '#000000',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
        body2: {
          color: '#000000',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
        caption: {
          color: '#000000',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
      },
    },
  },
});

const headingTheme = createTheme({
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

export { defaultTheme, headingTheme, paragraphTheme };
