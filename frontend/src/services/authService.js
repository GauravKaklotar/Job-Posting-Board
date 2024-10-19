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
