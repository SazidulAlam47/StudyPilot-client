import type { TExam } from '../../types';
import { baseApi } from '../api/baseApi';

const examApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createExam: build.mutation<TExam, any>({
            query: (data) => ({
                url: '/exams',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['exam'],
        }),
        getExam: build.query<TExam, any>({
            query: (id: string) => ({
                url: `/exams/${id}`,
                method: 'GET',
            }),
            providesTags: ['exam'],
        }),
        validateAnswers: build.mutation<TExam, any>({
            query: (args: { id: string; data: { answers: number[] } }) => ({
                url: `/exams/submit/${args.id}`,
                method: 'POST',
                data: args.data,
            }),
            invalidatesTags: ['exam'],
        }),
        getPreviousExams: build.query<TExam[], any>({
            query: () => ({
                url: '/exams',
                method: 'GET',
            }),
            providesTags: ['exam'],
        }),
    }),
});

export const {
    useCreateExamMutation,
    useGetExamQuery,
    useValidateAnswersMutation,
    useGetPreviousExamsQuery,
} = examApi;
