import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { fn } from '@storybook/test';
import AddBoardButton from './AddBoardButton';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
    onClick: fn(),
};

export default {
    component: AddBoardButton,
    title: 'Components/Buttons/AddBoardButton',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

type Story = StoryObj<typeof AddBoardButton>;

export const Default: Story = {};

// Interactions Story
export const Interactions: Story = {
    args: {
        onClick: ActionData.onClick,
    },
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify the button is rendered
    const button = canvas.getByText('Create new board');
    await expect(button).toBeInTheDocument();

    // Simulate a click event
    await userEvent.click(button);

    // Verify the onClick callback was called
    await expect(ActionData.onClick).toHaveBeenCalledTimes(1);
};
