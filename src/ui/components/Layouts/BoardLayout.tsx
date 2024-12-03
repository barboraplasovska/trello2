// ui/layouts/BoardLayout.tsx
import React from 'react';
import MainAppBar from '../AppBar/MainAppBar/MainAppBar';
import { Box } from '@mui/material';
import { SubAppBar } from '../AppBar/SubAppBar/SubAppBar';

interface BoardLayoutProps {
  color: string;
  title: string;
  children: React.ReactNode;
  onLogout: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const BoardLayout: React.FC<BoardLayoutProps> = ({
  color,
  title,
  children,
  onLogout,
  onDelete,
  onEdit,
}) => {
  return (
    <Box sx={{
      backgroundColor: color,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <MainAppBar
        onLogout={onLogout}
      />
      <SubAppBar
        title={title}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Box sx={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default BoardLayout;
