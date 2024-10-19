import axios from 'axios';

const API_URL = 'http://localhost:4000/api/candidates';

export const getAllCandidates = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
    
        console.log("response: ", response);
        return response;
    }
    catch ( err ) {
        if (err.status === 401){
            localStorage.removeItem('token');
            window.location.href = "/login";
        }

        console.log("Error: ", err);
    }
};


export const addCandidate = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
    
        console.log("response: ", response);
        return response;
    }
    catch ( err ) {
        if (err.status === 401){
            localStorage.removeItem('token');
            window.location.href = "/login";
        }

        console.log("Error: ", err);
        return err;
    }
};
