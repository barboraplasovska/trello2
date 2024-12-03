import { fn } from '@storybook/test';
import { BoardListCarousel } from './BoardListCarousel';

const columns = [
  {
    column:
      { id: '1', name: 'Column 1' },
    cards: [
      {
        card: {
          id: '1',
          title: 'Card 1',
          description: 'Description 1'
        }, boardId: '1'
      },
    ],
  }
];

const ActionData = {
  onMoveColumnLeft: fn(),
  onMoveColumnRight: fn(),
  onMoveCardLeft: fn(),
  onMoveCardRight: fn(),
  onDeleteColumn: fn(),
  onDeleteCard: fn(),
  onAddCard: fn(),
  onUpdateCard: fn(),
  onUpdateColumnTitle: fn(),
  onCancelAddColumn: fn(),
  onAddColumn: fn(),
};

export default {
  title: 'Components/Lists/BoardListCarousel',
  component: BoardListCarousel,
  tags: ['autodocs'],
  args: {
    columns,
    boardId: '1',
    ...ActionData,
  },
};

export const Default = {};
