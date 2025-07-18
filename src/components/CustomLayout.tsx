// // components/CustomLayout.tsx
// import { Layout, AppBar, Sidebar, Menu, useStore } from 'react-admin';
// import { Box, Typography, IconButton, useMediaQuery, Theme } from '@mui/material';
// import { Menu as MenuIcon } from '@mui/icons-material';
// import { ReactNode } from 'react';

// const CustomAppBar = () => {
//   const [open, setOpen] = useStore('sidebar.open', true);
//   const isLargeEnough = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  
//   return (
//     <AppBar 
//       sx={{ 
//         backgroundColor: '#C0355E',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         '& .MuiToolbar-root': {
//           minHeight: '64px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0 16px',
//         }
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//         {/* Menu button for mobile/tablet */}
//         {!isLargeEnough && (
//           <IconButton
//             color="inherit"
//             aria-label="toggle sidebar"
//             onClick={() => setOpen(!open)}
//             edge="start"
//             sx={{ mr: 1 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}
        
//         <img 
//           src="/enda-logo.png" 
//           alt="Enda Logo" 
//           style={{ 
//             height: '40px',
//             width: 'auto'
//           }} 
//         />
//         <Typography variant="h6" sx={{ 
//           color: 'white', 
//           fontWeight: 600,
//           letterSpacing: '0.5px'
//         }}>
//           Enda Admin
//         </Typography>
//       </Box>
      
//       {/* Right side of navbar - you can add user menu, notifications, etc. here */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         {/* Add user profile, logout, etc. here if needed */}
//       </Box>
//     </AppBar>
//   );
// };

// const CustomSidebar = () => (
//   <Sidebar 
//     sx={{
//       '& .MuiDrawer-paper': {
//         backgroundColor: '#FFFFFF',
//         borderRight: '1px solid #E0E0E0',
//         width: 240,
//         boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
//       },
//       // Ensure sidebar can be closed on mobile
//       '& .MuiDrawer-root': {
//         '& .MuiBackdrop-root': {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//       },
//     }}
//   >
//     <>
//       <Box sx={{ 
//         p: 2, 
//         borderBottom: '1px solid #E0E0E0',
//         backgroundColor: '#FFF0F5',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         minHeight: '64px', // Match AppBar height
//       }}>
//         <img 
//           src="/enda-logo.png" 
//           alt="Enda Logo" 
//           style={{ 
//             height: '32px',
//             width: 'auto'
//           }} 
//         />
//         <Typography variant="subtitle1" sx={{ 
//           color: '#C0355E', 
//           fontWeight: 600,
//           letterSpacing: '0.5px'
//         }}>
//           Enda
//         </Typography>
//       </Box>
      
//       <Menu 
//         sx={{
//           padding: '8px',
//           '& .MuiList-root': {
//             paddingTop: '8px',
//             paddingBottom: '8px',
//           },
//           '& .MuiListItem-root': {
//             borderRadius: '8px',
//             margin: '2px 0',
//             transition: 'all 0.2s ease-in-out',
//             '&:hover': {
//               backgroundColor: '#FFF0F5',
//               transform: 'translateX(2px)',
//             },
//             '&.Mui-selected': {
//               backgroundColor: '#C0355E',
//               color: '#FFFFFF',
//               '& .MuiListItemIcon-root': {
//                 color: '#FFFFFF',
//               },
//               '& .MuiListItemText-primary': {
//                 fontWeight: 600,
//               },
//               '&:hover': {
//                 backgroundColor: '#8B1538',
//                 transform: 'translateX(2px)',
//               },
//             },
//           },
//           '& .MuiListItemIcon-root': {
//             color: '#C0355E',
//             minWidth: '40px',
//           },
//           '& .MuiListItemText-primary': {
//             fontSize: '0.9rem',
//             fontWeight: 500,
//           },
//         }}
//       />
//     </>
//   </Sidebar>
// );

// interface CustomLayoutProps {
//   children: ReactNode;
// }

// export const CustomLayout = ({ children }: CustomLayoutProps) => (
//   <Layout 
//     appBar={CustomAppBar} 
//     sidebar={CustomSidebar}
//     sx={{
//       '& .MuiBox-root': {
//         transition: 'margin-left 0.3s ease-in-out',
//       },
//     }}
//   >
//     {children}
//   </Layout>
// );