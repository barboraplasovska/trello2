import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import LogoutButton from './LogoutButton';
import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
    onClick: fn(),
};

export default {
    component: LogoutButton,
    title: 'Components/Buttons/LogoutButton',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

type Story = StoryObj<typeof LogoutButton>;

export const Default = {};

export const Interactions: Story = {
    args: {
        onClick: ActionData.onClick,
    },
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the logout button by its aria-label
    const button = await canvas.findByRole('button', { name: /logout/i });

    // Verify that the button is rendered in the DOM
    await expect(button).toBeInTheDocument();

    // Simulate a click event on the button
    await userEvent.click(button);

    // Verify that the onClick handler was called when the button is clicked
    await expect(ActionData.onClick).toHaveBeenCalledTimes(1);
};
