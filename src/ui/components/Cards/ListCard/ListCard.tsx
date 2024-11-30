import React from 'react';
import { Box, Typography } from '@mui/material';
import { TaskCard } from '../TaskCard/TaskCard';
import { AddCardButton } from '../../Buttons/AddCardButton/AddCardButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';

type ListCardProps = {
  title: string;
  tasks: string[];
  onAddCard: () => void;
  onArrowClick: () => void;
  onMoreClick: () => void;
};

export const ListCard: React.FC<ListCardProps> = ({ title, tasks, onAddCard, onArrowClick, onMoreClick }) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" color="white" sx={{ marginRight: 2 }}>
          {title}
        </Typography>

        <Box>
          <CustomIconButton 
            onClick={onArrowClick} 
            icon={<SyncAltIcon />} 
            ariaLabel="Move list"
          />

          <CustomIconButton 
            onClick={onMoreClick} 
            icon={<MoreHorizIcon />} 
            ariaLabel="More options"
          />
        </Box>
      </Box>

      {tasks.map((task, index) => (
        <TaskCard key={index} title={task} />
      ))}

      <AddCardButton onClick={onAddCard} />
    </Box>
  );
};
