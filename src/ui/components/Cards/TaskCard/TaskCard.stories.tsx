import { fn } from '@storybook/test';
import { TaskCard } from './TaskCard';
import { StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

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

type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate editing the task card title
    const editButton = await canvas.getByLabelText('Edit task');
    await userEvent.click(editButton);

    // Focus on the input field and change its value
    const inputField = await canvas.getByPlaceholderText('Enter a task');
    await userEvent.clear(inputField);
    await userEvent.type(inputField, 'Updated Task Title');

    // Simulate saving the task edit by blurring the input field
    await userEvent.tab(); // or userEvent.click elsewhere to trigger onBlur
    await expect(ActionData.onEditComplete).toHaveBeenCalledWith({
      card: {
        title: 'Updated Task Title',
        description: 'Card Description',
      },
      boardId: '1',
    });

    // Simulate moving the task left
    if (ActionData.moveTaskLeft) {
      const moveLeftButton = await canvas.getByLabelText('Move task left');
      await userEvent.click(moveLeftButton);
      await expect(ActionData.moveTaskLeft).toHaveBeenCalledTimes(1);
    }

    // Simulate moving the task right
    if (ActionData.moveTaskRight) {
      const moveRightButton = await canvas.getByLabelText('Move task right');
      await userEvent.click(moveRightButton);
      await expect(ActionData.moveTaskRight).toHaveBeenCalledTimes(1);
    }

    // Simulate deleting the task
    const deleteButton = await canvas.getByLabelText('Delete task');
    await userEvent.click(deleteButton);
    await expect(ActionData.onDelete).toHaveBeenCalledTimes(1);
  }
};
