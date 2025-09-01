/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TTransaction, TTransactionStats } from '../../types';
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
            query: (data: TTransaction) => ({
                url: '/transactions',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['transaction'],
        }),
        updateTransaction: build.mutation<TTransaction, any>({
            query: (args: { id: string; data: TTransaction }) => ({
                url: `/transactions/${args.id}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: ['transaction'],
        }),
        getTransactionStats: build.query<TTransactionStats, any>({
            query: () => ({
                url: '/transactions/stats',
                method: 'GET',
            }),
            providesTags: ['transaction'],
        }),
    }),
});

export const {
    useGetMyTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useGetTransactionStatsQuery,
} = budgetApi;
