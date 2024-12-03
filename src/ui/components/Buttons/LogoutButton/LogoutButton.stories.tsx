import { fn } from '@storybook/test';
import LogoutButton from './LogoutButton';

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

export const Default = {};
