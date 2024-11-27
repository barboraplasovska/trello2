import { fn } from "@storybook/test";

import InputField from './inputs';

export default {
    component: InputField,
    title: 'InputField',
    tags: ['autodocs'],
    argTypes: {
        isPassword: { control: 'boolean' },
        value: { control: 'text' },
    },
};

export const Username = {
    args: {
        isPassword: false,
        value: "Username"
    }
}

export const Password = {
    args: {
        isPassword: true,
        value: "Password"
    }
}

export const ConfirmPassword = {
    args: {
        isPassword: true,
        value: "Confirm password"
    }
}