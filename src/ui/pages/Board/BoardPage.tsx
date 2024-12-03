import { useEffect } from 'react';
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

function BoardPage() {
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
        await createColumn(id, title).then(() => loadBoardById(id))
        .catch(err => console.log(err))
        .finally(() => console.log('Added column ', title))
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
        await updateColumn(col).catch(err => console.log(err))
        .finally(() => console.log("Updated column ", col.name))
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
            console.log(e)
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
            console.log(e)
        } finally {
            console.log(`Moved column ${col.name} to the right`);
        }
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
        await createCard(card).then(() => loadBoardById(id))
        .then(() => console.log('Added card'))
    }

    const updCard = async (columnIndex: number, cardIndex: number, newCard: CardDto) => {
        let card : CardCreationForm = {
            title: newCard.card.title,
            body: newCard.card.body,
            columnId: selectedBoard ? selectedBoard.columns[columnIndex].column.id : "none",
            boardId: id,
            rank: cardIndex
        }
        await updateCard(newCard.card.id, card).then(() => loadBoardById(id))
        .finally(() => console.log('Updated card ', card.title))
    }


    const moveCardLeft = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex - 1].column.id : "none"
        let movedCard : CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex - 1].cards.length : 0
        }

        await moveCardToColumn(card.card.id, newColumnId, movedCard).then(() => loadBoardById(id))
        .catch(err => console.log(err))
        .finally(() => console.log(`Moved ${movedCard.title} to the left`))
    }

    const moveCardRight = async (columnIndex: number, card: CardDto) => {
        let newColumnId = selectedBoard ? selectedBoard.columns[columnIndex + 1].column.id : "none"

        let movedCard : CardCreationForm = {
            title: card.card.title,
            body: card.card.body,
            columnId: card.card.columnId,
            boardId: id,
            rank: selectedBoard ? selectedBoard.columns[columnIndex + 1].cards.length - 1 : 0
        }

        await moveCardToColumn(card.card.id, newColumnId, movedCard)
        .then(() => loadBoardById(id))
        .catch(err => console.log(err))
        .finally(() => console.log(`Moved ${movedCard.title} to the right`))
    }

    const handleDeleteColumn = async (columnId: string) => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        await deleteColumn(columnId)
            .then(() => loadBoardById(id))
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

        await deleteCard(card.card.id, cardData).then(() => loadBoardById(id))
        .finally(() => console.log("Deleted card : ", card.card.title));
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
                    onMoveColumnLeft={moveColumnLeft}
                    onMoveColumnRight={moveColumnRight}
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
        </BoardLayout>
    )
}

export default BoardPage;
