import { fn } from '@storybook/test';
import { NewListCard } from './NewListCard';
import { StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const ActionData = {
  onAddList: fn(),
  onCancel: fn(),
};

export default {
  title: 'Components/Cards/NewListCard',
  component: NewListCard,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

type Story = StoryObj<typeof NewListCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input field and type a title for the list
    const inputField = await canvas.getByPlaceholderText('Enter list name');
    await userEvent.type(inputField, 'New List');

    // Find and click the "Add list" button
    const addListButton = await canvas.getByRole('button', { name: /add list/i });
    await userEvent.click(addListButton);

    // Ensure the onAddList callback was called with the correct argument
    await expect(ActionData.onAddList).toHaveBeenCalledWith('New List');
    await expect(ActionData.onAddList).toHaveBeenCalledTimes(1);

    // Find and click the "Cancel" button
    const cancelButton = await canvas.getByLabelText('Cancel');
    await userEvent.click(cancelButton);

    // Ensure the onCancel callback was called once
    await expect(ActionData.onCancel).toHaveBeenCalledTimes(1);
  },
};
