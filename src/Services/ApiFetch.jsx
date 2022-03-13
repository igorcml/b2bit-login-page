import axios from 'axios';

const baseURL = 'https://frontendproject.b2bit.company/account';

export const createSession = async (email, password) => {
    const request = { email: email, password: password };
    try {
        const response = await axios.post(`${baseURL}/tokens/`, request);

        return response;
    } catch (error) {
        console.error(
            `No active account found with the given credentials. ${error}`
        );
        return error.message;
    }
};

export const validateSession = async (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const response = await axios.get(`${baseURL}/profile/`, { headers });
    return response;
};
