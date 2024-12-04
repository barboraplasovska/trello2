import { fn } from '@storybook/test';
import ConnexionForm from './connexion-form';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
    connect: fn(),
    toggleFormMode: fn(),
};

export default {
    component: ConnexionForm,
    title: 'Components/Forms/ConnexionForm',
    tags: ['autodocs'],
    args: {
        ...ActionData,
        isLogIn: true,
        error: '',
        username: '',
        password: '',
        confirmPassword: '',
        onUsernameChange: fn(),
        onPasswordChange: fn(),
        onConfirmPasswordChange: fn(),
    },
};

type Story = StoryObj<typeof ConnexionForm>;

export const LogIn: Story = {
    args: {
        isLogIn: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the Login title is displayed
        const title = canvas.getByText('Login');
        expect(title).toBeInTheDocument();

        // Simulate filling in the form and submitting the login
        const loginButton = canvas.getByRole('button', { name: /login/i });
        await userEvent.click(loginButton);
        expect(ActionData.connect).toHaveBeenCalledTimes(1);
    },
};

export const SignUp: Story = {
    args: {
        isLogIn: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the Sign Up title is displayed by targeting the div with class 'form-title'
        // const title = canvas.getByText('Sign up');
        const titleDiv = canvas.getByText('Register').closest('div.form-title');
        expect(titleDiv).toBeInTheDocument();

        // Simulate filling in the form and submitting the sign-up
        const signUpButton = canvas.getByRole('button', { name: /signup/i });
        await userEvent.click(signUpButton);
        expect(ActionData.connect).toHaveBeenCalledTimes(1);
    },
};

export const ErrorMessage: Story = {
    args: {
        error: 'Invalid username or password',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Ensure the error message is displayed
        const errorMessage = canvas.getByText('Invalid username or password');
        expect(errorMessage).toBeInTheDocument();
    },
};
