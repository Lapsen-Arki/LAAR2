import { createTheme } from "@mui/material/styles";
import { myTypography } from "./myTypographyTheme";
import { myPalette } from "./myPaletteTheme";

const formTheme = createTheme({
  ...myPalette,
  components: {
    ...myTypography.components,
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
    //Avatarin tyylimääreet
    MuiAvatar: {
      styleOverrides: {
        root: {
          //width: '100px',
          //height: '100px',
          borderRadius: "50%",
          backgroundColor: "#A68477",
          margin: "auto",
          marginTop: "20px",
        },
      },
    },
    //Buttonin tyylimääreet
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff4eb",
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: 13,
          fontWeight: "bold",
          width: 250,
          margin: 10,
          marginBottom: 20,
          borderRadius: "3px",
          "@media (min-width:400px)": {
            width: "92%",
          },
          "@media (min-width:576px)": {
            width: 370,
          },
        },
        //Primary
        contained: {
          //Tähän contained-elementin määreet
          backgroundColor: myPalette.palette.secondary.main,
        },
        //Secondary
        outlined: {
          //Tähän outlined-elementti
        },
        //Tertiary
        text: {
          color: myPalette.palette.secondary.dark,
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
          //alignSelf: "center",
          color: myPalette.palette.text.primary,
          "&.Mui-checked": {
            color: myPalette.palette.text.primary,
            "&:hover": {
              color: myPalette.palette.text.primary,
            },
          },
        },
      },
    },

    //Container-elementin tyylimääreet
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: 320,
          margin: "auto",
          padding: 15,
          borderRadius: "3px",
          backgroundColor: myPalette.palette.background.default,
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
          backgroundColor: myPalette.palette.primary.light, //Textfield-kentän taustaväri
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          //color: "black",
          textDecoration: "none",
          /*"&:hover fieldset": {
            borderColor: "red !important",
          },*/
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: myPalette.palette.text.primary,
          "&.Mui-focused": {
            color: "#0D0908 !important", //Tekstin väri inputkentässä
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "1px !important",
          borderColor: "#fff4eb !important", //TextField-kentän reunuksen väri
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
          color: myPalette.palette.text.primary,
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
            color: "#0D0908",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#0D0908",
            },
            "&:hover fieldset": {
              borderColor: "#0D0908 !important",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0D0908",
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
  },
});

export { formTheme };
