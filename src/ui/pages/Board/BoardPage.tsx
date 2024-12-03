import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { BoardListCarousel } from "../../components/Lists/BoardListCarousel/BoardListCarousel";
import BoardLayout from '../../components/Layouts/BoardLayout';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import { CardDto } from '../../../core/models/CardDto';
import { Box, Typography } from '@mui/material';
import { logout } from '../../../core/services/LoginService';
import {deleteBoard, updateBoard} from "../../../core/services/BoardService";
import { CardCreationForm } from '../../../core/models/CardCreationForm';
import { Column } from '../../../core/models/Column';
import {createCard, updateCard, moveCardToColumn, deleteCard} from '../../../core/services/CardService';
import {createColumn, deleteColumn, updateColumn} from '../../../core/services/ColomnService';
import {DialogType} from "../../../core/models/DialogType";
import DeleteDialog from "../../components/Dialog/DeleteDialog";

function BoardPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState<DialogType | null>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null); // FIXME : any type is not good

    const location = useLocation();
    const navigate = useNavigate();

    const { color, id } = location.state || {};

    const {
        selectedBoard,
        loadBoardById,
        error,
    } = useBoardsViewModel();

    useEffect(() => {
        if (id && (!selectedBoard || selectedBoard.board.id !== id)) {
            loadBoardById(id);
        }
    }, [id, selectedBoard, loadBoardById]);


    const handleEditBoard = async (newTitle: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            await updateBoard(selectedBoard.board.id, newTitle);
            await loadBoardById(selectedBoard.board.id)
        } catch (error) {
            console.error('Failed to update board:', error);
        }
    };

    const handleDeleteBoard = async () => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            await deleteBoard(selectedBoard.board.id);
            window.location.href = '/boards';
        } catch (error) {
            console.error('Failed to delete board:', error);
        }
    };

    function onLogout() {
        logout().then(() => {
            navigate('/login');
        });
    }

    /// Column functions
    const addColumn = async (title : string) => {
        await createColumn(id, title).then(() => console.log('Added column ', title)).catch(err => console.log(err))
    }
    
    const updColumn = async (columnIndex : number, newTitle : string) => {
        let col : Column = selectedBoard?.columns[columnIndex].column
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
        console.log(col);
        await updateColumn(col).then(() => console.log("Updated column ", col.name)).catch(err => console.log(err))
    }

    /// Card functions

    const addCard = async (columnIndex : number) => {
        let card : CardCreationForm = {
            title: "card",
            body: "card",
            columnId: selectedBoard ? selectedBoard.columns[columnIndex].column.id : "none",
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex].cards.length : 0
        }
        await createCard(card).then(() => console.log('Added card')).catch(err => console.log(err))
    }

    const updCard = async (columnIndex: number, cardIndex: number, newCard: CardDto) => {
        let card : CardCreationForm = {
            title: newCard.card.title,
            body: newCard.card.body,
            columnId: selectedBoard ? selectedBoard.columns[columnIndex].column.id : "none",
            boardId: id,
            rank: cardIndex
        }
        await updateCard(newCard.card.id, card).then(() => console.log('Updated card ', card.title))
        .catch(err => console.log(err))
    }


    const moveCardLeft = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex - 1].column.id : "none"
        let movedCard : CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: newColumnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex - 1].cards.length : 0
        }

        await moveCardToColumn(card.card.id, newColumnId, movedCard)
        .then(() => console.log(`Moved ${movedCard.title} to the left`))
        .catch(err => console.log(err))
    }

    const moveCardRight = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex + 1].column.id : "none"
        console.log("New column index: ", columnIndex + 1)
        console.log("New column id: ", newColumnId)
        let movedCard : CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: newColumnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex + 1].cards.length : 0
        }

        await moveCardToColumn(card.card.id, newColumnId, movedCard)
        .then(() => console.log(`Moved ${movedCard.title} to the right`))
        .catch(err => console.log(err))
    }

    const handleDeleteColumn = async (columnId: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        await deleteColumn(columnId)
            .catch(err => console.log(err))
    }

    const handleDeleteCard = async (card: CardDto) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        let cardData : CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: card.boardId,
            rank: card.card.rank
        }

        await deleteCard(card.card.id, cardData);
    }

    /// Dialog functions
    const handleCancelDelete = () => {
        setIsDialogOpen(false);
    }

    const handleDeleteConfirm = async () => {
        setIsDialogOpen(false);
        switch (deleteType) {
            case DialogType.Column:
                await handleDeleteColumn(itemToDelete.id);
                break;
            case DialogType.Card:
                await handleDeleteCard(itemToDelete);
                break;
            case DialogType.Board:
                await handleDeleteBoard();
                break;
        }
    }

    return (
        <BoardLayout
            color={color}
            title={selectedBoard?.board.name ?? "No name"}
            onEdit={handleEditBoard}
            onDelete={handleDeleteBoard}
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
                    onMoveColumnLeft={function (index: number): void {
                        console.log('Function not implemented.');
                    }}
                    onMoveColumnRight={function (index: number): void {
                        console.log('Function not implemented.');
                    }}
                    onMoveCardLeft={moveCardLeft}
                    onMoveCardRight={moveCardRight}
                    onDeleteColumn={handleDeleteColumn}
                    onDeleteCard={handleDeleteCard}
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
