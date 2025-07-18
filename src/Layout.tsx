// Layout.tsx
import { Layout as RALayout, AppBar, Sidebar, Menu, useStore } from 'react-admin';
import { Box, Typography, IconButton, useMediaQuery, Theme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ReactNode } from 'react';

const CustomAppBar = (props: any) => {
  const [open, setOpen] = useStore('sidebar.open', true);
  const isLargeEnough = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));

  return (
    <AppBar {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        {!isLargeEnough && (
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src="/enda-logo.png"
          alt="Enda Logo"
          style={{
            height: '40px',
            width: 'auto',
          }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', fontWeight: 600 }}>
          EndaAdmin
        </Typography>
        {/* Add user menu, logout, etc. here if needed */}
      </Box>
    </AppBar>
  );
};

const CustomSidebar = (props: any) => (
  <Sidebar {...props}>
    <Box
      sx={{
        p: 2,
        backgroundColor: (theme) => theme.palette.grey[100],
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        minHeight: '30px',
      }}
    >
        {/* <img
          src="/enda-logo.png"
          alt="Enda Logo"
          style={{
            height: '32px',
            width: 'auto',
            alignItems: 'center',
          }}
        /> */}
      {/* <Typography variant="subtitle1" color="primary">
        Enda
      </Typography> */}
    </Box>
    <Menu />
  </Sidebar>
);

interface CustomLayoutProps {
  children: ReactNode;
  [key: string]: any; // Allow additional props
}

export const CustomLayout = ({ children, ...props }: CustomLayoutProps) => (
  <RALayout appBar={CustomAppBar} sidebar={CustomSidebar} {...props}>
    {children}
  </RALayout>
);