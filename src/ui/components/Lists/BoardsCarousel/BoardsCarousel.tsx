import React, { useState } from 'react';
import { Box } from '@mui/material';
import BoardCard from '../../Cards/BoardCard/BoardCard';
import CreateBoardButton from '../../Buttons/AddBoardButton/AddBoardButton';
import NewBoardCard from '../../Cards/NewBoardCard/NewBoardCard';
import { Board } from '../../../../core/models/Board';

interface BoardsCarouselProps {
    boards: Board[];
    colors: string[];
    userId: string;
    onBoardClick: (board: Board) => void;
    onCreateBoard: (board: Board) => void;
}

const BoardsCarousel: React.FC<BoardsCarouselProps> = ({
    boards,
    colors,
    userId,
    onBoardClick,
    onCreateBoard,
}) => {
    const [localBoards, setLocalBoards] = useState(boards);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateBoard = (title: string) => {
        if (title.length === 0) {
            title = "New board"
        }
        
        const newBoard: Board = {
            id: `local-${Date.now()}`,
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: title,
            userId,
        };

        setLocalBoards([...localBoards, newBoard]);
        setLocalBoards(localBoards.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }));

        setIsCreating(false);

        onCreateBoard(newBoard);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: 0,
                margin: 0,
            }}
        >
             {isCreating ? (
                <NewBoardCard
                    onCreateBoard={handleCreateBoard}
                    onCancel={() => setIsCreating(false)}
                />
            ) : (
                <CreateBoardButton onClick={() => setIsCreating(true)} />
            )}
            {localBoards.map((board) => (
                <BoardCard
                    key={board.id}
                    board={board}
                    color={`#${colors[board.id.charAt(0).charCodeAt(0) % colors.length]}`}
                    onBoardClick={() => onBoardClick(board)}
                />
            ))}
        </Box>
    );
};

export default BoardsCarousel;
