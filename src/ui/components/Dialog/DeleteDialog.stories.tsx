import { fn } from '@storybook/test';
import DeleteDialog from './DeleteDialog';
import { DialogType } from "../../../core/models/DialogType";
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
    onCancel: fn(),
    onDelete: fn(),
};

export default {
    component: DeleteDialog,
    title: 'Components/Dialog/DeleteDialog',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

type Story = StoryObj<typeof DeleteDialog>;

export const DeleteCard: Story = {
    args: {
        type: DialogType.Card,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Check that the correct message is displayed
        const message = canvas.getByText('Are you sure you want to delete this card?');
        expect(message).toBeInTheDocument();

        // Simulate Cancel button click
        const cancelButton = canvas.getByText('Cancel');
        await userEvent.click(cancelButton);
        expect(ActionData.onCancel).toHaveBeenCalledTimes(1);

        // Simulate Delete button click
        const deleteButton = canvas.getByText('Delete');
        await userEvent.click(deleteButton);
        expect(ActionData.onDelete).toHaveBeenCalledTimes(1);
    },
};

export const DeleteColumn: Story = {
    args: {
        type: DialogType.Column,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Check that the correct message is displayed
        const message = canvas.getByText('Are you sure you want to delete this column?');
        expect(message).toBeInTheDocument();

        // Simulate Cancel button click
        const cancelButton = canvas.getByText('Cancel');
        await userEvent.click(cancelButton);
        expect(ActionData.onCancel).toHaveBeenCalledTimes(1);

        // Simulate Delete button click
        const deleteButton = canvas.getByText('Delete');
        await userEvent.click(deleteButton);
        expect(ActionData.onDelete).toHaveBeenCalledTimes(1);
    },
};

export const DeleteBoard: Story = {
    args: {
        type: DialogType.Board,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Check that the correct message is displayed
        const message = canvas.getByText('Are you sure you want to delete this board?');
        expect(message).toBeInTheDocument();

        // Simulate Cancel button click
        const cancelButton = canvas.getByText('Cancel');
        await userEvent.click(cancelButton);
        expect(ActionData.onCancel).toHaveBeenCalledTimes(1);

        // Simulate Delete button click
        const deleteButton = canvas.getByText('Delete');
        await userEvent.click(deleteButton);
        expect(ActionData.onDelete).toHaveBeenCalledTimes(1);
    },
};
