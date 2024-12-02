// ui/layouts/HomeLayout.tsx
import React from 'react';
import { Box } from '@mui/material';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <>
        <Box sx={styles.background}>
            {children}
        </Box>
    </>
  );
};

const styles = {
    background: {
        backgroundColor: "#1D2125",
        minHeight: "100vh",
        width: "100vw",
    }
}

export default LoginLayout;
