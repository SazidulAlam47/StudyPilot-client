/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TTransaction } from '../../types';
import { baseApi } from '../api/baseApi';

const budgetApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyTransactions: build.query<TTransaction[], any>({
            query: () => ({
                url: '/transactions',
                method: 'GET',
            }),
            providesTags: ['transaction'],
        }),
        createTransaction: build.mutation<TTransaction, any>({
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
