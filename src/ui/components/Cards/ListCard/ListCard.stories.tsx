import { fn } from '@storybook/test';
import { ListCard } from './ListCard';

const ActionData = {
  onAddCard: fn(),
  moveListLeft: fn(),
  moveListRight: fn(),
  onMoveCardLeft: fn(),
  onMoveCardRight: fn(),
  onDelete: fn(),
  onDeleteCard: fn(),
  onUpdateCard: fn(),
  onUpdateListTitle: fn(),
};

export default {
  title: 'Components/Cards/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  args: {
    title: 'List Title',
    cards: [
      {
        card:
        {
          title: 'Card Title',
          description: 'Card Description'
        },
        boardId: '1'
      }
    ],
    canMoveLeft: true,
    canMoveRight: true,
    editingTask: null,
    ...ActionData,
  },
};

export const Default = {};
