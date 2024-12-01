import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
import { Close } from '@mui/icons-material';

interface NewBoardCardProps {
    colors: string[];
    onCreateBoard: (title: string, color: string) => void;
    onCancel: () => void;
}

const NewBoardCard: React.FC<NewBoardCardProps> = ({ colors, onCreateBoard, onCancel }) => {
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleCreate = () => {
        if (title.trim()) {
            setIsSubmitting(true);
            onCreateBoard(title.trim(), selectedColor);
        }
    };

    return (
        <Box
            sx={{
                width: 300,
                height: 220,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                margin: 1,
                padding: 1,
                backgroundColor: '#292D33',
                color: '#fff',
                boxShadow: 3,
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Enter board title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputRef={inputRef}
                size="small"
                disabled={isSubmitting}
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    width: '100%',
                    marginBottom: 1,
                    marginTop: 3,
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                    marginBottom: 1,
                }}
            >
                {colors.map((color) => (
                    <Box
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: `#${color}`,
                            border: selectedColor === color ? '2px solid #fff' : '2px solid transparent',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start', 
                    gap: 1,
                }}
                >
                <Button
                    onClick={handleCreate}
                    disabled={isSubmitting || !title.trim()}
                    sx={{
                    backgroundColor: '#689BF8',
                    color: 'black',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#85B8FF',
                    },
                    }}
                >
                    Add board
                </Button>
                <CustomIconButton onClick={onCancel} icon={<Close />} ariaLabel="Cancel" paddingNb={10}/>
            </Box>
        </Box>
    );
};

export default NewBoardCard;
