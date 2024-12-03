import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete, Edit } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
import { CardDto } from '../../../../core/models/CardDto';

type TaskCardProps = {
  card: CardDto;
  isEditing?: boolean;
  onEditComplete?: (updatedCard: CardDto) => void;
  moveTaskLeft?: () => void;
  moveTaskRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onDelete: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  card,
  isEditing = false,
  onEditComplete,
  moveTaskLeft,
  moveTaskRight,
  canMoveLeft,
  canMoveRight,
  onDelete,
}) => {
  const [editingTitle, setEditingTitle] = useState(card.card.title);
  const [, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(isEditing);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditComplete = () => {
    const finalTitle = editingTitle.trim() || 'New task';
    setEditingTitle(finalTitle);
    setIsCurrentlyEditing(false);
    if (onEditComplete) {
      const updatedCard = {
        ...card,
        card: {
          ...card.card,
          title: finalTitle,
        },
      };
      onEditComplete(updatedCard);
    }
  };

  const handleEditClick = () => {
    setIsCurrentlyEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isCurrentlyEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCurrentlyEditing]);

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
        position: 'relative',
        '&:hover .task-buttons': { opacity: 1 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isCurrentlyEditing ? (
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="standard"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditComplete();
          }}
          placeholder="Enter a task"
          sx={{
            input: { color: 'white' },
            backgroundColor: '#292D33',
          }}
        />
      ) : (
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {card.card.title}
        </Typography>
      )}

      <Box
        className="task-buttons"
        sx={{
          display: 'flex',
          alignItems: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {canMoveLeft && <CustomIconButton onClick={moveTaskLeft} icon={<ArrowBackIos />} ariaLabel="Move task left" tooltip="Move task left" />}
        {canMoveRight && <CustomIconButton onClick={moveTaskRight} icon={<ArrowForwardIos />} ariaLabel="Move task right" tooltip="Move task right" />}
        <CustomIconButton onClick={onDelete} icon={<Delete />} ariaLabel="Delete task" tooltip="Delete task" />
        <CustomIconButton onClick={handleEditClick} icon={<Edit />} ariaLabel="Edit task" tooltip="Edit task" />
      </Box>
    </Box>
  );
};
