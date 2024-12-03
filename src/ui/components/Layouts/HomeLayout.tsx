// ui/layouts/HomeLayout.tsx
import React from 'react';
import { MainAppBar } from '../AppBar/MainAppBar/MainAppBar';
import { Box } from '@mui/material';

interface HomeLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, onLogout }) => {
  return (
    <Box sx={{ 
        backgroundColor: '#1E2125', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }}>
      <MainAppBar 
        onLogout={onLogout}
      />
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
