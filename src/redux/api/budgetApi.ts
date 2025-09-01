/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TExam } from '../../types';
import { baseApi } from '../api/baseApi';

const budgetApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyTransactions: build.query<TExam, any>({
            query: () => ({
                url: '/transactions',
                method: 'GET',
            }),
            providesTags: ['transaction'],
        }),
        createTransaction: build.mutation<TExam, any>({
            query: (data) => ({
                url: '/transactions',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['transaction'],
        }),
    }),
});

export const { useGetMyTransactionsQuery, useCreateTransactionMutation } =
    budgetApi;
