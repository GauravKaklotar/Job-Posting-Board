import axios from 'axios';

const API_URL = 'http://localhost:4000/api/candidates';

export const getAllCandidates = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    });
    return response.data;
};
