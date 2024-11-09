import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage as 'token'
    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    return (
        <AppBar position="static" sx={{ mb: 5 }}>
            <Toolbar>
                <Typography 
                        variant="h6" 
                        style={{ flexGrow: 1, cursor: 'pointer' }} 
                        onClick={() => navigate('/')} // Clickable title
                    >
                        Cuvette
                </Typography>
                {!token ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/job-posting">
                            Create Interview
                        </Button>
                        <Button color="inherit" component={Link} to="/add-candidate">
                            Add Candidate
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
