import axios from 'axios';
import {
    getFromLocalStorage,
    setToLocalStorage,
} from '../../utils/localStorage';
import { authKey } from '../../constants/auth.constant';
import type { TResponseErrorType, TResponseSuccessType } from '../../types';
import { userLogout } from '../../utils/user';

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    // @ts-expect-error modify the response
    function (response) {
        const responseObject: TResponseSuccessType = {
            data: response?.data?.data,
        };
        return responseObject;
    },
    async function (error) {
        const { config } = error;
        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true;

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
                { withCredentials: true }
            );
            const accessToken = res.data.data.accessToken as string;

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                setToLocalStorage(authKey, accessToken);
                return axiosInstance(config);
            } else {
                await userLogout();
                const responseObject: TResponseErrorType = {
                    statusCode: 401,
                    message: 'You are not Authorized!',
                };
                return Promise.reject(responseObject);
            }
        }

        const responseObject: TResponseErrorType = {
            statusCode: error?.status || 500,
            message: error?.response?.data?.message || 'Something went wrong!',
        };
        return Promise.reject(responseObject);
    }
);

export default axiosInstance;
