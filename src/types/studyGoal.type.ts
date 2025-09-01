import type { TDay } from './common.type';

export type TPriority = 'high' | 'medium' | 'low';

export type TStudyTask = {
    _id: string;
    user: string;
    studyGoal: string;
    topic: string;
    priority: TPriority;
    deadline: Date;
    days: TDay[];
    timeSlot: string; // 'HH:MM'
};

export type TStudyGoal = {
    _id: string;
    user: string;
    title: string;
    targetDate: Date;
    studyTasks: TStudyTask[];
};
