import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete, Edit } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
import { TaskCard } from '../TaskCard/TaskCard';
import { AddCardButton } from '../../Buttons/AddCardButton/AddCardButton';
import { CardDto } from '../../../../core/models/CardDto';

type ListCardProps = {
  title: string;
  cards: CardDto[];
  onAddCard: () => void;
  moveListLeft?: () => void;
  moveListRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMoveCardLeft: (card: CardDto) => void;
  onMoveCardRight: (card: CardDto) => void;
  onDelete: () => void;
  onDeleteCard: (card: CardDto) => void;
  onUpdateCard: (cardIndex: number, newCard: CardDto) => void;
  onUpdateListTitle: (newTitle: string) => void;
  editingTask: number | null;
};

export const ListCard: React.FC<ListCardProps> = ({
  title,
  cards,
  onAddCard,
  moveListLeft,
  moveListRight,
  canMoveLeft,
  canMoveRight,
  onMoveCardLeft,
  onMoveCardRight,
  onDelete,
  onDeleteCard,
  onUpdateCard,
  onUpdateListTitle,
  editingTask,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (newTitle.trim()) {
      onUpdateListTitle(newTitle.trim());
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    handleTitleSave();
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
        {isEditingTitle ? (
          <TextField
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
            fullWidth
            sx={{
              backgroundColor: '#292D33',
              borderRadius: 2,
              input: { color: 'white' },
              marginBottom: 1,
            }}
          />
        ) : (
          <Typography variant="h6" color="white" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </Typography>
        )}
        <Box
          className="card-buttons"
          sx={{
            display: 'flex',
            alignItems: 'center',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {canMoveLeft && <CustomIconButton onClick={moveListLeft} icon={<ArrowBackIos />} ariaLabel="Move list left" tooltip="Move list left" />}
          {canMoveRight && <CustomIconButton onClick={moveListRight} icon={<ArrowForwardIos />} ariaLabel="Move list right" tooltip="Move list right" />}
          <CustomIconButton onClick={onDelete} icon={<Delete />} ariaLabel="Delete list" tooltip="Delete list" />
          <CustomIconButton onClick={handleTitleEdit} icon={<Edit />} ariaLabel="Edit list title" tooltip="Edit title" />
        </Box>
      </Box>

      {cards.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {cards
            .sort((a, b) => a.card.rank - b.card.rank)
            .map((cardDto, index) => (
              <TaskCard
                key={cardDto.card.id}
                card={cardDto}
                isEditing={editingTask === index}
                onEditComplete={(newCard) => onUpdateCard(index, newCard)}
                moveTaskLeft={() => onMoveCardLeft(cardDto)}
                moveTaskRight={() => onMoveCardRight(cardDto)}
                canMoveLeft={canMoveLeft}
                canMoveRight={canMoveRight}
                onDelete={() => onDeleteCard(cardDto)}
              />
            ))}
        </Box>
      )}

      <AddCardButton onClick={onAddCard} />
    </Box>
  );
};
