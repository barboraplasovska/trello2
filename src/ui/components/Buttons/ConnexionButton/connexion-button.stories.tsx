import { fn } from "@storybook/test";

import ConnexionButton from '../ConnexionButton/connexion-button';

const ActionData = {
    connect: fn(),
}

export default {
    component: ConnexionButton,
    title: 'Components/Buttons/ConnexionButton',
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