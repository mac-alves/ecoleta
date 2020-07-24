import Axios from 'axios';

export const axios = Axios;

export const api = Axios.create({
    baseURL: 'http://192.168.100.101:3333/'
})