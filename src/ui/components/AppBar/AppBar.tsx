import React from 'react';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';

interface AppBarProps {
    onLogout: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onLogout }) => {
    return (
        <div style={styles.appBar}>
            <div style={styles.title}>Trello2</div>
            <LogoutButton onClick={onLogout} />
        </div>
    );
};

const styles = {
    appBar: {
        backgroundColor: '#2c3e50',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: '"Luckiest Guy", sans-serif',
        fontSize: '24px',
        color: '#fff',
        fontWeight: 'normal',
    },
};

export default AppBar;
