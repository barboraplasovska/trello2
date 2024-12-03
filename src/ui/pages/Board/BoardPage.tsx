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
import { createCard, updateCard, moveCardToColumn } from '../../../core/services/CardService';
import { createColumn, updateColumn } from '../../../core/services/ColomnService';

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
            const updatedBoard = await updateBoard(selectedBoard.board.id, newTitle);
            console.log('Board updated successfully:', updatedBoard);
            await loadBoardById(selectedBoard.board.id)
        } catch (error) {
            console.error('Failed to update board:', error);
        }
    };

    const handleDeleteBoard = async () => {
        if (!selectedBoard || !selectedBoard.board.id)
            return;

        try {
            const status = await deleteBoard(selectedBoard.board.id);
            console.log('Board deleted successfully:', status);
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
            console.log(`Moved column ${col.name} to the left`)
            console.log("Rank col: ", col.rank)
            console.log("Rank colLeft: ", colLeft.rank)
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
            console.log(`Moved column ${col.name} to the right`)
            console.log("Rank col: ", col.rank)
            console.log("Rank colRight: ", colRight.rank)
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
                    onDeleteColumn={function (columnIndex: number): void {
                        console.log('Function not implemented.');
                    }}
                    onDeleteCard={function (columnIndex: number, cardId: string): void {
                        console.log('Function not implemented.');
                    }}
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
