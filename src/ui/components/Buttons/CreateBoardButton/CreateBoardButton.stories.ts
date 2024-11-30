import { fn } from '@storybook/test';
import CreateBoardButton from './CreateBoardButton';

const ActionData = {
    onClick: fn(),
};

export default {
    component: CreateBoardButton,
    title: 'Components/Buttons/CreateBoardButton',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

export const Default = {};
