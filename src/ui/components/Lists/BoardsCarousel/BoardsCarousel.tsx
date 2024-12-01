import React, { useState } from 'react';
import { Box } from '@mui/material';
import BoardCard from '../../Cards/BoardCard/BoardCard';
import CreateBoardButton from '../../Buttons/AddBoardButton/AddBoardButton';
import NewBoardCard from '../../Cards/NewBoardCard/NewBoardCard';

interface BoardsCarouselProps {
    boards: { id: string; title: string; color: string }[];
    colors: string[];
    onBoardClick: (boardId: string) => void;
    onCreateBoard: (title: string, color: string) => void;
}

const BoardsCarousel: React.FC<BoardsCarouselProps> = ({
    boards,
    colors,
    onBoardClick,
    onCreateBoard,
}) => {
    const [localBoards, setLocalBoards] = useState(boards);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateBoard = (title: string, color: string) => {
        if (title.length === 0) {
            title = "New board"
        }
        color = `#${color}`;
        
        const newBoard = {
            id: `local-${Date.now()}`,
            title,
            color,
        };

        setLocalBoards([...localBoards, newBoard]);
        setIsCreating(false);

        onCreateBoard(title, color);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: 2,
            }}
        >
            {localBoards.map((board) => (
                <BoardCard
                    key={board.id}
                    title={board.title}
                    color={board.color}
                    onClick={() => onBoardClick(board.id)}
                />
            ))}

            {isCreating ? (
                <NewBoardCard
                    colors={colors}
                    onCreateBoard={handleCreateBoard}
                    onCancel={() => setIsCreating(false)}
                />
            ) : (
                <CreateBoardButton onClick={() => setIsCreating(true)} />
            )}
        </Box>
    );
};

export default BoardsCarousel;
