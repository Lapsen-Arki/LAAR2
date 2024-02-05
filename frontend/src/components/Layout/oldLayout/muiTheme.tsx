import { createTheme } from '@mui/material/styles';

const headingTheme = createTheme({
    typography: {
      fontFamily: [
        'Righteous',
        'sans-serif',
      ].join(','),
    },
    palette: {
      primary: {
        main: 'Righteous',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },
    },
  });

const paragraphTheme = createTheme({
    typography: {
      fontFamily: [
        'Quicksand',
        'sans-serif',
      ].join(','),
    },
    palette: {
      primary: {
        main: 'Quicksand',
      },
    },
  });

export {headingTheme, paragraphTheme};