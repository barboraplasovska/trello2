import DeleteDialog from './DeleteDialog';
import { fn } from "@storybook/test";
import {DialogType} from "../../../core/models/DialogType";

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

export const DeleteTask = {
    args: {
        type: DialogType.Task,
    },
};

export const DeleteColumn = {
    args: {
        type: DialogType.Column,
    },
};

export const DeleteBoard = {
    args: {
        type: DialogType.Board,
    },
};
