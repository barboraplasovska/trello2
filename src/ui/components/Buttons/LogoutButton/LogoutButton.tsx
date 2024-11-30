import React from 'react';

interface LogoutButtonProps {
    onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
    return (
        <button style={styles.button} onClick={onClick}>
            Log out
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#689BF8',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LogoutButton;
