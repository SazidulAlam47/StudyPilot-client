/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TSchedule } from '../../types';
import { baseApi } from '../api/baseApi';

const scheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMySchedule: build.query<TSchedule, any>({
            query: () => ({
                url: '/schedules',
                method: 'GET',
            }),
            providesTags: ['schedule'],
        }),
        createOrUpdateSchedule: build.mutation<TSchedule, any>({
            query: (data) => ({
                url: '/schedules',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['schedule'],
        }),
    }),
});

export const { useGetMyScheduleQuery, useCreateOrUpdateScheduleMutation } =
    scheduleApi;
