import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import InputField from './inputs';
import { StoryObj } from '@storybook/react/*';

export default {
    component: InputField,
    title: 'Components/Inputs/InputField',
    tags: ['autodocs'],
};

type Story = StoryObj<typeof InputField>;

export const Username: Story = {
    args: {
        isPassword: false,
        value: "Username",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the input field is rendered correctly with the placeholder
        const input = canvas.getByPlaceholderText('Enter your username');
        expect(input).toBeInTheDocument();

        // Simulate typing into the input field
        await userEvent.type(input, 'user123');
    },
};

export const Password: Story = {
    args: {
        isPassword: true,
        value: "Password",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the input field is rendered correctly with the placeholder
        const input = canvas.getByPlaceholderText('Enter your password');
        expect(input).toBeInTheDocument();

        // Simulate typing into the password field
        await userEvent.type(input, 'password123');
    },
};

export const ConfirmPassword: Story = {
    args: {
        isPassword: true,
        value: "Confirm password",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the input field is rendered correctly with the placeholder
        const input = canvas.getByPlaceholderText('Enter your password');
        expect(input).toBeInTheDocument();

        // Simulate typing into the confirm password field
        await userEvent.type(input, 'password123');
    },
};
