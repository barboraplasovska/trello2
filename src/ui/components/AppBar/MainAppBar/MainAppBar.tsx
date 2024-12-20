import React from 'react';
import LogoutButton from '../../Buttons/LogoutButton/LogoutButton';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

interface MainAppBarProps {
    onLogout: () => void;
    showLogoutButton: Boolean;
}

export const MainAppBar: React.FC<MainAppBarProps> = ({ onLogout, showLogoutButton = true }) => {
    if (!onLogout && showLogoutButton) {
        return <div>Error: onLogout is not passed properly</div>;
    }

    return (
        <div style={styles.appBar}>
            <div style={styles.leftItems}>
                <Link to={`/`} style={styles.link}>
                    <div style={styles.title}>Trello2</div>
                </Link>
                {showLogoutButton && (
                    <Link to={`/boards/`} style={styles.link}>
                        <Typography>My boards</Typography>
                    </Link>
                )}
            </div>
            {showLogoutButton && <LogoutButton onClick={onLogout} />}
        </div>
    );
};

const styles = {
    appBar: {
        backgroundColor: '#1E2125',
        borderBottom: '4px solid #292D33',
        padding: '20px',
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
        marginBottom: '-10px',
        color: '#fff',
        fontWeight: 'normal',
        marginRight: '20px',
    },
    link: {
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
};
