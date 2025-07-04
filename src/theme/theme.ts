import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', 
    },
    secondary: {
      main: '#fbc02d', 
    },
    background: {
      default: '#fff8f0',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
