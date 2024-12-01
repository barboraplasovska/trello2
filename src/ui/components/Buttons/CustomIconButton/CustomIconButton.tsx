import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

type CustomIconButtonProps = {
  onClick?: () => void;
  icon: React.ReactNode;
  ariaLabel: string;
  sx?: object;
  tooltip?: string; 
};

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  onClick = () => {},
  icon,
  ariaLabel,
  sx,
  tooltip,
}) => {
  return (
    <Tooltip
      title={tooltip || ''}
      arrow={false} 
      sx={{
        '& .MuiTooltip-tooltip': {
          backgroundColor: '#9FADBC', 
          color: 'black', 
          fontSize: '12px', 
          borderRadius: '4px', 
        },
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          color: 'white',
          padding: '0px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:active': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          '& .MuiTouchRipple-ripple': {
            backgroundColor: 'white',
          },
        }}
        aria-label={ariaLabel}
      >
        {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 16, ...sx } })}
      </IconButton>
    </Tooltip>
  );
};
