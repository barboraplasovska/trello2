import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import '../../styles/Navbar.css';
import useAuthStore from '../../../core/stores/userStore';

function HomeNavBar()
{
    const logOut = () => {
        useAuthStore.getState().clearJwt();
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
                    }}
                >
                    <Typography variant="h6">Trello 2</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary">Create</Button>
                    <Button color="inherit" onClick={logOut}>Log out</Button>
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default HomeNavBar;