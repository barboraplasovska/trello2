import { fn } from '@storybook/test';
import { ListCard } from './ListCard';

const ActionData = {
    onClick: fn(),
};

export default {
  title: 'Components/Cards/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  args: {
    title: 'Ongoing',
    tasks: ["Task 1", "Task 2", "Task 3"],
    ...ActionData
  }
};

export const Default = {};