import axios from 'axios';

const API_URL = 'http://localhost:4000/api/jobs';

// Post a new job
export const postJob = async (jobData) => {
    try {
        const response = await axios.post(API_URL, jobData, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        return response.data;
    }
    catch ( err ) {
        if (err.status === 401){
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
        console.log("Error: " + err);
    }
};
