import "./DeleteDialog.css"

type dialogProps = {
    isTask: boolean;
    onCancel: () => void;
    onDelete: () => void;
}

export default function DeleteDialog({ isTask, onCancel, onDelete }: dialogProps) {
    return (
        <div className="delete-dialog">
            <div className="dialog-text">
                { isTask ? "Are you sure you want to delete a task ?" : "Are you sure you want to delete a board ?"}
            </div>
            <div className="buttons">
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
                <button className="delete-button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}