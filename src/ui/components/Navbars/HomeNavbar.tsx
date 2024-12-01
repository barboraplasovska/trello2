import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import '../../styles/Navbar.css';
import useAuthStore from '../../../core/stores/userStore';
import {Link, useNavigate} from "react-router-dom";
import {createBoard} from "../../../core/services/BoardService";
import LogoutButton from "../Buttons/LogoutButton/LogoutButton";

function HomeNavBar()
{
    const navigate = useNavigate();

    const logOut = () => {
        useAuthStore.getState().logout();
        navigate("/");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" id="appbar">
            <Toolbar variant="regular">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: 1,
                        alignItems: 'center',
                    }}>
                        <Link to={`/boards/`} style={styles.link}>
                            <Typography variant="h6">Trello 2</Typography>
                        </Link>
                    </Box>
                <Box>
                    <LogoutButton onClick={logOut}/>
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};

export default HomeNavBar;