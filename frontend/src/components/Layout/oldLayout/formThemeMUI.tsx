import { createTheme } from "@mui/material/styles";

const formTheme = createTheme({
  palette: {
    background: {
      default: "#fff4eb",
      paper: "#a68477",
    },
    primary: {
      main: "#a68477",
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
    //Alertin tyylimääreet
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: "none",
          marginTop: 16,
          marginBottom: 10,
        },
      },
    },
    //Buttonin tyylimääreet
    MuiButton: {
      styleOverrides: {
        //Primary
        contained: {
          width: 250,
          margin: 10,
          marginTop: 20,
          marginBottom: 20,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontWeight: "bold",
          fontSize: 13,
          borderRadius: "3px",
          "@media (min-width:400px)": {
            width: "92%",
          },
          "@media (min-width:576px)": {
            width: 370,
          },
        },
        //Secondary
        outlined: {
          width: 250,
          margin: 10,
          marginTop: 20,
          marginBottom: 20,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontWeight: "bold",
          fontSize: 13,
          "@media (min-width:400px)": {
            width: "92%",
          },
          "@media (min-width:576px)": {
            width: 370,
          },
        },
        //Tertiary
        text: {
          width: 250,
          margin: 10,
          marginTop: 20,
          marginBottom: 20,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          color: "#A68477",
          fontWeight: "bold",
          fontSize: 13,
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        },
      },
    },
    //Checkboxin tyylimääreet
    MuiCheckbox: {
      styleOverrides: {
        root: {
          margin: 10,
          marginRight: 5,
          paddingRight: 0,
          alignSelf: "flex-start",
          color: "black",
          backgroundColor: "transparent",
          "&.Mui-checked": {
            color: "black",
            "&:hover": {
              color: "black",
            },
          },
        },
      },
    },
    //Container-elementin tyylimääreet
    MuiContainer: {
      styleOverrides: {
        root: {
          width: 320,
          margin: "auto",
          padding: 15,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          borderRadius: "3px",
          "@media (min-width:400px)": {
            width: "95%",
          },
          "@media (min-width:576px)": {
            width: 450,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri + ym.
    MuiInputBase: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          backgroundColor: "#fff4eb",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
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
          borderColor: "#fff4eb !important",
          "&:hover fieldset": {
            borderColor: "black !important",
          },
        },
      },
    },
    //Link-elementin tyylimääreet
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: "underline",
          margin: 0,
          padding: 0,
          marginBottom: "10px",
        },
      },
    },
    //Tekstikentän tyylimääreet
    MuiTextField: {
      styleOverrides: {
        root: {
          width: 250,
          margin: 7,
          padding: 0,
          borderRadius: "3px",
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#fff4eb",
            },
            "&:hover fieldset": {
              borderColor: "black !important",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#fff4eb",
            },
          },
          "@media (min-width:400px)": {
            width: "92%",
          },
          "@media (min-width:576px)": {
            width: 370,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ["Righteous", "sans-serif"].join(","),
          textDecoration: "none",
          margin: 10,
        },
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

export { formTheme };
