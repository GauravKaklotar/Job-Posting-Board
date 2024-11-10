import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

// Login function
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

// Register function
export const register = async (name, email, mobile, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, mobile, password });
    return response.data;
};

// Send OTP to mobile number
export const sendOTP = async (mobile) => {
    try {
        const response = await axios.post(`${API_URL}/send-otp`, { mobile });
        return response.data; // Assuming success message or status from backend
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;  // Propagate error for handling in component
    }
};

// Verify OTP for the mobile number
export const verifyOTP = async ({ mobile, otp }) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { mobile, otp });
        return response.data;  // Assuming success/failure message from backend
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;  // Propagate error for handling in component
    }
};