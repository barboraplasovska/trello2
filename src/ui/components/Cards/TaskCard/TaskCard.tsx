import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';

type TaskCardProps = {
  title: string;
  onClick?: () => void;
  moveTaskLeft?: () => void;
  moveTaskRight?: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onDelete: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  onClick,
  moveTaskLeft,
  moveTaskRight,
  canMoveLeft,
  canMoveRight,
  onDelete, 
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#292D33',
        color: 'white',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2,
        margin: 1,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '30px',
        textAlign: 'left',
        position: 'relative',
      }}
    >
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {canMoveLeft && (
          <CustomIconButton 
            onClick={moveTaskLeft} 
            icon={<ArrowBackIos />} 
            ariaLabel="Move task left"
          />
        )}
        {canMoveRight && (
          <CustomIconButton 
            onClick={moveTaskRight} 
            icon={<ArrowForwardIos />} 
            ariaLabel="Move task right"
          />
        )}
        <CustomIconButton 
          onClick={onDelete} 
          icon={<Delete />} 
          ariaLabel="Delete task" 
          sx={{ marginLeft: 2 }}
        />
      </Box>
    </Box>
  );
};
