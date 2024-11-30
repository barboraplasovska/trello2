import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { TaskCard } from '../TaskCard/TaskCard';
import { AddCardButton } from '../../Buttons/AddCardButton/AddCardButton';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';

type ListCardProps = {
  title: string;
  tasks: string[];
  onAddCard: () => void;
  onArrowClick: () => void;
  onMoreClick: () => void;
  moveListLeft?: () => void;
  moveListRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMoveTaskLeft: (task: string) => void;
  onMoveTaskRight: (task: string) => void;
};

export const ListCard: React.FC<ListCardProps> = ({
  title,
  tasks,
  onAddCard,
  onArrowClick,
  onMoreClick,
  moveListLeft,
  moveListRight,
  canMoveLeft,
  canMoveRight,
  onMoveTaskLeft,
  onMoveTaskRight,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#1E2125',
        padding: 2,
        borderRadius: 2,
        width: 300,
        marginRight: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, padding: 0, }}>
        <Typography variant="h6" color="white" sx={{ marginRight: 2 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: '4px' }}>
          {canMoveLeft && (
            <CustomIconButton
              onClick={moveListLeft}
              icon={<ArrowBackIos sx={{ color: 'white' }} />}
              ariaLabel="Move list left"
            />
          )}

          {canMoveRight && (
            <CustomIconButton
              onClick={moveListRight}
              icon={<ArrowForwardIos sx={{ color: 'white' }} />}
              ariaLabel="Move list right"
            />
          )}
        </Box>
      </Box>

      {tasks.map((task, index) => (
        <TaskCard
          key={task}
          title={task}
          moveTaskLeft={() => onMoveTaskLeft(task)}
          moveTaskRight={() => onMoveTaskRight(task)}
          canMoveLeft={index > 0}
          canMoveRight={index < tasks.length - 1}
        />
      ))}

      <AddCardButton onClick={onAddCard} />
    </Box>
  );
};
