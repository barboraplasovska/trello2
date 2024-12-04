import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { BoardListCarousel } from "../../components/Lists/BoardListCarousel/BoardListCarousel";
import BoardLayout from '../../components/Layouts/BoardLayout';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import { CardDto } from '../../../core/models/CardDto';
import {Box, Typography} from '@mui/material';
import { logout } from '../../../core/services/LoginService';
import { deleteBoard, updateBoard } from "../../../core/services/BoardService";
import { CardCreationForm } from '../../../core/models/CardCreationForm';
import { Column } from '../../../core/models/Column';
import { createCard, updateCard, moveCardToColumn, deleteCard } from '../../../core/services/CardService';
import { createColumn, deleteColumn, updateColumn } from '../../../core/services/ColomnService';
import { DialogType } from "../../../core/models/DialogType";
import DeleteDialog from "../../components/Dialog/DeleteDialog";

function BoardPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState<DialogType | null>(null);
    const [itemToDelete, setItemToDelete] = useState<null | string | CardDto>(null);
    const [, setIsOnline] = useState(navigator.onLine);

    const location = useLocation();
    const navigate = useNavigate();

    const { color, id } = location.state || {};

    const {
        selectedBoard,
        loadBoardById,
        setError,
        error,
    } = useBoardsViewModel();

    useEffect(() => {
        if (id) {
            loadBoardById(id)
                .then((board) => {
                    if (board == null) {
                        navigate('/boardnotfound', { replace: true });
                    }
                })
                .catch(() => {
                    setError("Failed to load board.");
                    navigate('/boardnotfound', { replace: true });
                });
        } else {
            navigate('/boardnotfound', { replace: true });
        }
    }, [id, loadBoardById, navigate, selectedBoard, setError]);

    const handleOnline = () => {
        setIsOnline(true);
        console.log("You are back online.");
        
        if (!selectedBoard || !selectedBoard.board.id)
        {   
        return;
        }

        try {
            loadBoardById(selectedBoard?.board.id);
        } catch (e) {
            setError("Failed to load boards")
        }
    };

    useEffect(() => {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const handleOffline = () => {
        setIsOnline(false);
        console.log("You are offline.");
    };

    function onLogout() {
        logout().then(() => {
            navigate('/login');
        });
    }

    /// Board functions

    const handleEditBoard = async (newTitle: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            await updateBoard(selectedBoard.board.id, newTitle);
            await loadBoardById(selectedBoard.board.id)
        } catch (error) {
            setError('Failed to update board')
            console.error('Failed to update board:', error);
        }
    };

    const handleDeleteBoard = async () => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            await deleteBoard(selectedBoard.board.id).then(() => navigate('/boards'));
        } catch (error) {
            setError('Failed to delete board')
            console.error('Failed to delete board:', error);
        }
    };

    /// Column functions
    const addColumn = async (title: string) => {
        try {
            await createColumn(id, title);
            await loadBoardById(id);
            console.log('Added column:', title);
        } catch (error) {
            setError('Error adding column')
            console.error('Error adding column:', error);
        }
    };

    const updColumn = async (columnIndex: number, newTitle: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        let col: Column = selectedBoard?.columns[columnIndex].column
            ? selectedBoard.columns[columnIndex].column : {
                id: "",
                name: newTitle,
                boardId: "",
                version: 0,
                createdAt: "",
                updatedAt: "",
                rank: 0
            };
        col.name = newTitle;

        try {
            await updateColumn(col)
                .finally(() => console.log("Updated column ", col.name))
            await loadBoardById(selectedBoard.board.id)
        } catch (e) {
            setError('Failed to update column')
            console.error('Failed to update column:', e);
        }
    }

    const moveColumnLeft = async (index: number) => {
        let col = selectedBoard ? selectedBoard.columns[index].column : {
            id: "",
            name: "",
            boardId: "",
            version: 0,
            createdAt: "",
            updatedAt: "",
            rank: 0
        };
        col.rank = index - 1
        let colLeft = selectedBoard ? selectedBoard.columns[index - 1].column : {
            id: "",
            name: "",
            boardId: "",
            version: 0,
            createdAt: "",
            updatedAt: "",
            rank: 0
        };
        colLeft.rank = index
        try {
            console.log(colLeft)
            await Promise.all([updateColumn(col), updateColumn(colLeft)]).then(() => loadBoardById(id))
        } catch (e) {
            setError('Failed to move (left) column')
            console.error('Failed to move (left) column:', e);
        } finally {
            console.log(`Moved column ${col.name} to the left`);
        }
    }

    const moveColumnRight = async (index: number) => {
        let col = selectedBoard ? selectedBoard.columns[index].column : {
            id: "",
            name: "",
            boardId: "",
            version: 0,
            createdAt: "",
            updatedAt: "",
            rank: 0
        };
        col.rank = index + 1
        let colRight = selectedBoard ? selectedBoard.columns[index + 1].column : {
            id: "",
            name: "",
            boardId: "",
            version: 0,
            createdAt: "",
            updatedAt: "",
            rank: index
        };
        colRight.rank = index
        try {
            await Promise.all([updateColumn(col), updateColumn(colRight)]).then(() => loadBoardById(id))
        } catch (e) {
            setError('Failed to move (right) column')
            console.error('Failed to move (right) column:', e);
        } finally {
            console.log(`Moved column ${col.name} to the right`);
        }
    }

    const handleDeleteColumn = async (columnId: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            await deleteColumn(columnId)
                .then(() => loadBoardById(selectedBoard.board.id))
        } catch (error) {
            setError('Failed to delete column')
            console.error('Failed to delete column:', error);
        }
    }

    /// Card functions

    const addCard = async (columnIndex: number) => {
        let card: CardCreationForm = {
            title: "",
            body: "",
            columnId: selectedBoard ? selectedBoard.columns[columnIndex].column.id : "none",
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex].cards.length : 0
        }

        try {
            await createCard(card).then(() => loadBoardById(id))
                .then(() => console.log('Added card'))
        } catch (e) {
            setError('Failed to add card')
            console.error('Failed to add card:', error);
        }
    }

    const updCard = async (columnIndex: number, cardIndex: number, newCard: CardDto) => {
        let card: CardCreationForm = {
            title: newCard.card.title,
            body: newCard.card.body,
            columnId: selectedBoard ? selectedBoard.columns[columnIndex].column.id : "none",
            boardId: id,
            rank: cardIndex
        }

        try {
            await updateCard(newCard.card.id, card).then(() => loadBoardById(id))
                .finally(() => console.log('Updated card ', card.title))
        } catch (error) {
            setError('Failed to update card')
            console.error('Failed to update card:', error);
        }
    }


    const moveCardLeft = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex - 1].column.id : "none"
        let movedCard: CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex - 1].cards.length : 0
        }

        try {
            await moveCardToColumn(card.card.id, newColumnId, movedCard).then(() => loadBoardById(id))
                .finally(() => console.log(`Moved ${movedCard.title} to the left`))
        }
        catch (error) {
            setError('Failed to move (left) card')
            console.error('Failed to move (left) card:', error);
        }
    }

    const moveCardRight = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex + 1].column.id : "none"

        let movedCard: CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex + 1].cards.length - 1 : 0
        }

        try {
            await moveCardToColumn(card.card.id, newColumnId, movedCard)
                .then(() => loadBoardById(id))
                .finally(() => console.log(`Moved ${movedCard.title} to the right`))
        } catch (error) {
            setError('Failed to move (right) card')
            console.error('Failed to move (right) card:', error);
        }
    }



    const handleDeleteCard = async (card: CardDto) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        let cardData: CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: card.boardId,
            rank: card.card.rank
        }

        try {
            await deleteCard(card.card.id, cardData).then(() => loadBoardById(id))
                .finally(() => console.log("Deleted card : ", card.card.title));
        } catch (error) {
            setError('Failed to delete card')
            console.error('Failed to delete card:', error);
        }
    }

    /// Dialog functions
    const handleCancelDelete = () => {
        setIsDialogOpen(false);
    }

    const handleDeleteConfirm = async () => {
        try {
            setIsDialogOpen(false);
            switch (deleteType) {
                case DialogType.Column:
                    await handleDeleteColumn(itemToDelete as string);
                    break;
                case DialogType.Card:
                    await handleDeleteCard(itemToDelete as CardDto);
                    break;
                case DialogType.Board:
                    await handleDeleteBoard();
                    break;
            }
        } catch (error) {
            setError('An error has occured on "delete confirm"')
            console.error('An error has occured on "delete confirm":', error);
        }
    }

    const handleDelete = async (type: DialogType, item: string | CardDto | null) => {
        setDeleteType(type);
        setItemToDelete(item);
        setIsDialogOpen(true);
    }

    return (
        <BoardLayout
            color={color}
            title={selectedBoard?.board.name ?? "No name"}
            onEdit={handleEditBoard}
            onDelete={handleDelete}
            onLogout={onLogout}
        >
            {error ? (
                    <Box sx={{ padding: 2, backgroundColor: '#fff', border: '1px solid red', borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ color: 'red' }}>
                            Error: {error || "Something went wrong!"}
                        </Typography>
                    </Box>
            ) : (
                <BoardListCarousel
                    columns={selectedBoard?.columns ?? []}
                    boardId={id}
                    onMoveColumnLeft={moveColumnLeft}
                    onMoveColumnRight={moveColumnRight}
                    onMoveCardLeft={moveCardLeft}
                    onMoveCardRight={moveCardRight}
                    onDeleteColumn={handleDelete}
                    onDeleteCard={handleDelete}
                    onAddCard={addCard}
                    onUpdateCard={updCard}
                    onUpdateColumnTitle={updColumn}
                    onCancelAddColumn={function (): void {
                        console.log('Function not implemented.');
                    }}
                    onAddColumn={addColumn}
                />
            )}

            {isDialogOpen && (
                <>
                    <div className="dialog-div">
                        <DeleteDialog
                            type={deleteType!}
                            onCancel={handleCancelDelete}
                            onDelete={handleDeleteConfirm}
                        />
                    </div>
                    <div className="behind-dialog-div"></div>
                </>
            )}
        </BoardLayout>
    )
}

export default BoardPage;
