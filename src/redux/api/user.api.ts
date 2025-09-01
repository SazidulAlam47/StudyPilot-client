/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from '../../types';
import { baseApi } from '../api/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<IUser, any>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: ['me'],
        }),
    }),
});

export const { useGetMeQuery } = userApi;
