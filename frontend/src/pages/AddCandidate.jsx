import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { addCandidate } from '../services/candidateService';

function AddCandidate() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const candidateData = {
            name,
            email 
        };
        try {
            const response = await addCandidate(candidateData);
            if (response.status === 201)
            {
                setName('');
                setEmail('');
                toast.success('Candidate added successfully!', { autoClose: 4000 });
            }
            else
            {
                toast.error('Error: ' + response.response.data.msg, { autoClose: 4000 });
            }


        } catch (error) {
            toast.error('Error: ' + error.message, { autoClose: 4000 });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Add Candidate
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Add Candidate
                </Button>
            </form>
        </Container>
    );
}

export default AddCandidate;
