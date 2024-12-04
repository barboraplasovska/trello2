import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import BoardCard from './BoardCard';
import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react';

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

type Story = StoryObj<typeof BoardCard>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Find the BoardCard element by its board name
        const boardCard = await canvas.findByText('My super duper board');

        // Verify that the board card is rendered in the DOM
        await expect(boardCard).toBeInTheDocument();

        // Simulate a click event on the board card
        await userEvent.click(boardCard);

        // Verify that the onBoardClick handler was called when the board card is clicked
        await expect(ActionData.onBoardClick).toHaveBeenCalledTimes(1);
    },
};
