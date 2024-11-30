import React from 'react';

interface CreateBoardButtonProps {
    onClick: () => void;
}

const CreateBoardButton: React.FC<CreateBoardButtonProps> = ({ onClick }) => {
    return (
        <div
            style={styles.createBoard}
            onClick={onClick}
        >
            Create new board
        </div>
    );
};

const styles = {
    createBoard: {
        width: '200px',
        height: '120px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#292D33',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '10px',
    },
};

export default CreateBoardButton;
