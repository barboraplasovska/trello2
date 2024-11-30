import React from 'react';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';

interface AppBarProps {
    onLogout: () => void;
    href: string;
}

const AppBar: React.FC<AppBarProps> = ({ href, onLogout }) => {
    return (
        <div style={styles.appBar}>
            <div style={styles.leftItems}>
                <div style={styles.title}>Trello2</div>
                <a href={href} style={styles.link}>My boards</a>
            </div>
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
    leftItems: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: '"Luckiest Guy", sans-serif',
        fontSize: '40px',
        color: '#fff',
        fontWeight: 'normal',
        marginRight: '20px',
    },
    link: {
        fontSize: '20px',
        paddingBottom: '5px',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
};

export default AppBar;
