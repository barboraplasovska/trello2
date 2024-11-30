import { fn } from '@storybook/test';
import { TaskCard } from './TaskCard';

const ActionData = {
    onClick: fn(),
};

export default {
  title: 'Components/Cards/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  args: {
    title: 'Ongoing',
    ...ActionData
  }
};

export const Default = {};
