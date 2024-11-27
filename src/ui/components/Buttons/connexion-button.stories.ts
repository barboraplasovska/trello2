import { fn } from "@storybook/test";

import ConnectionButton from './connexion-button';

export const ActionData = {
    connect: fn(),
}

export default {
    component: ConnectionButton,
    title: 'ConnectionButton',
    tags: ['autodocs'],
    args: {
      ...ActionData,
    },
};

export const LogIn = {
    args: {
        isLogIn: true,
    }
}

export const SignUp = {
    args: {
        isLogIn: false,
    }
}