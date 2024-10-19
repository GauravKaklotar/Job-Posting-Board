import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { getAllCandidates } from '../services/candidateService';
import { postJob } from '../services/jobService';

function JobPosting() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [endDate, setEndDate] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    // Fetch candidates on page load
    // useEffect(() => {
    //     async function fetchCandidates() {
    //         const data = await getAllCandidates();
    //         setCandidates(data);
    //     }
    //     fetchCandidates();
    // }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            description,
            experienceLevel,
            endDate,
            candidates: selectedCandidates  // Send selected candidates
        };
        try {
            await postJob(jobData);
            alert('Job posted successfully and email notifications sent to selected candidates!');
        } catch (error) {
            console.error('Error posting job', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Post a Job
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Job Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Job Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Experience Level"
                    fullWidth
                    margin="normal"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                />
                <TextField
                    label="End Date"
                    fullWidth
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                {/* Candidate Selection Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Assign Candidates</InputLabel>
                    <Select
                        multiple
                        value={selectedCandidates}
                        onChange={(e) => setSelectedCandidates(e.target.value)}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {candidates.map((candidate) => (
                            <MenuItem key={candidate._id} value={candidate.email}>
                                <Checkbox checked={selectedCandidates.indexOf(candidate.email) > -1} />
                                <ListItemText primary={candidate.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Post Job
                </Button>
            </form>
        </Container>
    );
}

export default JobPosting;
