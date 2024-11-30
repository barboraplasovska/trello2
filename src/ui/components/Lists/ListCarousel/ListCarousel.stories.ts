import { fn } from '@storybook/test';
import { ListCarousel } from './ListCarousel';

const lists = [
  { id: '1', title: 'To Do', tasks: ['Task 1', 'Task 2', 'Task 3'] },
  { id: '2', title: 'In Progress', tasks: ['Task 4', 'Task 5'] },
  { id: '3', title: 'Completed', tasks: ['Task 6', 'Task 7'] },
];

const ActionData = {
  onDragEnd: fn(),
};

export default {
  title: 'Components/Lists/ListCarousel',
  component: ListCarousel,
  tags: ['autodocs'],
  args: {
    lists,
    onDragEnd: ActionData.onDragEnd,
  },
};

export const Default = {};
