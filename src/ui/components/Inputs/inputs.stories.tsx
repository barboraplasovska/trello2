import InputField from './inputs';

export default {
    component: InputField,
    title: 'Components/Inputs/InputField',
    tags: ['autodocs'],
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