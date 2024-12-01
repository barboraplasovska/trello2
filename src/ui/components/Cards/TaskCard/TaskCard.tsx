import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';

type TaskCardProps = {
  title: string;
  isEditing?: boolean;
  onClick?: () => void;
  onEditComplete?: (newTitle: string) => void;
  moveTaskLeft?: () => void;
  moveTaskRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onDelete: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  isEditing = false,
  onEditComplete,
  moveTaskLeft,
  moveTaskRight,
  canMoveLeft,
  canMoveRight,
  onDelete,
}) => {
  const [editingTitle, setEditingTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditComplete = () => {
    const finalTitle = editingTitle.trim() || 'New task'; 
    setEditingTitle(finalTitle);
    if (onEditComplete) {
      onEditComplete(finalTitle);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#292D33',
        color: 'white',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isEditing ? (
        <TextField
          inputRef={inputRef} // Focus on this input
          fullWidth
          variant="standard"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditComplete();
          }}
          placeholder="Enter a task"
          sx={{ input: { color: 'white' } }}
        />
      ) : (
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {canMoveLeft && <CustomIconButton onClick={moveTaskLeft} icon={<ArrowBackIos />} ariaLabel="Move task left" />}
        {canMoveRight && <CustomIconButton onClick={moveTaskRight} icon={<ArrowForwardIos />} ariaLabel="Move task right" />}
        <CustomIconButton onClick={onDelete} icon={<Delete />} ariaLabel="Delete task" />
      </Box>
    </Box>
  );
};
