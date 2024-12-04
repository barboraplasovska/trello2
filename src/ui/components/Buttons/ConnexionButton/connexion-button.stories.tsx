import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import ConnexionButton from './connexion-button';
import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
    connect: fn(),
};

export default {
    component: ConnexionButton,
    title: 'Components/Buttons/ConnexionButton',
    tags: ['autodocs'],
    args: {
        connect: ActionData.connect,
    },
};

type Story = StoryObj<typeof ConnexionButton>;

export const LogIn = {
    args: {
        isLogIn: true,
    },
};

export const SignUp = {
    args: {
        isLogIn: false,
    },
};

export const InteractionsLogIn: Story = {
    args: {
        isLogIn: true,
        connect: ActionData.connect,
    },
};

InteractionsLogIn.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button');

    // Verify the label is "Log in"
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Log in');

    // Simulate clicking the button
    await userEvent.click(button);

    // Ensure the connect callback was called
    await expect(ActionData.connect).toHaveBeenCalledTimes(1);
};

export const InteractionsSignUp: Story = {
    args: {
        isLogIn: false,
        connect: ActionData.connect,
    },
};

InteractionsSignUp.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button');

    // Verify the label is "Sign up"
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Sign up');

    // Simulate clicking the button
    await userEvent.click(button);

    // Ensure the connect callback was called
    await expect(ActionData.connect).toHaveBeenCalledTimes(1);
};
