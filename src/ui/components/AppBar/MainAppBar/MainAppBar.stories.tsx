import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import MainAppBar from './MainAppBar';
import { fn } from '@storybook/test';

const ActionData = {
  onLogout: fn(),
};

export default {
  component: MainAppBar,
  title: 'Components/AppBars/MainAppBar',
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

export const Default = (args: any) => <MainAppBar {...args} />; 