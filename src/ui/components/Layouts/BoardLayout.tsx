// ui/layouts/BoardLayout.tsx
import React from 'react';
import { MainAppBar } from '../AppBar/MainAppBar/MainAppBar';
import { Box } from '@mui/material';
import {SubAppBar} from '../AppBar/SubAppBar/SubAppBar';
import {CardDto} from "../../../core/models/CardDto";
import {DialogType} from "../../../core/models/DialogType";

interface BoardLayoutProps {
  color: string;
  title: string;
  children: React.ReactNode;
  onLogout: () => void;
  onDelete: (type: DialogType, item: string | CardDto | null) => void;
  onEdit: (newTitle: string) => void;
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
      <Box
        sx={{
          backgroundColor: color,
          margin: '10px',
          flex: 1,
          padding: 2,
          overflowX: 'scroll',
          scrollbarColor: `#1E2125 ${color}`,
          msScrollbarShadowColor: 'transparent',
        }}
      >
        {children}
      </Box>
    </Box >
  );
};

export default BoardLayout;
