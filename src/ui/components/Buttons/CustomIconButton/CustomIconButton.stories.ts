import { fn } from '@storybook/test'; 
import { CustomIconButton } from './CustomIconButton';

import SyncAltIcon from '@mui/icons-material/SyncAlt';
import React from 'react';

const ActionData = {
  onClick: fn(),
};

export default {
  title: 'Components/Buttons/CustomIconButton',
  component: CustomIconButton,
  tags: ['autodocs'],
  args: {
    icon: React.createElement(SyncAltIcon),
    ariaLabel: 'Move list',
    ...ActionData, 
  },
};

export const Default = {};
