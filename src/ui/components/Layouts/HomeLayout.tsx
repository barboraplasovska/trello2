// ui/layouts/HomeLayout.tsx
import React from 'react';
import HomeNavBar from '../Navbars/HomeNavbar';
import { Box } from '@mui/material';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <HomeNavBar />
      <Box sx={{ marginTop: "80px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
        {children}
      </Box>
    </>
  );
};

export default HomeLayout;
