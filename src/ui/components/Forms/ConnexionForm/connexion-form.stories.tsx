import { fn } from "@storybook/test";

import ConnexionForm from './connexion-form';

const ActionData = {
    connect: fn(),
}

export default {
    component: ConnexionForm,
    title: 'Components/Forms/ConnexionForm',
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