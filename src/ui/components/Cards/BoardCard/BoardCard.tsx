import React from 'react';

interface BoardCardProps {
    title: string;
    color: string;
    onClick: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ title, color, onClick }) => {
    return (
        <div
            style={{ ...styles.board, backgroundColor: color }}
            onClick={onClick}
        >
            {title}
        </div>
    );
};

const styles = {
    board: {
        width: '200px',
        height: '120px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '10px',
        padding: '10px',
    },
};

export default BoardCard;
