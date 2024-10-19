import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static" sx={{mb:5}}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Job Posting Board
                </Typography>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
