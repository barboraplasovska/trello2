import { fn } from '@storybook/test';
import AppBar from './AppBar';

const ActionData = {
  onLogout: fn(),
  href: 'https://google.com',
};

export default {
  component: AppBar,
  title: 'Components/AppBar',
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

export const Default = {};
