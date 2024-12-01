import React from 'react';
import { Box } from '@mui/material';
import BoardCard from '../../Cards/BoardCard/BoardCard';
import CreateBoardButton from '../../Buttons/CreateBoardButton/CreateBoardButton';

interface BoardsCarouselProps {
    boards: { id: string; title: string; color: string }[];
    onBoardClick: (boardId: string) => void;
    onCreateBoardClick: () => void;
}

const BoardsCarousel: React.FC<BoardsCarouselProps> = ({ boards, onBoardClick, onCreateBoardClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                padding: 2,
                backgroundColor: '#121212',
                borderRadius: 1,
            }}
        >
            {boards.map((board) => (
                <BoardCard
                    key={board.id}
                    title={board.title}
                    color={board.color}
                    onClick={() => onBoardClick(board.id)}
                />
            ))}
            <CreateBoardButton onClick={onCreateBoardClick} />
        </Box>
    );
};

export default BoardsCarousel;
