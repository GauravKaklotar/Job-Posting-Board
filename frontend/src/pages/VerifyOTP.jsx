import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { sendOTP, verifyOTP } from '../services/authService';

function VerifyOTP() {
    const [emailOTP, setEmailOTP] = useState('');
    const [mobileOTP, setMobileOTP] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        // try {
        //     await sendOTP();  // Call backend to send OTPs
        //     alert('OTPs sent to your email and mobile');
        // } catch (error) {
        //     console.error('Error sending OTPs', error);
        // }
    };

    const handleVerify = async (e) => {
        // e.preventDefault();
        // try {
        //     await verifyOTP(emailOTP, mobileOTP);  // Call backend to verify OTPs
        //     alert('Verification successful');
        //     window.location.href = '/dashboard';  // Redirect after successful verification
        // } catch (error) {
        //     console.error('Error verifying OTPs', error);
        // }
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Verify Email and Mobile
            </Typography>
            <form onSubmit={handleVerify}>
                <TextField
                    label="Email OTP"
                    fullWidth
                    margin="normal"
                    value={emailOTP}
                    onChange={(e) => setEmailOTP(e.target.value)}
                />
                <TextField
                    label="Mobile OTP"
                    fullWidth
                    margin="normal"
                    value={mobileOTP}
                    onChange={(e) => setMobileOTP(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Verify
                </Button>
            </form>
            <Button onClick={handleSendOTP} variant="text" color="primary">
                Resend OTP
            </Button>
        </Container>
    );
}

export default VerifyOTP;
