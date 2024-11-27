import { fn } from "@storybook/test";

import ConnexionButton from './connexion-button';

const ActionData = {
    connect: fn(),
}

export default {
    component: ConnexionButton,
    title: 'ConnexionButton',
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