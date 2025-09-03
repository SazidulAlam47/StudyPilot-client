import { getFromLocalStorage } from './localStorage';
import { removeFromLocalStorage } from './localStorage';
import { authKey } from '../constants/auth.constant';

import axiosInstance from '../helpers/axios/axiosInstance';
import { decodeToken } from './jwt';

export const getUser = () => {
    const token = getFromLocalStorage(authKey);
    const decoded = decodeToken(token);
    return decoded;
};

export const userLogout = async () => {
    await axiosInstance.get('/auth/logout'); // remove refresh token
    removeFromLocalStorage(authKey); // remove access token

    return null;
};
