import Axios from 'axios';

export const axios = Axios;

export const api = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
