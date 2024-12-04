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
      aria-label="add task"
      sx={{
        textTransform: 'none',
        color: 'white',
        borderRadius: 2,
        justifyContent: 'flex-start',
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
