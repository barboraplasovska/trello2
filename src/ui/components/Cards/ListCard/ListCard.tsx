import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
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
  onUpdateTask: (taskIndex: number, newTitle: string) => void;
  editingTask: number | null;
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
  onUpdateTask,
  editingTask,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Typography variant="h6" color="white" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </Typography>
        <Box
          className="card-buttons"
          sx={{
            display: 'flex',
            alignItems: 'center',
            opacity: isHovered ? 1 : 0, 
            transition: 'opacity 0.3s ease',
          }}
        >
          {canMoveLeft && <CustomIconButton onClick={moveListLeft} icon={<ArrowBackIos />} ariaLabel="Move list left"  tooltip="Move list left"/>}
          {canMoveRight && <CustomIconButton onClick={moveListRight} icon={<ArrowForwardIos />} ariaLabel="Move list right" tooltip="Move list right"/>}
          <CustomIconButton onClick={onDelete} icon={<Delete />} ariaLabel="Delete list" tooltip="Delete list"/>
        </Box>
      </Box>

      {tasks.length > 0 && <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tasks.map((task, index) => (
          <TaskCard
            key={`${task}-${index}`}
            title={task}
            isEditing={editingTask === index}
            onEditComplete={(newTitle) => onUpdateTask(index, newTitle)}
            moveTaskLeft={() => onMoveTaskLeft(task)}
            moveTaskRight={() => onMoveTaskRight(task)}
            canMoveLeft={canMoveLeft}
            canMoveRight={canMoveRight}
            onDelete={() => onDeleteTask(task)}
          />
        ))}
      </Box>
      }

      <AddCardButton onClick={onAddCard} />
    </Box>
  );
};
