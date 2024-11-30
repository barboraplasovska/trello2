import { fn } from '@storybook/test';
import BoardCard from './BoardCard';

const ActionData = {
    onClick: fn(),
};

export default {
    component: BoardCard,
    title: 'Components/Cards/BoardCard',
    tags: ['autodocs'],
    args: {
        title: 'My super duper board card',
        color: '#A3537A',
        ...ActionData,
    },
};

export const Default = {};
