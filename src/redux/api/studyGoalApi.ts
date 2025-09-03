/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TStudyGoal, TStudyTask } from '../../types';
import { baseApi } from '../api/baseApi';

const studyGoalApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllStudyGoal: build.query<TStudyGoal[], any>({
            query: () => ({
                url: '/study-goals',
                method: 'GET',
            }),
            providesTags: ['studyGoal'],
        }),
        getStudyGoalById: build.query<TStudyGoal, any>({
            query: (studyGoalId: string) => ({
                url: `/study-goals/${studyGoalId}`,
                method: 'GET',
            }),
            providesTags: ['studyGoal'],
        }),
        createStudyGoal: build.mutation<TStudyGoal, any>({
            query: (data: TStudyGoal) => ({
                url: '/study-goals',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['studyGoal'],
        }),
        updateStudyGoal: build.mutation<TStudyGoal, any>({
            query: (args: { studyGoalId: string; data: TStudyGoal }) => ({
                url: `/study-goals/${args.studyGoalId}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: ['studyGoal'],
        }),
        addStudyTask: build.mutation<TStudyTask, any>({
            query: (args: { studyGoalId: string; data: TStudyTask }) => ({
                url: `/study-goals/${args.studyGoalId}/add-task`,
                method: 'POST',
                data: args.data,
            }),
            invalidatesTags: ['studyGoal'],
        }),
        editStudyTask: build.mutation<TStudyTask, any>({
            query: (args: {
                studyTaskId: string;
                data: Partial<TStudyTask>;
            }) => ({
                url: `/study-goals/tasks/${args.studyTaskId}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: ['studyGoal'],
        }),
        deleteStudyTask: build.mutation<TStudyTask, any>({
            query: (studyTaskId: string) => ({
                url: `/study-goals/tasks/${studyTaskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['studyGoal'],
        }),
        generateStudyTask: build.mutation<TStudyTask, any>({
            query: (args: {
                studyGoalId: string;
                data: { prompt: string };
            }) => ({
                url: `/study-goals/${args.studyGoalId}/generate-task`,
                method: 'POST',
                data: args.data,
            }),
            invalidatesTags: ['studyGoal'],
        }),
    }),
});

export const {
    useGetAllStudyGoalQuery,
    useGetStudyGoalByIdQuery,
    useCreateStudyGoalMutation,
    useAddStudyTaskMutation,
    useEditStudyTaskMutation,
    useDeleteStudyTaskMutation,
    useUpdateStudyGoalMutation,
    useGenerateStudyTaskMutation,
} = studyGoalApi;
