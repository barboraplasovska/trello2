import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { fn } from '@storybook/test';
import { AddCardButton } from './AddCardButton';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
  onClick: fn(),
};

export default {
  title: 'Components/Buttons/AddCardButton',
  component: AddCardButton,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

type Story = StoryObj<typeof AddCardButton>;

export const Default = {};

export const Interactions: Story = {
  args: {
    onClick: ActionData.onClick,
  },
};

Interactions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find and verify the button
  const button = canvas.getByText('+ Add a card');
  await expect(button).toBeInTheDocument();

  // Simulate a click on the button
  await userEvent.click(button);

  // Ensure onClick callback was called
  await expect(ActionData.onClick).toHaveBeenCalledTimes(1);
};
