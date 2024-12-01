import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
import { Close } from '@mui/icons-material';

type NewListCardProps = {
  onAddList: (title: string) => void;
  onCancel: () => void;
};

export const NewListCard: React.FC<NewListCardProps> = ({ onAddList, onCancel }) => {
  const [listTitle, setListTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddList = () => {
    if (listTitle.trim()) {
      setIsSubmitting(true);
      onAddList(listTitle.trim());
      setListTitle('');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1E2125',
        padding: 2,
        borderRadius: 2,
        width: 300,
        marginRight: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginBottom: 2,
        }}
      >
        <TextField
          variant="outlined"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Enter list name"
          fullWidth
          autoFocus
          disabled={isSubmitting}
          sx={{
            input: { color: 'white' },
            backgroundColor: '#292D33',
            borderRadius: 1,
            marginBottom: 1, 
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start', 
            gap: 1,
          }}
        >
          <Button
            onClick={handleAddList}
            disabled={isSubmitting || !listTitle.trim()}
            sx={{
              backgroundColor: '#689BF8',
              color: 'black',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#85B8FF',
              },
            }}
          >
            Add list
          </Button>
          <CustomIconButton onClick={onCancel} icon={<Close />} ariaLabel="Cancel" />
        </Box>
      </Box>
    </Box>
  );
};
