import { fn } from '@storybook/test';
import BoardCard from './BoardCard';

const ActionData = {
    onBoardClick: fn(),
};

export default {
    component: BoardCard,
    title: 'Components/Cards/BoardCard',
    tags: ['autodocs'],
    args: {
        board: {
            id: '1',
            name: 'My super duper board',
            userId: '1',
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        color: '#A3537A',
        ...ActionData,
    },
};

export const Default = {};
