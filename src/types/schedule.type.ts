import type { TDay } from './common.type';

export type TClass = {
    day: TDay;
    slots: string[];
};

export type TSchedule = {
    user: string;
    timeSlots: string[];
    classes: TClass[];
};
