import React from 'react';
import { Box, Typography } from '@mui/material';
import { Board } from '../../../../core/models/Board';

interface BoardCardProps {
    board: Board;
    color: string;
    onBoardClick?: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, color, onBoardClick }) => {
    return (
        <Box
            sx={{
                width: 300,
                height: 220,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'leading',
                alignItems: 'leading',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '25px',
                fontFamily: 'Arial, sans-serif',
                cursor: 'pointer',
                margin: 1,
                padding: 1,
                backgroundColor: color,
                '&:hover': {
                    boxShadow: 3,
                },
            }}
            onClick={onBoardClick}
        >
            <Typography sx={{ padding: 2 }}>{board.name}</Typography>
        </Box>
    );
};

export default BoardCard;
