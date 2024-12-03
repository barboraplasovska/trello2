import { fn } from '@storybook/test';
import AddBoardButton from './AddBoardButton';

const ActionData = {
    onClick: fn(),
};

export default {
    component: AddBoardButton,
    title: 'Components/Buttons/AddBoardButton',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

export const Default = {};
