import { fn } from '@storybook/test';
import { TaskCard } from './TaskCard';

const ActionData = {
    onClick: fn(),
    moveTaskLeft: fn(),
    moveTaskRight: fn(),
    onDelete: fn(),
};

export default {
  title: 'Components/Cards/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  args: {
    title: 'Ongoing',
    canMoveLeft: true,
    canMoveRight: true,
    ...ActionData
  }
};

export const Default = {};
