import { fn } from '@storybook/test';
import { TaskCard } from './TaskCard';

const ActionData = {
  onEditComplete: fn(),
  moveTaskLeft: fn(),
  moveTaskRight: fn(),
  onDelete: fn(),
};

export default {
  title: 'Components/Cards/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  args: {
    card: {
      card: {
        title: 'Card Title',
        description: 'Card Description'
      },
      boardId: '1'
    },
    isEditing: false,
    canMoveLeft: true,
    canMoveRight: true,
    ...ActionData
  }
};

export const Default = {};
