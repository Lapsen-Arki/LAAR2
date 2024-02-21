import { createTheme } from "@mui/material/styles";
import { myTypography } from "./myTypographyTheme";
import { myPalette } from "./myPaletteTheme";

const pageTheme = createTheme({
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
          width: 40,
          height: 40,
          margin: '10px',
          borderRadius: "50%",
          backgroundColor: "#A68477",
          flexShrink: 0,
          },
      },
    },
    //Buttonin tyylimääreet
    MuiButton: {
      styleOverrides: {
        //Primary
        contained: {
          width: 370,
          margin: 10,
          borderRadius: "3px",
          color: "#fff4eb",
          backgroundColor: myPalette.palette.secondary.main,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: 13,
          fontWeight: "bold",
          "@media (min-width:900px)": {
            width: 200,
          },
        },
        //Secondary
        outlined: {
          //Tähän outlined-elementti
        },
        //Tertiary
        text: {
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        },
        
      },
    },
    //CardContentin tyylimääreet
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          width: 370,
          margin: 0,
          marginBottom: 10,
          padding: 0,
          borderRadius: 3,
          boxShadow: 'none',
          alignItems: 'center',
          "@media (min-width:600px)": {
            width: 370,
            padding: 0,
          },
          "@media (min-width:900px)": {
            width: 200,
          },
        },
      },
    },
    //CardContentin tyylimääreet
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          width: 370,
          alignItems: 'center',
          margin: 10,
          padding: 0,
          backgroundColor: '#fff4eb',
          "@media (min-width:600px)": {
            width: 370,
          },
          "@media (min-width:900px)": {
            width: 200,
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
          justifyContent: "center",
          padding: 15,
          borderRadius: "3px",
          backgroundColor: myPalette.palette.background.default,
          "@media (min-width:600px)": {
            width: 600,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
          "@media (min-width:760px)": {
            width: 760,
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
            borderColor: "black !important",
          },*/
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
  },
});

export { pageTheme };
