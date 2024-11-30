import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

type SubAppBarProps = {
  title: string;
  style?: React.CSSProperties;
};

export const SubAppBar: React.FC<SubAppBarProps> = ({ title, style }) => {
  return (
    <AppBar 
      position="static" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        ...style 
      }}
    >
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
