import React from 'react';
import { IconButton } from '@mui/material';

type CustomIconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode; 
  ariaLabel: string;
};

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({ onClick, icon, ariaLabel }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&:active': {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        '& .MuiTouchRipple-ripple': {
          backgroundColor: 'white',
        },
      }}
      aria-label={ariaLabel}
    >
      {icon}
    </IconButton>
  );
};
