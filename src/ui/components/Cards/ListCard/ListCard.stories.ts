import { fn } from '@storybook/test';
import { ListCard } from './ListCard';

const ActionData = {
  onAddCard: fn(),
  onArrowClick: fn(),
  onMoreClick: fn(),
  moveListLeft: fn(),
  moveListRight: fn(),
  onMoveTaskLeft: fn(),
  onMoveTaskRight: fn(),
};

export default {
  title: 'Components/Cards/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  args: {
    title: 'Ongoing',
    tasks: ['Task 1', 'Task 2', 'Task 3'],
    canMoveLeft: true,
    canMoveRight: true,
    ...ActionData,
  },
};

export const Default = {};
