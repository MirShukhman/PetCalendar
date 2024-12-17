import axios from 'axios';
import { getToken } from '../util/tokenStorage';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if(token){
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;