import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../services/authService';

function VerifyOTP() {
    const [emailOTP, setEmailOTP] = useState('');
    const [mobileOTP, setMobileOTP] = useState('');  // Mobile OTP input
    const [mobileNumber, setMobileNumber] = useState('');  // Mobile number input
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            if (!mobileNumber) {
                alert('Please enter a valid mobile number.');
                return;
            }

            // Send OTP to the mobile number
            await sendOTP(mobileNumber);  
            alert('OTP sent to your mobile number.');
        } catch (error) {
            console.error('Error sending OTPs:', error);
            alert('Failed to send OTP. Please try again.');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            // Make sure both mobile number and OTP are provided
            if (!mobileNumber || !mobileOTP) {
                alert('Please enter both mobile number and OTP.');
                return;
            }

            // Verify OTP (mobile number and the entered OTP)
            const response = await verifyOTP({ mobile: mobileNumber, otp: mobileOTP });

            if (response.msg === 'Mobile verified successfully') {
                alert('Verification successful');
                navigate('/dashboard');  // Redirect to dashboard after successful verification
            } else {
                alert('Invalid OTP or OTP expired. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Verification failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Verify Mobile
            </Typography>
            <form onSubmit={handleVerify}>
                <TextField
                    label="Mobile Number"
                    fullWidth
                    margin="normal"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
                <TextField
                    label="Mobile OTP"
                    fullWidth
                    margin="normal"
                    value={mobileOTP}
                    onChange={(e) => setMobileOTP(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Verify OTP
                </Button>
            </form>
            <Button onClick={handleSendOTP} variant="text" color="primary">
                Resend OTP
            </Button>
        </Container>
    );
}

export default VerifyOTP;
