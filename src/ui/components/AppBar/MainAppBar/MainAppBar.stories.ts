import { fn } from '@storybook/test';
import MainAppBar from './MainAppBar';

const ActionData = {
  onLogout: fn(),
  href: 'https://google.com',
};

export default {
  component: MainAppBar,
  title: 'Components/AppBars/MainAppBar',
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

export const Default = {};
