import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { fn } from '@storybook/test';
import { AddListButton } from './AddListButton';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
  onClick: fn(),
};

export default {
  title: 'Components/Buttons/AddListButton',
  component: AddListButton,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

type Story = StoryObj<typeof AddListButton>;

export const Default = {};

export const Interactions: Story = {
  args: {
    onClick: ActionData.onClick,
  },
};

Interactions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find and verify the button
  const button = canvas.getByText('+ Add another list');
  await expect(button).toBeInTheDocument();

  // Simulate a click on the button
  await userEvent.click(button);

  // Ensure onClick callback was called
  await expect(ActionData.onClick).toHaveBeenCalledTimes(1);
};
