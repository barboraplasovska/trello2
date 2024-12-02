import DeleteDialog from './DeleteDialog';
import { fn } from "@storybook/test";

const ActionData = {
    onCancel: fn(),
    onDelete: fn(),
}

export default {
    component: DeleteDialog,
    title: 'Components/Dialog/DeleteDialog',
    tags: ['autodocs'],
    args: {
        ...ActionData,
    },
};

export const DeleteTask = {
    args: {
        isTask: true,
    }
}

export const DeleteBoard = {
    args: {
        isTask: false,
    }
}