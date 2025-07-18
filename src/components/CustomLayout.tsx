// components/CustomLayout.tsx
import { Layout, AppBar, Sidebar, Menu } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

const CustomAppBar = () => (
  <AppBar 
    sx={{ 
      backgroundColor: '#C0355E',
      '& .MuiToolbar-root': {
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <img 
        src="/enda-logo.png" 
        alt="Enda Logo" 
        style={{ 
          height: '40px',
          width: 'auto'
        }} 
      />
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
        Enda Admin
      </Typography>
    </Box>
  </AppBar>
);

const CustomSidebar = () => (
  <Sidebar 
    sx={{
      '& .MuiDrawer-paper': {
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E0E0E0',
        width: 240,
      }
    }}
  >
    <>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #E0E0E0',
        backgroundColor: '#FFF0F5',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <img 
          src="/enda-logo.png" 
          alt="Enda Logo" 
          style={{ 
            height: '32px',
            width: 'auto'
          }} 
        />
        <Typography variant="subtitle1" sx={{ color: '#C0355E', fontWeight: 600 }}>
          Enda
        </Typography>
      </Box>
      <Menu 
        sx={{
          '& .MuiListItem-root': {
            borderRadius: '8px',
            margin: '4px 8px',
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
        }}
      />
    </>
  </Sidebar>
);

interface CustomLayoutProps {
  children: ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => (
  <Layout appBar={CustomAppBar} sidebar={CustomSidebar}>
    {children}
  </Layout>
);