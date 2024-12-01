import React from 'react';
import { Box, Typography } from '@mui/material';

interface BoardCardProps {
    title: string;
    color: string;
    onClick: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ title, color, onClick }) => {
    return (
        <Box
            sx={{
                width: 200,
                height: 120,
                borderRadius: 1,
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
            onClick={onClick}
        >
            <Typography>{title}</Typography>
        </Box>
    );
};

export default BoardCard;
