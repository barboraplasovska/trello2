import { fn } from '@storybook/test';
import { ListCard } from './ListCard';
import { StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

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

type Story = StoryObj<typeof ListCard>;

export const Default: Story = {};

export const Interactions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the "Add Card" button and simulate a click
    const addCardButton = await canvas.getByRole('button', { name: /add a card/i });
    await userEvent.click(addCardButton);
    await expect(ActionData.onAddCard).toHaveBeenCalledTimes(1);

    // Simulate moving the list left
    if (ActionData.moveListLeft) {
      const moveLeftButton = await canvas.getByLabelText('Move list left');
      await userEvent.click(moveLeftButton);
      await expect(ActionData.moveListLeft).toHaveBeenCalledTimes(1);
    }

    // Simulate moving the list right
    if (ActionData.moveListRight) {
      const moveRightButton = await canvas.getByLabelText('Move list right');
      await userEvent.click(moveRightButton);
      await expect(ActionData.moveListRight).toHaveBeenCalledTimes(1);
    }

    // Simulate deleting the list
    const deleteButton = await canvas.getByLabelText('Delete list');
    await userEvent.click(deleteButton);
    await expect(ActionData.onDelete).toHaveBeenCalledTimes(1);
  },
};
