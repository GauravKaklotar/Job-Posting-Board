import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage as 'token'

    // Redirect based on login status
    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect to login if no token found
        }
    }, [token, navigate]);

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: '#f5f5f5',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome to Our Job Posting Portal
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                    Our platform provides the best way to manage job postings and candidates. Whether you're looking to hire or seeking opportunities, we ensure a smooth and efficient process. Explore available jobs, manage candidates, and track progress effortlessly.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/job-posting')}
                    sx={{ mt: 3 }}
                >
                    Create Interview
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
