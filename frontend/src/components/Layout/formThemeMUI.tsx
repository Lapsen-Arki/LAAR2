import { createTheme } from "@mui/material/styles";

const formTheme = createTheme({
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
    //Buttonin tyylimääreet
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
    //Checkboxin tyylimääreet
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

export { formTheme };
