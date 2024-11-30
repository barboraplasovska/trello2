import React from 'react';
import { Box, Typography } from '@mui/material';

type TaskCardProps = {
  title: string;
  onClick?: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ title, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: '#292D33',
        color: 'white',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2, 
        margin: 1,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '30px',
        textAlign: 'left',
      }}
    >
      <Typography variant="body1">{title}</Typography>
    </Box>
  );
};
