import React from 'react';
import { Button } from '@mui/material';

type AddListButtonProps = {
  onClick: () => void;
};

export const AddListButton: React.FC<AddListButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{
        textTransform: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          boxShadow: 'none',
        },
        width: '300px',
        minWidth: '300px',
        height: '40px',
        paddingLeft: 2,
        borderRadius: 2,
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      + Add another list
    </Button>
  );
};
