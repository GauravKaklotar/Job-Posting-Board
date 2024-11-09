import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { getAllCandidates } from '../services/candidateService';
import { postJob } from '../services/jobService';
import { toast } from 'react-toastify';
function JobPosting() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [endDate, setEndDate] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    // Fetch candidates on page load
    useEffect(() => {
        async function fetchCandidates() {
            const response = await getAllCandidates();
            setCandidates(response.data);
        }
        fetchCandidates();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            description,
            experienceLevel,
            endDate,
            candidates: selectedCandidates 
        };
        try {
            const response = await postJob(jobData);
            toast.success("Interview Created Successfully", { autoClose: true });
            setTitle('');
            setDescription('');
            setExperienceLevel('');
            setEndDate('');
            setSelectedCandidates([]);
            
        } catch (error) {
            console.error('Error posting job', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Create Interview
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
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                        label="Experience Level"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                    >
                        <MenuItem value="Entry">Entry</MenuItem>
                        <MenuItem value="Mid">Mid</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                </FormControl>
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
                <FormControl fullWidth margin="normal" variant="outlined"> 
                    <InputLabel>Assign Candidates</InputLabel>
                    <Select
                        label="Assign Candidates" 
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
