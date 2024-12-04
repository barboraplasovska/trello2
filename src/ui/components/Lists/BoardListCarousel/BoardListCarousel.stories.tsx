import { within, userEvent } from '@storybook/testing-library';
import { expect, fn } from '@storybook/test';
import { BoardListCarousel } from './BoardListCarousel';
import { StoryObj } from '@storybook/react/*';

export default {
  title: 'Components/Lists/BoardListCarousel',
  component: BoardListCarousel,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof BoardListCarousel>;

export const Default: Story = {
  args: {
    columns: [
      {
        column: {
          id: '1', name: 'Column 1',
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: '',
          rank: 0
        },
        cards: [
          {
            card: {
              id: '1', title: 'Card 1', rank: 0,
              version: 0,
              createdAt: '',
              updatedAt: '',
              body: '',
              columnId: ''
            },
            boardId: '1',
          },
        ],
      },
    ],
    boardId: '1',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify that the column and its card are rendered
    const column = canvas.getByText('Column 1');
    await expect(column).toBeInTheDocument();

    const card = canvas.getByText('Card 1');
    await expect(card).toBeInTheDocument();
  },
};

export const TestMoveColumnLeftRight: Story = {
  args: {
    columns: [
      {
        column: {
          id: '1', name: 'Column 1', rank: 1,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [{
          card: {
            id: '1', title: 'Card 1', rank: 0,
            version: 0,
            createdAt: '',
            updatedAt: '',
            body: '',
            columnId: ''
          }, boardId: '1'
        }],
      },
      {
        column: {
          id: '2', name: 'Column 2', rank: 2,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [{
          card: {
            id: '2', title: 'Card 2', rank: 0,
            version: 0,
            createdAt: '',
            updatedAt: '',
            body: '',
            columnId: ''
          }, boardId: '1'
        }],
      },
    ],
    boardId: '1',
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
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const moveLeftButton = canvas.getByRole('button', { name: /Move list left/i });
    const moveRightButton = canvas.getByRole('button', { name: /Move list right/i });

    // Simulate column movement to the left
    await userEvent.click(moveLeftButton);
    await expect(args.onMoveColumnLeft).toHaveBeenCalledTimes(1);

    // Simulate column movement to the right
    await userEvent.click(moveRightButton);
    // await expect(args.onMoveColumnRight).toHaveBeenCalledTimes(1);
  },
};

export const TestMoveCardLeftRight: Story = {
  args: {
    columns: [
      {
        column: {
          id: '1', name: 'Column 1', rank: 1,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [{
          card: {
            id: '1', title: 'Card 1', rank: 0,
            version: 0,
            createdAt: '',
            updatedAt: '',
            body: '',
            columnId: ''
          }, boardId: '1'
        }],
      },
      {
        column: {
          id: '2', name: 'Column 2', rank: 2,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [{
          card: {
            id: '2', title: 'Card 2', rank: 0,
            version: 0,
            createdAt: '',
            updatedAt: '',
            body: '',
            columnId: ''
          }, boardId: '1'
        }],
      },
    ],
    boardId: '1',
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
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const moveCardLeftButton = canvas.getByRole('button', { name: /move task left/i });
    const moveCardRightButton = canvas.getByRole('button', { name: /move task right/i });

    // Simulate card movement to the left
    await userEvent.click(moveCardLeftButton);
    await expect(args.onMoveCardLeft).toHaveBeenCalledTimes(1);

    // Simulate card movement to the right
    await userEvent.click(moveCardRightButton);
    await expect(args.onMoveCardRight).toHaveBeenCalledTimes(1);
  },
};

export const TestDeleteColumnCard: Story = {
  args: {
    columns: [
      {
        column: {
          id: '1', name: 'Column 1', rank: 1,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [
          {
            card: {
              id: '1', title: 'Card 1', rank: 0,
              version: 0,
              createdAt: '',
              updatedAt: '',
              body: '',
              columnId: ''
            }, boardId: '1'
          },
        ],
      },
    ],
    boardId: '1',
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
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const deleteColumnButton = canvas.getByRole('button', { name: /delete list/i });
    const deleteCardButton = canvas.getByRole('button', { name: /delete task/i });

    // Simulate column deletion
    await userEvent.click(deleteColumnButton);
    await expect(args.onDeleteColumn).toHaveBeenCalledTimes(1);

    // Simulate card deletion
    await userEvent.click(deleteCardButton);
    //  await expect(args.onDeleteCard).toHaveBeenCalledTimes(1);
  },
};

export const TestAddColumnAndCard: Story = {
  args: {
    columns: [
      {
        column: {
          id: '1', name: 'Column 1', rank: 1,
          version: 0,
          createdAt: '',
          updatedAt: '',
          boardId: ''
        },
        cards: [{
          card: {
            id: '1', title: 'Card 1', rank: 0,
            version: 0,
            createdAt: '',
            updatedAt: '',
            body: '',
            columnId: ''
          }, boardId: '1'
        }],
      },
    ],
    boardId: '1',
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
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const addColumnButton = canvas.getByRole('button', { name: /add list/i });
    const addCardButton = canvas.getByRole('button', { name: /add task/i });

    // Simulate adding a column
    await userEvent.click(addColumnButton);
    // await expect(args.onAddColumn).toHaveBeenCalledTimes(1);

    // Simulate adding a card
    await userEvent.click(addCardButton);
    //  await expect(args.onAddCard).toHaveBeenCalledTimes(1);
  },
};
