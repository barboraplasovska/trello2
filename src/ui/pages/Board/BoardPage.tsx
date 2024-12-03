import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { BoardListCarousel } from "../../components/Lists/BoardListCarousel/BoardListCarousel";
import BoardLayout from '../../components/Layouts/BoardLayout';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import { CardDto } from '../../../core/models/CardDto';
import { Box, Typography } from '@mui/material';
import { logout } from '../../../core/services/LoginService';

function BoardPage() {
    const location = useLocation();

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


    const handleEditBoard = () => {
        console.log('Edit board');
    }

    const handleDeleteBoard = () => {
        console.log('Delete board');
    }

    function onLogout() {
        logout();
        window.location.href = '/login';
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
                    onMoveCardLeft={function (columnIndex: number, card: CardDto): void {
                        console.log('Function not implemented.');
                    }}
                    onMoveCardRight={function (columnIndex: number, card: CardDto): void {
                        console.log('Function not implemented.');
                    }}
                    onDeleteColumn={function (columnIndex: number): void {
                        console.log('Function not implemented.');
                    }}
                    onDeleteCard={function (columnIndex: number, cardId: string): void {
                        console.log('Function not implemented.');
                    }}
                    onAddCard={function (columnIndex: number): void {
                        console.log('Function not implemented.');
                    }}
                    onUpdateCard={function (columnIndex: number, cardIndex: number, newCard: CardDto): void {
                        console.log('Function not implemented.');
                    }}
                    onUpdateColumnTitle={function (columnIndex: number, newTitle: string): void {
                        console.log('Function not implemented.');
                    }}
                    onCancelAddColumn={function (): void {
                        console.log('Function not implemented.');
                    }}
                    onAddColumn={function (title: string): void {
                        console.log('Function not implemented.');
                    }}
                />
            )}
        </BoardLayout>
    )
}

export default BoardPage;
