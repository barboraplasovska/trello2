import { fn } from '@storybook/test';
import NewBoardCard from './NewBoardCard';
import { StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const ActionData = {
  onCreateBoard: fn(),
  onCancel: fn(),
};

export default {
  title: 'Components/Cards/NewBoardCard',
  component: NewBoardCard,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

type Story = StoryObj<typeof NewBoardCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input field and type a title for the board
    const inputField = await canvas.getByPlaceholderText('Enter board title');
    await userEvent.type(inputField, 'New Board Title');

    // Find and click the "Add board" button
    const addBoardButton = await canvas.getByRole('button', { name: /add board/i });
    await userEvent.click(addBoardButton);

    // Ensure the onCreateBoard callback was called with the correct argument
    await expect(ActionData.onCreateBoard).toHaveBeenCalledWith('New Board Title');
    await expect(ActionData.onCreateBoard).toHaveBeenCalledTimes(1);

    // Find and click the "Cancel" button
    const cancelButton = await canvas.getByLabelText('Cancel');
    await userEvent.click(cancelButton);

    // Ensure the onCancel callback was called once
    await expect(ActionData.onCancel).toHaveBeenCalledTimes(1);
  },
};
