// theme.ts
import { createTheme } from '@mui/material/styles';

export const endaTheme = createTheme({
  palette: {
    primary: {
      main: '#C0355E', // Enda's primary color
      light: '#E8639B',
      dark: '#8B1538',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700', // Gold color from the logo
      light: '#FFF555',
      dark: '#CCA000',
      contrastText: '#000000',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#C0355E',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#C0355E',
    },
  },
  components: {
    // Customize the AppBar (top navigation)
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#C0355E',
          '& .MuiToolbar-root': {
            minHeight: '64px',
          },
        },
      },
    },
    // Customize the Drawer (sidebar)
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
          '& .MuiListItem-root': {
            '&:hover': {
              backgroundColor: '#FFF0F5',
            },
            '&.Mui-selected': {
              backgroundColor: '#C0355E',
              color: '#FFFFFF',
              '& .MuiListItemIcon-root': {
                color: '#FFFFFF',
              },
              '&:hover': {
                backgroundColor: '#8B1538',
              },
            },
          },
          '& .MuiListItemIcon-root': {
            color: '#C0355E',
          },
        },
      },
    },
    // Customize buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#C0355E',
          '&:hover': {
            backgroundColor: '#8B1538',
          },
        },
      },
    },
    // Customize cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    // Customize form inputs
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C0355E',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C0355E',
            },
          },
        },
      },
    },
  },
});