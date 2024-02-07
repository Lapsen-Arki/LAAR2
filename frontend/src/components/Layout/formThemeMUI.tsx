import { createTheme } from "@mui/material/styles";

const formTheme = createTheme({
  components: {
    //Alertin tyylimääreet 
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: 'none',
          marginTop: 16, 
          marginBottom: 10,
        },
      },
    },
    //Buttonin tyylimääreet
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#63c8cc',
          width: 250,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: ["Righteous", "sans-serif"].join(","),
          color: 'white',
          fontWeight: 'bold',
          fontSize: 13,
          '&:hover': {
            backgroundColor: '#63c8cc',
            color: 'white',
          },
          '@media (min-width:400px)': {
            width: '92%',
          },
          '@media (min-width:576px)': {
            width: 370,
          },
        },
      },
    },
    //Checkboxin tyylimääreet
    MuiCheckbox: {
      styleOverrides: {
        root: {
          marginLeft: 10,
          marginRight: 0,
          color: 'black',
          '&.Mui-checked': {
            color: '#63c8cc',
            '&:hover': {
              color: 'white',
            },
        },
      },
    },
    },
    //Container-elementin tyylimääreet
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          margin: 0,
          padding: 20,
          width: 320,
          '@media (min-width:400px)': {
            width: '95%',
          },
          '@media (min-width:576px)': {
            width: 450,
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
          backgroundColor: 'white',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          color: 'black',
          textDecoration: 'none',
          '&:hover fieldset': {
            borderColor: 'black !important',
          },
        },
      },
    },
    //select-elementin focus-tilan reunan väri
    MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: 'black !important',
            },
          },
        },
      },
    //select-elementin focus-tilan reunan väri
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
        borderWidth: '1px !important',
        borderColor: 'white !important',
        '&:hover fieldset': {
            borderColor: 'black !important',
        },
        },
      },
    },
    //Link-elementin tyylimääreet
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000',
          fontFamily: ["Quicksand", "sans-serif"].join(","),
          textDecoration: 'underline',
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
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'black !important',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '@media (min-width:400px)': {
            width: '92%',
          },
          '@media (min-width:576px)': {
            width: 370,
          },
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
          color: '#63c8cc',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: 14,
          letterSpacing: 0.1,
          backgroundColor: 'white',
          textAlign: 'center',
          margin: 10,
          display: 'inline-flex'
        },
        //error
        subtitle2: {
          color: 'red',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          fontSize: 14,
          letterSpacing: 0.1,
          backgroundColor: 'white',
          textAlign: 'center',
          margin: 10,
          display: 'inline-flex'
        },
        body1: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          margin: 10,
        },
        body2: {
          color: '#000000',
          fontFamily: ["Righteous", "sans-serif"].join(","),
          margin: 10,
        },
      },
    },
    },
});


export { formTheme };
