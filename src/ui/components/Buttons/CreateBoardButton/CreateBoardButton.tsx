import React from 'react';
import { Box, Typography } from '@mui/material';

interface CreateBoardButtonProps {
    onClick: () => void;
}

const CreateBoardButton: React.FC<CreateBoardButtonProps> = ({ onClick }) => {
    return (
        <Box
            sx={{
                width: 200,
                height: 120,
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Arial, sans-serif',
                cursor: 'pointer',
                margin: 1,
                padding: 1,
                backgroundColor: '#292D33',
                '&:hover': {
                    boxShadow: 3,
                },
            }}
            onClick={onClick}
        >
            <Typography>Create new board</Typography>
        </Box>
    );
};

export default CreateBoardButton;
