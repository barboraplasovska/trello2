// ui/layouts/HomeLayout.tsx
import React from 'react';
import HomeNavBar from '../Navbars/HomeNavbar';
import { Box } from '@mui/material';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <>
        <Box sx={styles.background}>
            <Box sx={styles.margins}>
                {children}
            </Box>
        </Box>
    </>
  );
};

const styles = {
    margins :{
    },

    background: {
        backgroundColor: "#1D2125",
        minHeight: "100vh",
        width: "100vw",
    }
}

export default LoginLayout;
