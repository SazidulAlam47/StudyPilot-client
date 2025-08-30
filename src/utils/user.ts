import { getFromLocalStorage } from './localStorage';
import { jwtDecode } from 'jwt-decode';
import { removeFromLocalStorage } from './localStorage';
import { authKey } from '../constants/auth.constant';
import type { TDecodedUser } from '../types';
import axiosInstance from '../helpers/axios/axiosInstance';

export const getUser = () => {
    const token = getFromLocalStorage(authKey);

    if (!token) return null;

    const decoded = jwtDecode(token) as TDecodedUser;

    return decoded;
};

export const userLogout = async () => {
    await axiosInstance.get('/auth/logout'); // remove refresh token
    removeFromLocalStorage(authKey); // remove access token

    return null;
};
