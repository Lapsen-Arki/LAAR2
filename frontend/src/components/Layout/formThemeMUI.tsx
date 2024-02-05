import { createTheme } from "@mui/material/styles";

const formTheme = createTheme({
  components: {
    MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: 'black !important',
            },
          },
        },
      },
  MuiInputBase: {
    styleOverrides: {
      root: {
      color: 'black',
      fontFamily: ["Quicksand", "sans-serif"].join(","),
      textDecoration: 'none',
      backgroundColor: 'white',
      '&:hover fieldset': {
        borderColor: 'black !important',
      },
      },
    },
  },
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
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: '#63c8cc',
        color: 'white',
        fontFamily: 'Quicksand',
        fontSize: '13px',
        marginTop: '10px',
        marginBottom: '10px',
        '&:hover': {
          backgroundColor: '#63c8cc',
          color: 'white',
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
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
  MuiLink: {
    styleOverrides: {
      root: {
        color: '#32979A',
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        textDecoration: 'none',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginTop: '0px',
        backgroundColor: 'white', 
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
    },
  },
},
});


export { formTheme };
