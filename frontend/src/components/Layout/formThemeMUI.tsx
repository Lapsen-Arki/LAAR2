import { createTheme } from "@mui/material/styles";

const formTheme = createTheme({
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
          backgroundColor: "#63c8cc",
          width: 250,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          color: "white",
          fontWeight: "bold",
          fontSize: 13,
          "&:hover": {
            backgroundColor: "#63c8cc",
            color: "white",
          },
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
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          color: "#A68477",
          fontWeight: "bold",
          borderColor: "#A68477",
          fontSize: 13,

          "&:hover": {
            backgroundColor: "#fff",
            borderColor: "transparent",
          },
        },
        //Tertiary
        text: {
          width: 250,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
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
          "&.Mui-checked": {
            color: "#63c8cc",
            "&:hover": {
              color: "white",
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
          margin: 0,
          marginTop: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
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
          backgroundColor: "white",
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
          borderColor: "white !important",
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
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "black !important",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
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
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          textDecoration: "none",
        },
        h1: {
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h2: {
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h3: {
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h4: {
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h5: {
          color: "#000000",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        h6: {
          color: "#000000",
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
          fontWeight: "bold",
          letterSpacing: 0.1,
          textAlign: "center",
          margin: 10,
        },
        //error
        subtitle2: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          fontSize: 14,
          letterSpacing: 0.1,
          textAlign: "center",
          margin: 10,
        },
        body1: {
          color: "#000000",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
        body2: {
          color: "#000000",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
        caption: {
          color: "#000000",
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          margin: 10,
        },
      },
    },
  },
});

export { formTheme };
