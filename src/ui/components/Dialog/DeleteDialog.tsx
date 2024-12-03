import "./DeleteDialog.css"
import {DialogType} from "../../../core/models/DialogType";
import React from "react";

type DialogProps = {
    type: DialogType;
    onCancel: () => void;
    onDelete: () => void;
};

export default function DeleteDialog({ type, onCancel, onDelete }: DialogProps) {
    const getMessage = () => {
        switch (type) {
            case DialogType.Card:
                return "Are you sure you want to delete this card?";
            case DialogType.Column:
                return "Are you sure you want to delete this column?";
            case DialogType.Board:
                return "Are you sure you want to delete this board?";
            default:
                return "Are you sure you want to proceed?";
        }
    };

    return (
        <div className="delete-dialog">
            <div className="dialog-text">{getMessage()}</div>
            <div className="buttons">
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
                <button className="delete-button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}
