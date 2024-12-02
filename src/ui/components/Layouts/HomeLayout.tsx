// ui/layouts/HomeLayout.tsx
import React from 'react';
import MainAppBar from '../AppBar/MainAppBar/MainAppBar';
import { Box } from '@mui/material';

interface HomeLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, onLogout }) => {
  return (
    <>
      <MainAppBar 
        onLogout={onLogout}
      />
      <Box sx={{ marginTop: "80px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
        {children}
      </Box>
    </>
  );
};

export default HomeLayout;
