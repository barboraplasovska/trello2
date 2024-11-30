import React from 'react';
import { Button } from '@mui/material';

type AddCardButtonProps = {
  onClick: () => void;
};

export const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="text" 
      onClick={onClick} 
      sx={{
        textTransform: 'none',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '& .MuiTouchRipple-root': {
          color: 'white',
        },
      }}
    >
      + Add a card
    </Button>
  );
};
