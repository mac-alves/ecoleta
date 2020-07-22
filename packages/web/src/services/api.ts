import Axios from 'axios';

export const axios = Axios;

export const api = Axios.create({
    baseURL: 'http://localhost:3333/'
});
