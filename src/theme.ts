// theme.ts
import { createTheme } from '@mui/material/styles';

export const endaTheme = createTheme({
  palette: {
    primary: {
      main: '#C0355E',
      light: '#E8639B',
      dark: '#8B1538',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFF555',
      dark: '#CCA000',
      contrastText: '#000000',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    grey: {
      100: '#F5F5F5',
      200: '#E0E0E0',
      300: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#C0355E',
      letterSpacing: '0.5px',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#C0355E',
      letterSpacing: '0.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#C0355E',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '& .MuiToolbar-root': {
            minHeight: '64px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
          boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
          width: 240,
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          '& .RaMenuItemLink-root': {
            borderRadius: '8px',
            margin: '2px 8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#FFF0F5',
              transform: 'translateX(2px)',
            },
            '&.RaMenuItemLink-active': {
              backgroundColor: '#C0355E',
              color: '#FFFFFF',
              '& .MuiListItemIcon-root': {
                color: '#FFFFFF',
              },
              '& .MuiListItemText-primary': {
                fontWeight: 600,
              },
              '&:hover': {
                backgroundColor: '#8B1538',
                transform: 'translateX(2px)',
              },
            },
          },
          '& .MuiListItemIcon-root': {
            color: '#C0355E',
            minWidth: '40px',
          },
          '& .MuiListItemText-primary': {
            fontSize: '0.9rem',
            fontWeight: 500,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          backgroundColor: '#C0355E',
          boxShadow: '0 2px 4px rgba(192, 53, 94, 0.3)',
          '&:hover': {
            backgroundColor: '#8B1538',
            boxShadow: '0 4px 8px rgba(192, 53, 94, 0.4)',
          },
        },
        outlined: {
          borderColor: '#C0355E',
          color: '#C0355E',
          '&:hover': {
            borderColor: '#8B1538',
            backgroundColor: 'rgba(192, 53, 94, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C0355E',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C0355E',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#C0355E',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#FFF0F5',
            color: '#C0355E',
            fontWeight: 600,
            borderBottom: '2px solid #E0E0E0',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#C0355E',
          '&.Mui-checked': {
            color: '#C0355E',
          },
        },
      },
    },
    // Ensure RaList content has consistent styling
    RaList: {
      styleOverrides: {
        content: {
          backgroundColor: '#F8F9FA',
          padding: '16px',
          borderRadius: '8px',
        },
      },
    },
  },
});