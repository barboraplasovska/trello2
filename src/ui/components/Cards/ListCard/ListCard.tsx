import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton'; // Import the CustomIconButton
import { TaskCard } from '../TaskCard/TaskCard';
import { AddCardButton } from '../../Buttons/AddCardButton/AddCardButton';

type ListCardProps = {
  title: string;
  tasks: string[];
  onAddCard: () => void;
  moveListLeft?: () => void;
  moveListRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMoveTaskLeft: (task: string) => void;
  onMoveTaskRight: (task: string) => void;
  onDelete: () => void; 
  onDeleteTask: (task: string) => void; 
};

export const ListCard: React.FC<ListCardProps> = ({
  title,
  tasks,
  onAddCard,
  moveListLeft,
  moveListRight,
  canMoveLeft,
  canMoveRight,
  onMoveTaskLeft,
  onMoveTaskRight,
  onDelete,
  onDeleteTask,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#1E2125',
        padding: 2,
        borderRadius: 2,
        width: 800,
        marginRight: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" color="white" sx={{ marginRight: 2 }}>
          {title}
        </Typography>

        <Box>
          {canMoveLeft && (
            <CustomIconButton 
              onClick={moveListLeft} 
              icon={<ArrowBackIos />} 
              ariaLabel="Move list left"
            />
          )}

          {canMoveRight && (
            <CustomIconButton 
              onClick={moveListRight} 
              icon={<ArrowForwardIos />} 
              ariaLabel="Move list right"
            />
          )}
          
          <CustomIconButton 
            onClick={onDelete} 
            icon={<Delete />} 
            ariaLabel="Delete list" 
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </Box>

      {tasks.map((task, index) => (
        <TaskCard
          key={task}
          title={task}
          moveTaskLeft={() => onMoveTaskLeft(task)}
          moveTaskRight={() => onMoveTaskRight(task)}
          canMoveLeft={canMoveLeft}
          canMoveRight={canMoveRight}
          onDelete={() => onDeleteTask(task)}
        />
      ))}

      <AddCardButton onClick={onAddCard} />
    </Box>
  );
};
